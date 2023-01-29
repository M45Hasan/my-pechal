import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import GroupNametitle from "../components/GroupNametitle";
import UnitUser from "../components/UnitUser";

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
          <GroupNametitle
            title=" Groups List"
            buttonName="Add Group"
            plusBut="false"
            note=""
            timeOnly={false}
          />
          <UnitUser
            title=" Hasan"
            buttonName="Join"
            plusBut="false"
            note="Hi Guys, Wassup!"
            timeOnly={false}
            imgsrc="assets/g1.png"
          />
          <UnitUser
            title=" AK LOL"
            buttonName="Join"
            plusBut="false"
            note="Hi Guys, Wassup!"
            timeOnly={false}
            imgsrc="assets/g2.png"
          />
          <UnitUser
            title=" Dev MERN"
            buttonName="Join"
            plusBut="false"
            note="Hi Guys, Wassup!"
            timeOnly={false}
            imgsrc="assets/g3.png"
          />
          <UnitUser
            title=" HERO Alam"
            buttonName="Join"
            plusBut="false"
            note="Hi Guys, Wassup!"
            timeOnly={false}
            imgsrc="assets/g1.png"
          />
          <UnitUser
            title="M Hasan"
            buttonName="Join"
            plusBut="false"
            note="Hi Guys, Wassup!"
            timeOnly={false}
            imgsrc="assets/g3.png"
          />
          <UnitUser
            title="Johanburg"
            buttonName="Join"
            plusBut="false"
            note="Hi Guys, Wassup!"
            timeOnly={false}
            imgsrc="assets/g1.png"
          />
        </div>

        <div className="groupHolder">
          <GroupNametitle
            title="Friend Request"
            buttonName="View"
            plusBut="false"
            note=""
            timeOnly={false}
          />
          <UnitUser
            title="Johanburg"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={false}
            imgsrc="assets/f1.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={false}
            imgsrc="assets/f2.png"
          />
          <UnitUser
            title="J anbur g"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={false}
            imgsrc="assets/f3.png"
          />
          <UnitUser
            title="XXohanburg"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={false}
            imgsrc="assets/f4.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={false}
            imgsrc="assets/f2.png"
          />
          <UnitUser
            title="J anbur g"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={false}
            imgsrc="assets/f3.png"
          />
          <UnitUser
            title="XXohanburg"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={false}
            imgsrc="assets/f4.png"
          />
        </div>
      </Grid>
      <Grid item xs={3}>
        <div className="groupHolder">
          <GroupNametitle
            title="Friends "
            buttonName="View"
            plusBut="false"
            note=""
            timeOnly={false}
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={true}
            imgsrc="assets/g1.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={true}
            imgsrc="assets/f3.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={true}
            imgsrc="assets/f4.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={true}
            imgsrc="assets/g2.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={true}
            imgsrc="assets/g3.png"
          />
        </div>

        <div className="groupHolder">
          <GroupNametitle
            title="My Group "
            buttonName="View"
            plusBut="false"
            note=""
            timeOnly={false}
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={true}
            imgsrc="assets/g1.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={true}
            imgsrc="assets/f3.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={true}
            imgsrc="assets/f4.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={true}
            imgsrc="assets/g2.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="false"
            note=" Wassup!"
            timeOnly={true}
            imgsrc="assets/g3.png"
          />
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
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="true"
            note=" Wassup!"
            timeOnly={false}
            imgsrc="assets/g3.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="true"
            note=" Wassup!"
            timeOnly={false}
            imgsrc="assets/f1.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="true"
            note=" Wassup!"
            timeOnly={false}
            imgsrc="assets/f3.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="true"
            note=" Wassup!"
            timeOnly={false}
            imgsrc="assets/g2.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Accept"
            plusBut="true"
            note=" Wassup!"
            timeOnly={false}
            imgsrc="assets/f1.png"
          />
        </div>
        <div className="groupHolder">
          <GroupNametitle
            title="Block Users "
            buttonName="View"
            plusBut="false"
            note=""
            timeOnly={false}
          />
          <UnitUser
            title="Joh"
            buttonName="Unblock"
            plusBut="false"
            note="Time"
            timeOnly={false}
            imgsrc="assets/f1.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Unblock"
            plusBut="false"
            note="Time"
            timeOnly={false}
            imgsrc="assets/f1.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Unblock"
            plusBut="false"
            note="Time"
            timeOnly={false}
            imgsrc="assets/f1.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Unblock"
            plusBut="false"
            note="Time"
            timeOnly={false}
            imgsrc="assets/f1.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Unblock"
            plusBut="false"
            note="Time"
            timeOnly={false}
            imgsrc="assets/f1.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Unblock"
            plusBut="false"
            note="Time"
            timeOnly={false}
            imgsrc="assets/f1.png"
          />
          <UnitUser
            title="Joh"
            buttonName="Unblock"
            plusBut="false"
            note="Time"
            timeOnly={false}
            imgsrc="assets/f1.png"
          />
        </div>
      </Grid>
    </>
  );
};

export default Home;
