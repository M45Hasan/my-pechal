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
        if (data.userStoreData.userInfo.uid == item.val().blockById) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setBllist(arr);
      console.log(arr);
    });
  }, []);
  /**################ Button fnc  */
  let unBlock = (item) => {
    console.log(item);
    console.log(item.id);
    
      set(push(ref(db, "friends")), {
        senderName:item.blocked,
        senderUid: item.blockedID,
        senderPhotoURL: item.blockedPhotoURL,
        senderEmail: data.userStoreData.userInfo.email,
        receiverName: data.userStoreData.userInfo.displayName,
        receiverUid: data.userStoreData.userInfo.uid,
        receiverPhotoURL: data.userStoreData.userInfo.photoURL,
        receiverEmail:data.userStoreData.userInfo.email,
      }).then(()=>{
        remove(ref(db, "block/" + item.id)).then(() => {
          console.log("Delete");
        });

      })
   
    
    // if (data.userStoreData.userInfo.uid === item.blockedId) {
    //   console.log("hello blocked");
    //   console.log(data.userStoreData.userInfo.uid);
    //   console.log(item.blockedId);
    //   set(push(db, "friends"), {
    //     senderName: item.blockBy,
    //     senderUid: item.blockById,
    //     senderPhotoURL: item.blockByPhotoURL,
    //     senderEmail: item.blockByEmail,

    //     receiverName: data.userStoreData.userInfo.displayName,
    //     receiverUid: data.userStoreData.userInfo.uid,
    //     receiverPhotoURL: data.userStoreData.userInfo.photoURL,
    //     receiverEmail: data.userStoreData.userInfo.email,
    //     date: item.date,
    //     id: item.id,
    //   }).then(() => {
    //     console.log(item.id);
    //     remove(ref(db, "block/" + item.id)).then(() => {
    //       console.log("Delete");
    //     });
    //   });
    // } else {
    //   console.log("hello underblocked");
    //   console.log(data.userStoreData.userInfo.uid);
    //   console.log(item.blockById);
    //   set(push(db, "friends"), {
    //     receiverName: data.userStoreData.userInfo.displayName,
    //     receiverUid: data.userStoreData.userInfo.uid,
    //     receiverPhotoURL: data.userStoreData.userInfo.photoURL,
    //     receiverEmail: data.userStoreData.userInfo.email,

    //     senderName: item.blocked,
    //     senderUid: item.blockedId,
    //     senderPhotoURL: item.blockedPhotoURL,
    //     senderEmail: item.blockedEmail,
    //     date: item.date,
    //     id: item.id,
    //   }).then(() => {
    //     console.log(item.id);
    //     remove(ref(db, "block/" + item.id)).then(() => {
    //       console.log("Delete");
    //     });
    //   });
    // }
  };

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
                src={ item.blockedPhotoURL }
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
                      onClick={() => unBlock(item)}
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
