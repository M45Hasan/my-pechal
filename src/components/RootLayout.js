import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import LogoutButton from "../components/LogoutButton";
import Image from "./Image";

import { AiFillMessage, AiOutlineSetting, AiOutlineHome } from "react-icons/ai";
import { BsBell } from "react-icons/bs";

//###### Modal Profile Image #######
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

//################################################################ Croper import start #######

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../slices/UserSlice";

import Button from "@mui/material/Button";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref as def, set } from "firebase/database";

//###### Croper import end #######

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
  const [profile, setProfile] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //################################################################## Croper Function Start #######

  const [image, setImage] = useState();
  const [show, setShow] = useState(false);
  const auth = getAuth();
  const db = getDatabase();
  const [cropData, setCropData] = useState();
  const [cropper, setCropper] = useState();
  let reduxReturnData = useSelector((state) => state);
  let dispatch = useDispatch();

  console.log("Crooper", reduxReturnData);
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `profilepic/${reduxReturnData.userStoreData.userInfo.uid}`
      );
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        console.log("Uploaded a data_url string!");
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);

          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            localStorage.setItem("userInfo", JSON.stringify(auth.currentUser));
            dispatch(activeUser(auth.currentUser));
            set(
              def(db, "users/" + reduxReturnData.userStoreData.userInfo.uid),
              {
                displayName: reduxReturnData.userStoreData.userInfo.displayName,
                email: reduxReturnData.userStoreData.userInfo.email,
                photoURL: auth.currentUser.photoURL,
              }
            );
            console.log("Rootdispatch", auth.currentUser.photoURL);
          });
        });
      });
    }
  };
  let handleCrop = () => {
    setShow(true);
  };

  //########################### Croper Function End#######

  useEffect(() => {
    setProfile(reduxReturnData.userStoreData.userInfo.photoURL);
  }, [reduxReturnData]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className="sideBarbox">
            <div className="sideBar">
              <div className="profileDiv" onClick={handleOpen}>
                <Image className="profileImage" imgsrc={profile} />
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

              {/*############################################################ ImageCroper Start ####*/}

              <div>
                <div style={{ width: "100%" }}>
                  <IconButton
                    style={{ paddingLeft: "47%" }}
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <PhotoCamera onClick={handleCrop} />
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={onChange}
                    />
                  </IconButton>

                  <br />
                  {/* ######################## Show */}
                  {image === undefined ? (
                    <div className=" kameraNice">
                      {/* ######################## crop Image Show start */}
                      {image ? (
                        <div className="img-preview"></div>
                      ) : reduxReturnData.userStoreData.userInfo.photoURL ? (
                        <Image
                          className="profileImage"
                          imgsrc={
                            reduxReturnData.userStoreData.userInfo.photoURL
                          }
                        />
                      ) : (
                        <Image
                          className="profileImage"
                          imgsrc={
                            reduxReturnData.userStoreData.userInfo.photoURL
                          }
                        />
                      )}
                      {/* ######################## crop Image Show end */}
                    </div>
                  ) : (
                    <Cropper
                      className="cropperIn"
                      style={{ height: 200, width: "50%" }}
                      zoomTo={0.05}
                      initialAspectRatio={1}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={70}
                      minCropBoxWidth={70}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false}
                      onInitialized={(instance) => {
                        setCropper(instance);
                      }}
                      guides={true}
                    />
                  )}
                  {/* #####################End */}
                </div>
                {show && (
                  <div className="cropperPrev">
                    <div className="img-preview" />

                    <Button
                      className=" croppButt"
                      onClick={getCropData}
                      variant="contained"
                      color="success"
                    >
                      Crop Image
                    </Button>
                    <div
                      style={{
                        width: "70px",
                        height: "70px",
                        overflow: "hidden",

                        borderRadius: "50%",
                      }}
                    >
                      <img
                        className="croppedImage"
                        src={cropData}
                        alt="cropped"
                      />
                    </div>
                  </div>
                )}
                <br style={{ clear: "both" }} />
              </div>

              {/*################################## ImageCroper end ####*/}
            </Box>
          </Modal>
        </Grid>
        <Outlet />
      </Grid>
    </>
  );
};

export default RootLayout;
