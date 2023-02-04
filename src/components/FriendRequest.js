import React, { useEffect, useState } from "react";

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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FriendRequest = () => {
  const db = getDatabase();
  let [frList, setFrlist] = useState([]);
  let data = useSelector((state) => state);

  useEffect(() => {
    const usersRef = ref(db, "friendrequest/");

    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.userStoreData.userInfo.uid === item.val().receiverUid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFrlist(arr);
      console.log(arr);
    });
  }, []);
  /**###################### button function ########### */
  let requCancel = (fndRequ) => {
    remove(ref(db, "friendrequest/" + fndRequ.id)).then(() => {
      toast("Cancel!");
    });
    console.log("fndRequCancel:", fndRequ);
  };

  let requAccept = (item) => {
    set(push(ref(db, "friends")), {
      ...item,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "friendrequest/" + item.id)).then(() => {
        toast("thanks");
      });
    });
  };
  return (
    <>
      {frList.length > 0 ? (
        frList.map((item) => (
          <div className="unitUser">
            <div className="uniImageDiv">
              <img
                className="unitUserImg"
                style={{
                  width: "70px !important",
                  height: "70px important",
                  borderRadious: "50% !important",
                }}
                src={item.senderPhotoURL}
                alt="User Pic"
              />
            </div>
            <div style={{ width: "80%" }}>
              <div className="groupNametitle">
                <div>
                  <h3 className="h3Group">{item.senderName}</h3>

                  <h5 style={{ fontSize: "10px" }} className="h5Note">
                    {item.senderEmail}
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
                      onClick={() => requCancel(item)}
                      style={{ backgroundColor: "red" }}
                      className="butGroup"
                    >
                      Cancel
                    </p>

                    <p onClick={() => requAccept(item)} className="butGroup">
                      Accept
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
          No Friend Request
        </Alert>
      )}
    </>
  );
};

export default FriendRequest;
