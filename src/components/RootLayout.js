import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import LogoutButton from "../components/LogoutButton";
import Image from "./Image";
import ImageCropper from "../components/ImageCropper";

import { AiFillMessage, AiOutlineSetting, AiOutlineHome } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { useSelector } from "react-redux";

//###### Modal Profile Image #######
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getAuth } from "firebase/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "132px",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "60%",
  bgcolor: "black",
  border: "2px solid coral",
  boxShadow: 24,
  p: 4,
};

//###### Modal Profile Image #######

const RootLayout = () => {
  //###### Modal Profile Image #######
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let reduxReturnData = useSelector((state) => state);
  const auth = getAuth();
  console.log("URL RootRx:", reduxReturnData.userStoreData.userInfo.photoURL);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className="sideBarbox">
            <div className="sideBar">
              <div className="profileDiv" onClick={handleOpen}>
                <Image
                  className="profileImage"
                  imgsrc={reduxReturnData.userStoreData.userInfo.photoURL}
                />
              </div>
              <h5 className="h5userName ">
                {" "}
                {reduxReturnData.userStoreData.userInfo.displayName}
              </h5>
              <h5 className="h5userEmail ">
                {" "}
                {reduxReturnData.userStoreData.userInfo.email}
              </h5>

              <div className="iconDiv">
                <AiOutlineHome className="iconBar" />
                <AiFillMessage className="iconBar" />
                <BsBell className="iconBar" />
                <AiOutlineSetting className="iconBar" />
                <div style={{ marginTop: "80%" }}>
                  {" "}
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  color: "coral",
                }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                Image Upload
                {/* <Stack
                  direction="row"
                  style={{ paddingLeft: "45%" }}
                  alignItems="center"
                  spacing={2}
                >
              
                </Stack> */}
              </Typography>
              <ImageCropper />
            </Box>
          </Modal>
        </Grid>
        <Outlet />
      </Grid>
    </>
  );
};

export default RootLayout;
