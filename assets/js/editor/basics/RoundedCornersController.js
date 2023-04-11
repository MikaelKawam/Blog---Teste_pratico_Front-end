import React, { useState, useEffect, useRef } from "react";
import fabric from "fabric";

const RoundedCornersController = ({ canvas, history }) => {
  const [radius, setRadius] = useState(50);
  const [rect, setRect] = useState(null);

  const startRoundedCorners = (e) => {
    if (activePanel === "round") return;
    openPanel("round", e);

    const rect = new fabric.Rect({
      width: canvas.original.width,
      height: canvas.original.height,
      rx: radius,
      ry: radius,
      opacity: 1,
      fill: "transparent",
      name: "rounding-rect",
      stroke: "#fff",
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false,
      ignore: true,
    });

    canvas.fabric.add(rect);
    canvas.fabric.renderAll();
    setRect(rect);
  };

  const adjustPreview = () => {
    if (!rect) return;

    rect.set({
      rx: radius,
      ry: radius,
    });
    canvas.fabric.renderAll();
  };

  const cancel = (leavePanel) => {
    canvas.fabric.remove(rect);
    setRect(null);
    setRadius(50);
    canvas.fabric.renderAll();

    if (!leavePanel) {
      setActivePanel(false);
    }
  };

  const apply = () => {
    const roundCorners = { radius: radius };
    canvas.fabric.clipTo = (ctx) => {
      rect.render(ctx);
      canvas.fabric.clipTo = false;
    };
    const data = canvas.fabric.toDataURL();
    canvas.fabric.clear();
    cancel();

    canvas.loadMainImage(data, false, false, false, () => {
      history.add("Round Corners", "panorama-wide-angle");
    });
  };

  const handleTabChanged = (newTab, oldTab) => {
    if (oldTab === "basics" && rect && newTab !== "basics") {
      cancel();
    }
  };

  const handleActivePanelChanged = (newPanel, oldPanel) => {
    if (newPanel !== "round" && oldPanel === "round") {
      cancel(true);
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      adjustPreview();
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [rect]);

  return <div>{/* Add the necessary UI components here */}</div>;
};

export default RoundedCornersController;
