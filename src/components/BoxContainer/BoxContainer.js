import React, { useState, useEffect, useRef } from "react";
import "./BoxContainer.css";
import BoxComponent from "../BoxComponent/BoxComponent";

const BoxContainer = () => {
  const BoxContainerRef = useRef(null);
  const stepSize = 5;
  const boxSize = 50;
  const [boxList, setBoxList] = useState([]);
  const [zIndex, setZIndex] = useState(1);
  const [selectBoxIndex, setSelectedBoxIndex] = useState(-1);
  const [maxWidth, setMaxWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const updateWindowDimensions = () => {
    setMaxWidth(window.innerWidth - boxSize - 25);
    // -50 is to avoid overlapping with button at bottom
    setMaxHeight(window.innerHeight - boxSize - 50);
  };

  const generateNewId = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };
  const addNewBox = () => {
    const newBox = {
      id: generateNewId(),
      left: 10,
      top: 10,
      zIndex: zIndex,
    };
    setBoxList([...boxList, newBox]);
    setZIndex(zIndex + 1);
  };

  const handleBoxClick = (boxData) => {
    const index = boxList.findIndex((b) => boxData.id === b.id);
    if (index > -1) {
      setSelectedBoxIndex(index);
    }
  };

  const handleKeyPress = (e) => {
    const activeBox = boxList[selectBoxIndex];
    const keyCode = e.which || e.keyCode;
    let updatedBox = null;
    switch (keyCode) {
      case 37: //left arrow key
        updatedBox = moveLeft(activeBox);
        break;
      case 38: //Up arrow key
        updatedBox = moveUp(activeBox);
        break;
      case 39: //right arrow key
        updatedBox = moveRight(activeBox);
        break;
      case 40: //down arrow key
        updatedBox = moveDown(activeBox);
        break;
      case 46: //delete key
        deleteBox(selectBoxIndex);
        break;
      default:
        break;
    }

    if (updatedBox) {
      const newList = [...boxList];
      newList[selectBoxIndex] = updatedBox;
      setBoxList(newList);
    }
  };

  const checkBoundry = (left, top) => {
    if (left <= 0 || left >= maxWidth || top <= 0 || top >= maxHeight) {
      return false;
    }
    return true;
  };
  const moveLeft = (activeBox) => {
    const newCoor = { ...activeBox };
    newCoor.left -= stepSize;
    if (checkBoundry(newCoor.left, newCoor.top)) {
      return newCoor;
    }
  };
  const moveUp = (activeBox) => {
    const newCoor = { ...activeBox };
    newCoor.top -= stepSize;
    if (checkBoundry(newCoor.left, newCoor.top)) {
      return newCoor;
    }
  };
  const moveRight = (activeBox) => {
    const newCoor = { ...activeBox };
    newCoor.left += stepSize;
    if (checkBoundry(newCoor.left, newCoor.top)) {
      return newCoor;
    }
  };
  const moveDown = (activeBox) => {
    const newCoor = { ...activeBox };
    newCoor.top += stepSize;
    if (checkBoundry(newCoor.left, newCoor.top)) {
      return newCoor;
    }
  };
  const deleteBox = (activeBoxIndex) => {
    const newList = [...boxList];
    newList.splice(activeBoxIndex, 1);
    setBoxList(newList);
  };

  return (
    <React.Fragment>
      <div
        className="BoxContainer"
        ref={BoxContainerRef}
        tabIndex="0"
        onKeyDown={handleKeyPress}
      >
        {boxList.map((b, index) => {
          return (
            <BoxComponent
              key={b.id}
              boxData={b}
              isActive={index === selectBoxIndex}
              handleBoxClick={handleBoxClick}
              handleKeyPress={handleKeyPress}
            />
          );
        })}
      </div>
      <div className="BtnContainer">
        <button onClick={addNewBox}>Add Box</button>
      </div>
    </React.Fragment>
  );
};

export default BoxContainer;
