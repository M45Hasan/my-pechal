import React from "react";



const Pbutton = (props,click) => {   
  return (
    <div>
      {" "}
      <props.name onClick={props.click} variant="contained" disableRipple>
        {props.title}
      </props.name>
    </div>
  );
};

export default Pbutton;
