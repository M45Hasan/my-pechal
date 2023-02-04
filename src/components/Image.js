import React from "react";

const Image = ({ imgsrc, alt,className }) => {
  return (
    <>
      <img
        className={className}
        style={{
          width: "70px !important",
          height: "70px important",
          borderRadious: "50% !important",
        }}
        src={imgsrc}
        alt={alt}
      />
    </>
  );
};

export default Image;
