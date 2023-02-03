import React, { useEffect, useState } from "react";
import UnitUser from "../components/UnitUser";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { getStorage, ref as def, getDownloadURL } from "firebase/storage";

const UserList = () => {
  const db = getDatabase();
  const storage = getStorage();
  const auth = getAuth();
  let [usersList, setUserlist] = useState([]);
  let [id, setId] = useState();

  let data = useSelector((state) => state);

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

  return (
    <>
      {usersList.map((item) => (
        <>
          <UnitUser
            title={item.displayName}
            buttonName="Request"
            plusBut="false"
            note={item.uid}
            timeOnly={false}
            alt="User Pic"
            imgsrc={item.photoURL}
          />
        </>
      ))}
    </>
  );
};

export default UserList;
