import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { useSelector } from "react-redux";
const BlockList = () => {
  const db = getDatabase();
  let [blList, setBllist] = useState([]);
  let data = useSelector((state) => state);

  useEffect(() => {
    const usersRef = ref(db, "block");

    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.userStoreData.userInfo.uid==item.val().blockById) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setBllist(arr);
      console.log(arr);
    });
  }, []);

  return (
    <>
      {blList.length > 0 ? (
        blList.map((item) => (
          <div className="unitUser">
            <div className="uniImageDiv">
              <img
                className="unitUserImg"
                style={{
                  width: "70px !important",
                  height: "70px important",
                  borderRadious: "50% !important",
                }}
                src={item.blockedPhotoURL}
                alt="User Pic"
              />
            </div>
            <div style={{ width: "80%" }}>
              <div className="groupNametitle">
                <div>
                  <h3 className="h3Group">{item.blocked}</h3>

                  <h5 style={{ fontSize: "10px" }} className="h5Note">
                    BlockedBy:{item.blockBy}
                  </h5>
                </div>

                <div className="buttonFlex">
                  <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                  <div className="rejectAcc">
                    <p
                      onClick={"() => unBlock(item)"}
                      style={{ backgroundColor: "red" }}
                      className="butGroup"
                    >
                      Unblock
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          BlockList Empty
        </Alert>
      )}
    </>
  );
};

export default BlockList;
