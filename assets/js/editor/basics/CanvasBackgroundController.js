import React from "react";
import { useCanvas } from "./canvasContext";

function CanvasBackgroundController() {
  const { canvas, history } = useCanvas();

  const setBackground = (color) => {
    canvas.fabric.setBackgroundColor(color);
    canvas.fabric.renderAll();
  };

  const apply = () => {
    history.add("Canvas Color", "format-color-fill");
  };

  const cancel = () => {
    canvas.fabric.setBackgroundColor("");
    canvas.fabric.renderAll();
  };

  return (
    <div>
      <button onClick={() => setBackground("red")}>Red</button>
      <button onClick={() => setBackground("green")}>Green</button>
      <button onClick={() => setBackground("blue")}>Blue</button>
      <button onClick={apply}>Apply</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}

export default CanvasBackgroundController;
