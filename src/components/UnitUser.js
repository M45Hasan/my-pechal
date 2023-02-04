import React from "react";
import GroupNametitle from "../components/GroupNametitle";
import Image from "../components/Image";
const UnitUser = (props) => {
  return (
    <div className="unitUser">
      <div className="uniImageDiv">
        <Image
          className={props.className}
          imgsrc={props.imgsrc}
          alt={props.alt}
        />
      </div>
      <div style={{ width: "80%" }}>
        <GroupNametitle
          title={props.title}
          buttonName={props.buttonName}
          butFun={props.butFun}
          note={props.note}
          timeOnly={props.timeOnly}
          del={props.del}
          delFun={props.delFun}
          setDel={props.setDel}
          setRej={props.setRej}
        />
      </div>
    </div>
  );
};

export default UnitUser;
