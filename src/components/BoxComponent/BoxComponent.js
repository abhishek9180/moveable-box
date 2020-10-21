import React from "react";
import "./BoxComponent.css";

const BoxComponent = (props) => {
  const boxStyle = {
    top: props.boxData.top,
    left: props.boxData.left,
    zIndex: props.boxData.zIndex,
  };
  return (
    <div
      className={props.isActive ? "Box Active" : "Box"}
      style={boxStyle}
      onClick={(e) => props.handleBoxClick(props.boxData)}
    >
      {props.boxData.id}
    </div>
  );
};

export default BoxComponent;
