import React, { useState, useRef } from "react";
import { Layer, Rect, Line } from "react-konva";

const Cropzone = ({ originalWidth, originalHeight, onCropzoneChange }) => {
  const [cropzone, setCropzone] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const [dragging, setDragging] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    mousePos.current = e.target.getStage().getPointerPosition();
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const newMousePos = e.target.getStage().getPointerPosition();

    const dx = newMousePos.x - mousePos.current.x;
    const dy = newMousePos.y - mousePos.current.y;

    const newCropzone = {
      ...cropzone,
      x: cropzone.x + dx,
      y: cropzone.y + dy,
    };

    // keep cropzone within bounds of the original image
    if (newCropzone.x < 0) {
      newCropzone.x = 0;
    }
    if (newCropzone.y < 0) {
      newCropzone.y = 0;
    }
    if (newCropzone.x + newCropzone.width > originalWidth) {
      newCropzone.x = originalWidth - newCropzone.width;
    }
    if (newCropzone.y + newCropzone.height > originalHeight) {
      newCropzone.y = originalHeight - newCropzone.height;
    }

    setCropzone(newCropzone);
    mousePos.current = newMousePos;
  };

  const handleMouseUp = () => {
    setDragging(false);
    onCropzoneChange(cropzone);
  };

  return (
    <Layer>
      <Rect
        x={cropzone.x}
        y={cropzone.y}
        width={cropzone.width}
        height={cropzone.height}
        fill="rgba(0,0,0,0.6)"
        stroke="white"
        strokeWidth={2}
        dash={[10, 5]}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        draggable
      />
      <Line
        points={[
          cropzone.x,
          cropzone.y,
          cropzone.x + cropzone.width,
          cropzone.y,
          cropzone.x + cropzone.width,
          cropzone.y + cropzone.height,
          cropzone.x,
          cropzone.y + cropzone.height,
          cropzone.x,
          cropzone.y,
        ]}
        stroke="white"
        strokeWidth={2}
        dash={[10, 5]}
      />
    </Layer>
  );
};

export default Cropzone;
