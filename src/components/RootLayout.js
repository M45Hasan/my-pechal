import React from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import LogoutButton from "../components/LogoutButton";
import Image from "./Image";

import {
  AiFillMessage,
  AiOutlineSetting,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import { BsBell } from "react-icons/bs";

const RootLayout = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className="sideBarbox">
            <div className="sideBar">
              <div className="profileDiv">
                <Image
                  className="profileImage"
                  imgsrc="../assets/profileImg.png"
                />
              </div>

              <div className="iconDiv">
                
                <AiOutlineHome className="iconBar" />
                <AiFillMessage className="iconBar" />
                <BsBell className="iconBar" />
                <AiOutlineSetting className="iconBar" />
                <div style={{marginTop:"70%"}}> <LogoutButton /></div>
               
              </div>
            </div>
          </div>
        </Grid>
        <Outlet />
      </Grid>
    </>
  );
};

export default RootLayout;
