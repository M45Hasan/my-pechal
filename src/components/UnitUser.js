import React from "react";
import GroupNametitle from "../components/GroupNametitle";
import Image from "../components/Image";
const UnitUser = (props) => {
  return (
    <div className="unitUser">
      <Image style={{width:"15%"}} imgsrc={props.imgsrc} />
      <div style={{width:"80%"}}>
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
