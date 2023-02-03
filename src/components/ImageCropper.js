import React, { useState } from "react";
//######## Cropper  #########
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useSelector, useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";

//### Croper Constant #######

const ImageCropper = () => {
  //###### Croper Function #######
  const [image, setImage] = useState();
  const [show, setShow] = useState(true);
  const auth = getAuth();
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
          }).then(() => {});
        });
      });
    }
  };
  let handleCrop = () => {
    setShow(!show);
  };
  return (
    <>
      <div>
        <div style={{ width: "100%" }}>
          <IconButton
            style={{ paddingLeft: "47%" }}
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <PhotoCamera onClick={handleCrop} />
            <input hidden type="file" accept="image/*" onChange={onChange} />
          </IconButton>

          <br />
          {/* ######################## Show */}
          {image === undefined ? (
            <>
              <div
                style={{ marginLeft: "225px", zIndex: "1" }}
                className="img-preview"
              >
                {" "}
                <img
                  style={{ position: "inline-block" }}
                  src={reduxReturnData.userStoreData.userInfo.photoURL}
                  alt="userProfile"
                />{" "}
                <tr />
              </div>

              <div
                style={{ marginLeft: "180px", zIndex: "1" }}
                className="img-preview"
              >
                {" "}
                <img
                  style={{ position: "inline-block" }}
                  src={reduxReturnData.userStoreData.userInfo.photoURL}
                  alt="userProfile"
                />{" "}
                <tr />
              </div>
              <div
                style={{ marginLeft: "260px", zIndex: "1" }}
                className="img-preview"
              >
                {" "}
                <img
                  style={{ position: "inline-block" }}
                  src={reduxReturnData.userStoreData.userInfo.photoURL}
                  alt="userProfile"
                />{" "}
                <tr />
              </div>
            </>
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
            <img className="croppedImage" src={cropData} alt="cropped" />
          </div>
        </div>

        <br style={{ clear: "both" }} />
      </div>
    </>
  );
};

export default ImageCropper;
