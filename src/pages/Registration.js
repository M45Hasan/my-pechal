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
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
  //  *******Firebase End**************************

  // Onchange Function Start**************************
  let [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  let handleForm = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...errorShow, [name]: "" });
    console.log(formData);
  };

  // Onchange Function end *****************************

  // ********Error Function start *****************************

  let [errorShow, setError] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  let handleClick = () => {
    if (formData.email === "") {
      setError({ ...errorShow, email: "Enter valid email" });
    } else if (formData.fullName === "") {
      setError({ ...errorShow, fullName: "Enter Your Name" });
    } else if (formData.password === "") {
      setError({ ...errorShow, password: "Enter valid Password" });
    } else {
      signInWithEmailAndPassword(auth, formData.email, formData.password).then(
        (user) => {
          console.log(user);
          
        }
      );
    }
  };
  //**********Error Function end *****************************

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
                </div>

                {errorShow.password && (
                  <Alert className="errorBox" variant="filled" severity="error">
                    {errorShow.password}
                  </Alert>
                )}
                <Pbutton
                  click={handleClick}
                  name={CommonButton}
                  title="Sign Up"
                />
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
