import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import {
  AlertTitle,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Modal,
  Button,
  Box,
} from "@mui/material";
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

const MyGroup = () => {
  let [GpList, setGp] = useState([]);
  const db = getDatabase();

  let data = useSelector((state) => state);

  useEffect(() => {
    const useRef = ref(db, "group");
    onValue(useRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().adminId == data.userStoreData.userInfo.uid) {
          arr.push({
            ...item.val(),
            gid: item.key,
          });
        }
      });
      setGp(arr);
      console.log(arr);
    });
  }, []);

  let buttdel = (item) => {
    console.log(item.gid);
    remove(ref(db, "group/" + item.gid));
    console.log("group delete");
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  let [member, setMemb] = useState([]);

  const handleOpen = (item) => {
    console.log("myMember:", item);
    setOpen(true);
    let useRef = ref(db, "join");
    onValue(useRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((it) => {
        if (
          item.gid == it.key &&
          item.adminId == data.userStoreData.userInfo.uid
        ) {
          arr.push({
            ...it.val(),
            gid: it.key,
          });
        }
      });
      setMemb(arr);
      console.log(arr);
    });
  };
  return (
    <>
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
                    {item.groupNote}
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
                      onClick={() => buttdel(item)}
                      style={{ backgroundColor: "red", fontSize: "10px" }}
                      className="butGroup"
                    >
                      Delete
                    </p>

                    <p
                      onClick={() => handleOpen(item)}
                      className="butGroup"
                      style={{ fontSize: "10px" }}
                    >
                      Member
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

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Members
            </Typography>

            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {member.map((item) => (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={item.memberURL} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.memberName}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          ></Typography>
                          {"Hi Moto"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))}
            </List>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default MyGroup;
