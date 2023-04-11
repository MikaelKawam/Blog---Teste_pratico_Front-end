import React, { useEffect } from "react";

const RenderBrushes = ({ drawing, changeBrush }) => {
  useEffect(() => {
    const template = drawing.availableBrushes.map((brush) => (
      <div
        key={brush}
        className={`brush animated-in-sequence ${
          drawing.activeBrushName === brush ? "active" : ""
        }`}
        onClick={() => changeBrush(brush)}
      >
        <img
          className="img-responsive"
          src={`assets/images/brushes/${brush}.png`}
          alt={brush}
        />
        <div className="brush-name">{brush}</div>
      </div>
    ));
    return () => {
      // cleanup function
    };
  }, [drawing, changeBrush]);

  return <div>{template}</div>;
};

export default RenderBrushes;
