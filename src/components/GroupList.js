import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { ToastContainer } from "react-toastify";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import { Modal, Typography, Button, Box, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GroupList = () => {
  let [gname, setGname] = useState("");
  let [gTag, setGtag] = useState("");

  let [GpList, setGp] = useState([]);
  const db = getDatabase();

  let data = useSelector((state) => state);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let createGroup = () => {
    console.log("ami group");

    set(push(ref(db, "group")), {
      groupName: gname,
      groupTag: gTag,
      groupURL: data.userStoreData.userInfo.photoURL,
      adminId: data.userStoreData.userInfo.uid,
    }).then(() => {
      setOpen(false);
    });
  };
  let [show, setShow] = useState(true);
  useEffect(() => {
    const useRef = ref(db, "group");
    onValue(useRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.userStoreData.userInfo.uid !== item.val().adminId) {
          arr.push({
            ...item.val(),
            gid: item.key,
          });
        }
      });
      setGp(arr);
    });
  }, []);
  let groupJoin = (item) => {
    console.log("joinButt", item);
   
    set(
      push(ref(db, "join"), {
        ...item,
        groupId:item.gid,
        memberId: data.userStoreData.userInfo.uid,
        memberName: data.userStoreData.userInfo.displayName,
        memberURL: data.userStoreData.userInfo.photoURL,
      })
    );

    setShow(!show);
  };

  let groupLeave = (item) => {
    remove(ref(db, "join/"));

    setShow(!show);
  };

  return (
    <>
      <div className="groupNametitle">
        <div>
          <h3 className="h3Group">Group List</h3>
        </div>

        <div className="buttonFlex">
          <div className="rejectAcc">
            <p
              onClick={handleOpen}
              style={{ backgroundColor: "#5f35f5" }}
              className="butGroup"
            >
              Create Group
            </p>
          </div>
        </div>
      </div>

      {GpList.length > 0 ? (
        GpList.map((item) => (
          <div className="unitUser">
            <div className="uniImageDiv">
              <img
                className="unitUserImg"
                style={{
                  width: "70px !important",
                  height: "70px important",
                  borderRadious: "50% !important",
                }}
                src={item.groupURL}
                alt="User Pic"
              />
            </div>
            <div style={{ width: "80%" }}>
              <div className="groupNametitle">
                <div>
                  <h3 className="h3Group">{item.groupName}</h3>

                  <h5 style={{ fontSize: "10px" }} className="h5Note">
                    {item.groupTag}
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
                    {show ? (
                      <p
                        onClick={() => groupJoin(item)}
                        style={{ backgroundColor: "#5f35f5" }}
                        className="butGroup"
                      >
                        Join
                      </p>
                    ) : (
                      <p
                        onClick={() => groupLeave(item)}
                        style={{ backgroundColor: "red" }}
                        className="butGroup"
                      >
                        Leave
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          Create One
        </Alert>
      )}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Greate Group
            </Typography>
            <TextField
              onChange={(e) => setGname(e.target.value)}
              type="text"
              name="groupName"
              label="Group Name"
              variant="outlined"
              style={{ paddingBottom: "4px" }}
              className=" InputUnit"
            />
            <TextField
              onChange={(e) => setGtag(e.target.value)}
              type="text"
              name="Group tag"
              label="Tag"
              variant="outlined"
              style={{ paddingBottom: "4px" }}
              className=" InputUnit"
            />

            <Button
              style={{
                backgroundColor: "#5f35f5",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: "600",
                textAlign: "end",
              }}
              onClick={createGroup}
            >
              Create
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default GroupList;
