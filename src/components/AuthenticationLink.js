import React from "react";
import { Link } from "react-router-dom";


const AuthenticationLink = ({title,href,reftitle}) => {
  return (
    <div className="authenDiv">
      <h4 className="authenHeader">
        {title }
        <Link to={href}>
            <span className="authenPage"> {reftitle}</span>
        </Link>{" "}
      </h4>
    </div>
  );
};

export default AuthenticationLink;
