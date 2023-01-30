import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Logout = () => {
  let navigate = useNavigate();
  let reduxReturnData = useSelector((state) => state);

  //  *******Firebase End**************************
  useEffect(() => {
    
    
    if (reduxReturnData.userStoreData.userInfo == null) {
      console.log("not signIn ");

      navigate("/login");
 
    }
    
  }, [ ]);

  return <></>;
};

export default Logout;
