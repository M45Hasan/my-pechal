import React from "react";
import { FaPlus } from "react-icons/fa";


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
          <div className="rejectAcc">
          {props.del=="Reject" && <p style={{backgroundColor:"red"}} className="butGroup">{props.del}</p> }
          {props.plusBut == "true" ? (
            <p className="butPlus">
              <FaPlus />
            </p>
          ) : (
           
            
          
            
            <p className="butGroup">{props.buttonName}</p>
            
              
          )}

          
          </div>
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
