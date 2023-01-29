import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const LoginUser = () => {
  let navigate = useNavigate();
  //  *******Firebase End**************************
  let reduxReturnData = useSelector((state) => state);

  useEffect(() => {
    if (!reduxReturnData.userStoreData.userInfo==null) {
      console.log("should stay in Home Page ");

      navigate("/home");
    }else{
      navigate("/")
    }
  },[]);
  return <></>;
};

export default LoginUser;
