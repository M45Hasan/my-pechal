import React from "react";

const GroupNametitle = (props) => {
  return (
    <>
      {!props.timeOnly ? (
        <div className="groupNametitle">
          <div>
            <h3 className="h3Group">{props.title}</h3>

            <h5 className="h5Note">{props.note}</h5>
          </div>

          <div className="buttonFlex">
            <div className="rejectAcc">
              {props.setDel ? (
                <p
                  onClick={props.delFun}
                  style={{ backgroundColor: "red" }}
                  className="butGroup"
                >
                  {props.del}
                </p>
              ) : (
                <>
                  {props.setRej && (
                    <p
                      onClick={props.delFun}
                      style={{ backgroundColor: "red" }}
                      className="butGroup"
                    >
                      {props.del}
                    </p>
                  )}
                  <p onClick={props.butFun} className="butGroup">
                    {props.buttonName}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="groupNametitle">
          <div>
            <h3 className="h3Group">{props.title}</h3>
            <h5 className="h5Note">{props.note}</h5>
          </div>
          <p>{props.timeOnly }</p>
        </div>
      )}
    </>
  );
};

export default GroupNametitle;
