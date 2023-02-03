import React from "react";
import GroupNametitle from "../components/GroupNametitle";
import Image from "../components/Image";
const UnitUser = (props) => {
  return (
    <div className="unitUser" style={{height:"70px !important",width:"70px !improtant",}}>
      <Image
       style={{height:"70px !important",width:"70px !improtant",borderRadius:"50% !important"}}
        imgsrc={props.imgsrc} alt={props.alt}
      />
      <div style={{ width: "80%" }}>
        <GroupNametitle
          title={props.title}
          buttonName={props.buttonName}
          plusBut={props.plusBut}
          note={props.note}
          timeOnly={props.timeOnly}
          del={props.del}
        />
      </div>
    </div>
  );
};

export default UnitUser;
