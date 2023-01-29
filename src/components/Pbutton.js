import React from "react";



const Pbutton = (props) => {   
  return (
    <>
      {" "}
      <props.name onClick={props.click} variant="contained" disableRipple>
        {props.title}
      </props.name>
    </>
  );
};

export default Pbutton;
