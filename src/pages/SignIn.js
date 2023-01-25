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
import { Link } from "react-router-dom";

const CommonButton = styled(Button)({
  width: "368px ",
  height: "68px",

  borderRadius: "8.7px",

  fontSize: "20px",
  fontWeight: "600",
  fontFamily: ["Nunito", "sans-serif"],
});

const SignIn = () => {
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
                <div className="regiImgDiv">
                  <Link to="#">
                    <Image imgsrc="assets/logingoogle.png" />
                  </Link>
                </div>

                <ImportBox
                  label="Email Address"
                  variant="standard"
                  className=" InputUnit"
                />
           
                <ImportBox
                  label="Password"
                  variant="standard"
                  className=" InputUnit"
                />

                <Pbutton name={CommonButton} title="Login to Continue" />
                <AuthenticationLink
                  title=" Don’t have an account ?"
                  href="/registration"
                  reftitle="Sign Up"
                />
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
