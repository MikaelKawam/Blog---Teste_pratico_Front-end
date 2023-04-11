import { useState } from "react";

function ResizeController({ canvas, history }) {
  const [constrainProportions, setConstrainProportions] = useState(true);
  const [percent, setPercent] = useState(100);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [usePercentages, setUsePercentages] = useState(true);

  const startResizer = (event) => {
    const currentWidth = Math.ceil(canvas.original.width);
    const currentHeight = Math.ceil(canvas.original.height);
    setWidth(usePercentages ? 100 : currentWidth);
    setHeight(usePercentages ? 100 : currentHeight);
    history.add("beforeResize", false, true);
    canvas.zoom(1);
    openPanel("resize", event);
  };

  const togglePercentages = (usePercentages) => {
    if (usePercentages) {
      setWidth((width / canvas.original.width) * 100);
      setHeight((height / canvas.original.height) * 100);
    } else {
      setWidth((width * canvas.original.width) / 100);
      setHeight((height * canvas.original.height) / 100);
    }
  };

  const apply = () => {
    const currentWidth = Math.ceil(canvas.original.width);
    const currentHeight = Math.ceil(canvas.original.height);
    const newWidth = Math.ceil(width);
    const newHeight = Math.ceil(height);

    let widthScale, heightScale;
    if (usePercentages) {
      widthScale = width / 100;
      heightScale = height / 100;
    } else {
      widthScale = width / canvas.original.width;
      heightScale = height / canvas.original.height;
    }

    if (currentWidth === newWidth && currentHeight === newHeight) return;

    resize(widthScale, heightScale);

    history.add("resize", "open-width");
    canvas.fitToScreen();
  };

  const close = () => {
    canvas.fitToScreen();
  };

  const aspectToHeight = (newWidth) => {
    if (!constrainProportions) return;

    if (usePercentages) {
      setHeight(newWidth);
    } else {
      const wRatio = parseFloat(
        (canvas.original.width / newWidth).toPrecision(3)
      );
      setHeight(Math.ceil(canvas.original.height / wRatio));
    }
  };

  const aspectToWidth = (newHeight) => {
    if (!constrainProportions) return;

    if (usePercentages) {
      setWidth(newHeight);
    } else {
      const hRatio = parseFloat(
        (canvas.original.height / newHeight).toPrecision(3)
      );
      setWidth(Math.floor(canvas.original.width / hRatio));
    }
  };

  function resize(widthScale, heightScale) {
    const newHeight = Math.round(canvas.original.height * heightScale);
    const newWidth = Math.round(canvas.original.width * widthScale);

    canvas.fabric.setHeight(newHeight);
    canvas.fabric.setWidth(newWidth);
    canvas.original.width = newWidth;
    canvas.original.height = newHeight;

    const objects = canvas.fabric.getObjects();
    for (let i in objects) {
      const scaleX = objects[i].scaleX;
      const scaleY = objects[i].scaleY;
      const left = objects[i].left;
      const top = objects[i].top;

      const tempScaleX = scaleX * widthScale;
      const tempScaleY = scaleY * heightScale;
      const tempLeft = left * widthScale;
      const tempTop = top * heightScale;

      objects[i].set({
        scaleX: tempScaleX,
        scaleY: tempScaleY,
        left: tempLeft,
        top: tempTop,
      });
      objects[i].setCoords();
    }

    canvas.fabric.renderAll();
  }
}
