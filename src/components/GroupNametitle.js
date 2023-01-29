import React from "react";
import { FaPlus } from "react-icons/fa";
import {MdDeleteForever}from "react-icons/md"
const GroupNametitle = (props) => {
  return (
    <>
      {!props.timeOnly ? (
        <div className="groupNametitle">
          <div>
            <h3 className="h3Group">{props.title}</h3>
            {props.plusBut == "true" ? (
              <p>Time</p>
            ) : (
              <h5 className="h5Note">{props.note}</h5>
            )}
          </div>
          {props.plusBut == "true" ? (
            <p className="butPlus">
              <FaPlus />
            </p>
          ) : (
            
            <button className="butGroup">{props.buttonName}</button>
            
              
          )}
        </div>
      ) : (
        <div className="groupNametitle">
          <div>
            <h3 className="h3Group">{props.title}</h3>
            <h5 className="h5Note">{props.note}</h5>
            </div>
            <p>Time</p>
        </div>
      )}
    </>
  );
};

export default GroupNametitle;
