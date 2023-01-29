import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Grid from "@mui/material/Grid";
import Image from "../components/Image";
import ImportBox from "../components/ImportBox";
import Alert from "@mui/material/Alert";
import Pbutton from "../components/Pbutton";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AuthenticationLink from "../components/AuthenticationLink";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { activeUser } from "../slices/UserSlice";
import { useSelector } from "react-redux";

/***modal ImportStart */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
/***modal ImportEnd */
import { ProgressBar } from "react-loader-spinner";

const CommonButton = styled(Button)({
  width: "368px ",
  height: "68px",

  borderRadius: "8.7px",

  fontSize: "20px",
  fontWeight: "600",
  fontFamily: ["Nunito", "sans-serif"],
});

/****************************************modal**Stylestart*** */
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,

  p: 4,
};
/****************************************modal**Styleend****** */

const SignIn = () => {
  let [formData, setFormData] = useState({
    email: "",
    password: "",
    fgp: "",
  });
  let [errorShow, setError] = useState({
    email: "",
    other: "",
    password: "",
    fgp: "",
  });
  let [fgpShow, setFgp] = useState(true);
  let [loadShow, setLoad] = useState(false);
  let handleForm = (e) => {
    let { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setError({ ...errorShow, [name]: "" });
    console.log(formData.fgp);
  };

  /**************************************************firebase****satrt */
  let auth = getAuth();
  let navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  let dispatch = useDispatch();
  let reduxReturnData = useSelector((state) => state);
  /********modalHook***start */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  /********modalHook***end */

  useEffect(() => {
    if (Boolean(reduxReturnData.userStoreData.userInfo) === true) {
      console.log("should stay in Home Page ");

      navigate("/home");
    }
  }, []);

  let handelClick = () => {
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
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          //************************************************************ */ Signed in
          console.log(userCredential.operationType);
          console.log("Signed in");
          navigate("/home");
          localStorage.setItem("userInfo", JSON.stringify(userCredential.user));
          dispatch(activeUser(userCredential.user));
          // if (userCredential.user.emailVerified === true) {   //** */Email Verify
          //   navigate("/home")
          // }
          // else{
          //   setError({...errorShow,other:"Please Verify Your Email"})
          //   setTimeout(()=>{
          //     signOut(auth).then(() => {
          //       //************************************************** */ Sign-out successful.
          //       console.log("signOut")
          //       navigate("/")
          //     })
          //   },4000)

          // }

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/user-not-found")) {
            setError({ ...errorShow, other: "user not found" });
          }
          if (errorCode.includes("auth/too-many-requests")) {
            setError({ ...errorShow, other: "invalid info" });
          }
          if (errorCode.includes("auth/network-request-failed")) {
            setError({ ...errorShow, other: "Network Error" });
          }
          if (errorCode.includes("auth/wrong-password")) {
            setError({ ...errorShow, password: "wrong-password" });
          }

          console.log(error.code);
        });
    }
    /**********************************************************firebase****end */
  };
  /*******************************************************IconEye*start****/
  let [iconShow, setIcon] = useState(false);

  let handleIcon = () => {
    setIcon(!iconShow);
  };
  /*******************************************************IconEye**end***/
  /***************************************************googleLogIn**start */

  let handleGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      navigate("/home");
      console.log("google login");
    });
  };
  /*##################Fgp Function####### */
  let [modalShow,setModal]=useState(true)
  let handelFgp = () => {
    /**############# Fgp Email Validation Start ############ */
    let regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (formData.fgp === "") {
      setError({ ...errorShow, fgp: " Email require" });
    } else if (!regex.test(formData.fgp)) {
      setError({ ...errorShow, fgp: "Enter valid email" });
    } else {
      /**############# Fgp Email Validation End  ############ */
      sendPasswordResetEmail(auth, formData.fgp)
        .then(() => {
          // Password reset email sent!

          console.log("Reset password Mail sent");
          setFgp(!fgpShow);
          setLoad(!loadShow);
          setTimeout(() => {
            setLoad(loadShow);
            setError({ ...errorShow, fgp: "Please Check Your Mail" });
          }, 2000);
          setTimeout(() => {
            setModal(false);
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;

          console.log("passowrd restMail:", errorCode);
          if (errorCode == "auth/user-not-found") {
            setError({ ...errorShow, fgp: "Email Account Not found" });
          }
          // ..
        });
    }
  };

  /***************************************************googleLogIn**edn */

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="logLeftSide">
            <div>
              <Header>
                <Heading
                  className="heading"
                  as="h2"
                  title="Login to your account!"
                />
              </Header>

              <div className="regiInput">
                <div className="regiImgDiv" onClick={handleGoogle}>
                  <Link to="#">
                    <Image imgsrc="assets/logingoogle.png" />
                  </Link>
                </div>
                {errorShow.other && (
                  <Alert className="errorBox" variant="filled" severity="error">
                    {errorShow.other}
                  </Alert>
                )}
                <ImportBox
                  textChange={handleForm}
                  label="Email Address"
                  variant="standard"
                  className=" InputUnit"
                  name="email"
                />
                {errorShow.email && (
                  <Alert className="errorBox" variant="filled" severity="error">
                    {errorShow.email}
                  </Alert>
                )}

                <div className="iconPart">
                  <ImportBox
                    textChange={handleForm}
                    type={!iconShow ? "password" : "text"}
                    label="Password"
                    variant="standard"
                    className=" InputUnit"
                    name="password"
                  />
                  {!iconShow ? (
                    <AiFillEyeInvisible
                      className="iconEyeClose"
                      onClick={handleIcon}
                    />
                  ) : (
                    <AiFillEye className="iconEyeOpen" onClick={handleIcon} />
                  )}
                </div>

                {errorShow.password && (
                  <Alert className="errorBox" variant="filled" severity="error">
                    {errorShow.password}
                  </Alert>
                )}
                <Pbutton
                  click={handelClick}
                  name={CommonButton}
                  title="Login to Continue"
                />
                <AuthenticationLink
                  title=" Don’t have an account ?"
                  href="/"
                  reftitle="Sign Up"
                />
                {/******************#######forgot Pass######************modal***** */}
                {modalShow && (
                  <div style={{ textAlign: "center", width: "368px" }}>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Forgot Password
                        </Typography>

                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {loadShow && <ProgressBar />}

                          {fgpShow && (
                            <ImportBox
                              textChange={handleForm}
                              label="Email Address"
                              variant="standard"
                              className=" InputUnit"
                              name="fgp"
                            />
                          )}
                        </Typography>
                        {errorShow.fgp && (
                          <Alert
                            style={{ marginTop: "3px" }}
                            className="errorBox"
                            variant="filled"
                            severity="success"
                          >
                            {errorShow.fgp}
                          </Alert>
                        )}
                        <div style={{ marginTop: "3px", marginLeft: "79%" }}>
                          {fgpShow && (
                            <Pbutton
                              click={handelFgp}
                              name={Button}
                              title="Submit"
                            />
                          )}
                        </div>
                      </Box>
                    </Modal>

                    <Button
                      style={{ marginTop: "-10%", textColor: !"red" }}
                      onClick={handleOpen}
                    >
                      Forgot Password
                    </Button>
                  </div>
                )}
                {/**********************FogotPassword########***End******modal***** */}
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="regiImgDiv">
            <Image className="regiImage" imgsrc="assets/login.png" />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
