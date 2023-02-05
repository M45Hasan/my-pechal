import React, { useEffect, useState } from "react";

import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserList = () => {
  const db = getDatabase();

  let [usersList, setUserlist] = useState([]);

  let data = useSelector((state) => state);
  /**######################### USERList Read */
  useEffect(() => {
    const usersRef = ref(db, "users/");

    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.userStoreData.userInfo.uid !== item.key) {
          arr.push({ ...item.val(), uid: item.key });
        }
        console.log("userPic", item.val().email);
      });
      setUserlist(arr);
      console.log(arr);
    });
  }, []);

  /**######################### Friend Request Read */
  let [frq, setFrq] = useState([]);
  useEffect(() => {
    const usersRef = ref(db, "friendrequest");

    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().receiverUid + item.val().senderUid);
      });
      setFrq(arr);
    });
  }, []);

  /**######################### Button Fun Start */

  let butPand = (item) => {
    console.log(item.uid);
  };

  let butRequ = (item) => {
    console.log("ami request", item.displayName);

    toast(" Sent");

    set(push(ref(db, "friendrequest")), {
      senderName: data.userStoreData.userInfo.displayName,
      senderUid: data.userStoreData.userInfo.uid,
      senderPhotoURL: data.userStoreData.userInfo.photoURL,
      senderEmail: data.userStoreData.userInfo.email,
      receiverName: item.displayName,
      receiverUid: item.uid,
      receiverPhotoURL: item.photoURL,
      receiverEmail: item.email,
    });
  };

  /**######################### Button Fun end */
  /**######################### userList penddingTo friend button start */
  
 

  /**######################### userList penddingTo friend button start */

  return (
    <>
      {usersList.map((item) => (
        <div className="unitUser">
          <div className="uniImageDiv">
            <img
              className="unitUserImg"
              style={{
                width: "70px !important",
                height: "70px important",
                borderRadious: "50% !important",
              }}
              src={item.photoURL}
              alt="User Pic"
            />
          </div>
          <div style={{ width: "80%" }}>
            <div className="groupNametitle">
              <div>
                <h3 className="h3Group">{item.displayName}</h3>

                <h5 style={{ fontSize: "10px" }} className="h5Note">
                  {item.email}
                </h5>
              </div>

              <div className="buttonFlex">
                <div className="rejectAcc">
                  
                    <>
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

                      {frq.includes(
                        item.uid + data.userStoreData.userInfo.uid
                      ) ||
                      frq.includes(
                        data.userStoreData.userInfo.uid + item.uid
                      ) ? (
                        <p
                          onClick={() => butPand(item)}
                          style={{
                            backgroundColor: "magenta",
                            fontSize: "10px",
                            textAlign: "center",
                          }}
                          className="butGroup"
                        >
                          Pendding
                        </p>
                      ) : (
                        <p
                          onClick={() => butRequ(item)}
                          style={{ fontSize: "8px" }}
                          className="butGroup"
                        >
                          Send Request
                        </p>
                      )}
                    </>
              
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserList;
