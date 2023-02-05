import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Friends = () => {
  const db = getDatabase();
  let [fnd, setFnd] = useState([]);
  let data = useSelector((state) => state);

  useEffect(() => {
    const usersRef = ref(db, "friends/");

    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          data.userStoreData.userInfo.uid === item.val().receiverUid ||
          data.userStoreData.userInfo.uid === item.val().senderUid
        ) {
          arr.push({ ...item.val() });
        }
      });
      setFnd(arr);
      console.log(arr);
    });
  }, []);

  let buttBlock = (item) => {
    console.log(item);
    if (data.userStoreData.userInfo.uid === item.senderUid) {
      set(push(ref(db, "block/")), {
        blocked: item.receiverName,
        blockedId: item.receiverUid,
        blockedEmail: item.receiverEmail,
        blockedPhotoURL: item.receiverPhotoURL,

        // blockBy: item.senderName,
        // blockById: item.senderUid,
        // blockByEmail: item.senderEmail,
        // blockByPhotoURL: item.senderPhotoURL,
      }).then(() => {
        remove(ref(db, "friends" + item.id)).then(() => {
          console.log("Delete");
        });
      });
    } else {
      set(push(ref(db, "block/")), {
        blocked: item.senderName,
        blockedId: item.senderUid,
        blockedEmail: item.senderEmail,
        blockedPhotoURL: item.senderPhotoURL,

        // blockBy: item.receiverName,
        // blockById: item.receiverUid,
        // blockByEmail: item.receiverEmail,
        // blockByPhotoURL: item.receiverPhotoURL,
      }).then(() => {
        remove(ref(db, "friends" + item.id)).then(() => {
          console.log("Delete");
        });
      });
    }
  };
  return (
    <>
      {fnd.map((item) => (
        <div className="unitUser">
          {item.senderUid == data.userStoreData.userInfo.uid ? (
            <>
              <div className="uniImageDiv">
                <img
                  className="unitUserImg"
                  style={{
                    width: "70px !important",
                    height: "70px important",
                    borderRadious: "50% !important",
                  }}
                  src={item.receiverPhotoURL}
                  alt="User Pic"
                />
              </div>
              <div style={{ width: "80%" }}>
                <div className="groupNametitle">
                  <div>
                    <h3 className="h3Group">{item.receiverName}</h3>

                    <h5 style={{ fontSize: "10px" }} className="h5Note">
                      {item.date}
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
                      <button onClick={() => buttBlock(item)} className="butGroup">
                        Block
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
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
                      {item.date}
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
                      <button onClick={() => buttBlock(item)} className="butGroup">
                        Block
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default Friends;
