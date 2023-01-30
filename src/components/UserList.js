import React, { useEffect, useState } from "react";
import UnitUser from "../components/UnitUser";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const UserList = () => {
  const db = getDatabase();
  let [usersList, setUserlist] = useState([]);
  let data = useSelector((state) => state);

  useEffect(() => {
    const usersRef = ref(db, "users/");

    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.userStoreData.userInfo.uid != item.key) {
          arr.push(item.val());
        }
      });
      setUserlist(arr);
      console.log(arr);
    });
  }, []);

  return (
    <>
      {usersList.map((item) => (
        <UnitUser
          title={item.displayName}
          buttonName="Request"
          plusBut="false"
          note={item.email}
          timeOnly={false}
          imgsrc="assets/g3.png"
        />
      ))}
    </>
  );
};

export default UserList;
