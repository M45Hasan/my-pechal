import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import GroupNametitle from "../components/GroupNametitle";

import UserList from "../components/UserList";
import FriendRequest from "../components/FriendRequest";
import Friends from "../components/Friends";
import BlockList from "../components/BlockList";
import MyGroup from "../components/MyGroup";
import  GroupList  from "../components/GroupList";
// import Friends from "../components/Friends"

const Home = () => {
  let navigate = useNavigate();

  let reduxReturnData = useSelector((state) => state);
  // console.log("Redux-Data:",reduxReturnData.userStoreData.userInfo.uid);
  useEffect(() => {
    if (reduxReturnData.userStoreData.userInfo == null) {
      console.log("not signIn ");

      navigate("/login");
    }
  }, []);

  return (
    <>
      <Grid item xs={4}>
        <div className="groupHolder">
         
         <GroupList/>
        </div>

        <div className="groupHolder">
          <GroupNametitle
            title="Friend Request"
            buttonName=""
            plusBut="false"
            note=""
            timeOnly={false}
          />

          <FriendRequest />
        </div>
      </Grid>

      <Grid item xs={3}>
        <div className="groupHolder">
          <GroupNametitle title="Friends " buttonName="" />

          <Friends />
        </div>

        <div className="groupHolder">
          <GroupNametitle
            title="My Group "
            buttonName=""
            plusBut="false"
            note=""
            timeOnly={false}
          />
      
          <MyGroup />
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className="groupHolder">
          <GroupNametitle
            title="User List "
            buttonName="View"
            plusBut="false"
            note=""
            timeOnly={false}
          />
          <div className="userListDiv">
            <UserList />
          </div>
        </div>

        <div className="groupHolder">
          <GroupNametitle
            title="Block Users "
            buttonName=""
            plusBut="false"
            note=""
            timeOnly={false}
          />

          <BlockList />
        </div>
      </Grid>
    </>
  );
};

export default Home;
