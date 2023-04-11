import React from "react";
import canvas from "./canvas";
import Drawing from "./Drawing";
import history from "./history";

class DrawingController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawing: drawing,
    };
  }

  changeBrush(brush, event) {
    event.preventDefault();
    canvas.fabric.isDrawingMode = true;
    drawing.changeBrush(brush);
  }

  finishAddingDrawingsToCanvas() {
    if (canvas.mainImage) {
      canvas.fabric.setActiveObject(canvas.mainImage);
    }

    canvas.fabric.getObjects("freeDrawing").forEach((obj) => {
      obj.removeOnCancel = false;
    });

    drawing.disable();
    history.add("added drawing", "brush");
  }

  cancelAddingDrawingsToCanvas() {
    canvas.fabric.getObjects("freeDrawing").forEach((obj) => {
      if (obj.removeOnCancel) {
        canvas.fabric.remove(obj);
      }
    });

    drawing.disable();
    canvas.fabric.renderAll();
  }

  componentDidMount() {
    canvas.fabric.on("path:created", (e) => {
      if (drawing.isEnabled) {
        e.path.setOptions(canvas.imageStatic);
        e.path.name = "freeDrawing";
        e.path.removeOnCancel = true;
      }
    });
  }

  componentWillUnmount() {
    drawing.disable();
    this.cancelAddingDrawingsToCanvas();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.changeBrush("brush1")}>Brush 1</button>
        <button onClick={() => this.changeBrush("brush2")}>Brush 2</button>
        <button onClick={() => this.finishAddingDrawingsToCanvas()}>
          Finish
        </button>
        <button onClick={() => this.cancelAddingDrawingsToCanvas()}>
          Cancel
        </button>
      </div>
    );
  }
}
