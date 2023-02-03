import React from "react";

const Image = ({ imgsrc, className, alt }) => {
  return (
    <>
      <img
        src={imgsrc}
        className={className}
        style={{
          width: "70px !important",
          height: "70px important",
          borderRadious: "50% !important",
        }}
        alt={alt}
      />
    </>
  );
};

export default Image;
