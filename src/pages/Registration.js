import React from "react";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Grid from "@mui/material/Grid";
import Image from "../components/Image";
import ImportBox from "../components/ImportBox";
import Pbutton from "../components/Pbutton";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AuthenticationLink from "../components/AuthenticationLink";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Rings } from "react-loader-spinner";
import { useSelector } from "react-redux";

//button Css start
const CommonButton = styled(Button)({
  width: "368px ",
  height: "68px",

  borderRadius: "86px",

  fontSize: "20px",
  fontWeight: "600",
  fontFamily: ["Nunito", "sans-serif"],
});

//button Css end

const Registration = () => {
  // *******Firebase Start**************************
  const auth = getAuth();
  let navigate = useNavigate();
  let reduxReturnData = useSelector((state) => state);

  const db = getDatabase();
  //  *******Firebase End**************************
  useEffect(() => {
    if (Boolean(reduxReturnData.userStoreData.userInfo) === true) {
      console.log("should stay in Home Page ");

      navigate("/home");
    }
  }, []);

  // Onchange Function Start*********getInput value *****************
  let [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    photoURL: "",
  });
  let [errorShow, setError] = useState({
    email: "",
    fullName: "",
  });
  //***************************************************************ProgressBar*****start*** */
  let [progresShow, setProgres] = useState(0);
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    [`& .${linearProgressClasses.bar}`]: {
      height: 40,
      backgroundColor:
        progresShow < 49.8 ? "yellow" : progresShow <= 83 ? "orange" : "green",
    },
  }));
  //***************************************************************ProgressBar*****end*** */
  let handleForm = (e) => {
    let { name, value } = e.target;

    //**************Password Varification******Start*************************************/

    if (name === "password") {
      let cap = /(?=.*?[A-Z])/;
      let lower = /(?=.*?[a-z])/;
      let digit = /(?=.*?[0-9])/;
      let spchar = /(?=.*?[#?!@$%^&*-])/;
      let minlen = /.{6,}/;
      let progresUnit = 100 / 6;
      console.log(progresUnit);
      //*********************ProgressBar***********Start****** */

      // if (value.length == 0) {
      //   setProgres(0);
      // }

      // if (value.length == 1) {
      //   setProgres(progresUnit);
      // }

      // if (value.length == 2) {
      //   setProgres(progresUnit*2);
      // }
      // if (value.length == 3) {
      //   setProgres(progresUnit*3);
      // }
      // if (value.length == 4) {
      //   setProgres(progresUnit*4);
      // }
      // if (value.length == 5) {
      //   setProgres(progresUnit*5);
      // }
      // if (value.length == 6) {
      //   setProgres(progresUnit*6);
      // }
      //*********************ProgressBar***********end****** */

      if (!cap.test(value)) {
        setError({ ...errorShow, password: "One Capital letter required" });
        return;
      }

      if (!lower.test(value)) {
        setError({ ...errorShow, password: "One Lower letter required" });
        return;
      }

      if (!digit.test(value)) {
        setError({ ...errorShow, password: "At least one digit required" });
        return;
      }

      if (!spchar.test(value)) {
        setError({
          ...errorShow,
          password: "At least one Special Char required",
        });
        return;
      }

      if (!minlen.test(value)) {
        setError({ ...errorShow, password: "At least 6 unit required" });
        return;
      } else {
        setProgres(100);
      }
      console.log(progresShow);
    }
    //**************Password Varification******End */
    setFormData({ ...formData, [name]: value });
    setError({ ...errorShow, [name]: "" });
    //console.log(formData);

    // Onchange Function end *****************************
  };
  // ********Error Function start ************validation**start*****************
  /*********************Loader*start** */
  let [loadShow, setLoad] = useState(false);
  /*********************Loader*end** */
  let handleClick = () => {
    let regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (formData.email === "") {
      setError({ ...errorShow, email: " Email require" });
    } else if (!regex.test(formData.email)) {
      setError({ ...errorShow, email: "Enter valid email" });
    } else if (formData.fullName === "") {
      setError({ ...errorShow, fullName: "Enter Your Name" });
    } else if (formData.password === "") {
      setError({ ...errorShow, password: "Enter valid Password" });
    } else {
      createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
        formData.photoURL
      )
        .then((user) => {
          sendEmailVerification(auth.currentUser).then(() => {
            console.log(user.user);
            updateProfile(auth.currentUser, {
              displayName: formData.fullName,
              photoURL: formData.photoURL,
            })
              .then(() => {
                // Email verification sent!
                console.log("Email Send");
                //########################################Send Database
                set(ref(db, "users/" + user.user.uid), {
                  displayName: user.user.displayName,
                  email: user.user.email,
                  photoURL: user.user.photoURL,
                }).then(() => {
                  //#######################################Loader
                  setLoad(!loadShow);
                  toast("Registration successful. Please check your email");
                  setTimeout(() => {
                    navigate("/login");
                  }, 2000);
                });
              })

              .catch((error) => {
                // An error occurred
                // ...
              });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setError({ ...errorShow, email: "Email already exit" });
          }

          console.log(errorCode);
        });
    }
  };
  //**********Error Function end ******************Validation End***********

  //**********IconPassword Start *****************************
  let [iconShow, setIcon] = useState(false);
  //let [passwordShow, setHidepass] = useState("text");
  let handleIcon = () => {
    //setHidepass("password");
    setIcon(!iconShow);
  };
  //**********IconPassword  end *****************************

  return (
    <>
      <Grid container spacing={2}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Grid item xs={6}>
          <div className="regiLeftSide">
            <div className="regiLeftBox">
              <Header>
                <Heading
                  className="heading"
                  as="h2"
                  title="Get started with easily register"
                />
                <Heading
                  className="subheading"
                  as="p"
                  title="Free register and you can enjoy it"
                />
              </Header>
              <div className="regiInput">
                <ImportBox
                  textChange={handleForm}
                  type="email"
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  className=" InputUnit"
                />
                {errorShow.email && (
                  <Alert className="errorBox" variant="filled" severity="error">
                    {errorShow.email}
                  </Alert>
                )}
                <ImportBox
                  textChange={handleForm}
                  type="text"
                  name="fullName"
                  label="Full name"
                  variant="outlined"
                  className=" InputUnit"
                />
                {errorShow.fullName && (
                  <Alert className="errorBox" variant="filled" severity="error">
                    {errorShow.fullName}
                  </Alert>
                )}
                <div className="iconPart">
                  {" "}
                  <ImportBox
                    textChange={handleForm}
                    type={!iconShow ? "password" : "text"}
                    name="password"
                    label="Password"
                    variant="outlined"
                    className=" InputUnit"
                  />
                  {!iconShow ? (
                    <AiFillEyeInvisible
                      className="iconEyeClose"
                      onClick={handleIcon}
                    />
                  ) : (
                    <AiFillEye className="iconEyeOpen" onClick={handleIcon} />
                  )}
                  <BorderLinearProgress
                    variant="determinate"
                    value={progresShow}
                  />
                </div>

                {errorShow.password && (
                  <Alert className="errorBox" variant="filled" severity="error">
                    {errorShow.password}
                  </Alert>
                )}
                {loadShow ? (
                  <Rings
                    height="70"
                    width="70"
                    color="#4fa94d"
                    radius="15"
                    wrapperStyle={{ marginLeft: 139 }}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="rings-loading"
                  />
                ) : (
                  <Pbutton
                    click={handleClick}
                    name={CommonButton}
                    title="Sign Up"
                  />
                )}

                <AuthenticationLink
                  title=" Already  have an account ?"
                  href="/login"
                  reftitle="Sign In"
                />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="regiImgDiv">
            <Image className="regiImage" imgsrc="assets/registration.png" />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Registration;
