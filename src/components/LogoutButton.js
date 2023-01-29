import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activeUser } from "../slices/UserSlice";
import { AiOutlineLogout } from "react-icons/ai";
const LogoutButton = () => {
  let auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let handleLogout = () => {
    // Sign-out successful.
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userInfo");
        dispatch(activeUser(null))
        console.log("Sing Out from:", window.location.pathname.split("/")[1]);
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log("ami voi paise", error);
      });
  };

  return (
    <AiOutlineLogout className="logOut" onClick={handleLogout}/>
   
  );
};

export default LogoutButton;
