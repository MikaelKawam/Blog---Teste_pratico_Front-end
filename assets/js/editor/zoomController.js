import React, { useState, useEffect } from "react";
import { useCanvas } from "../hooks/useCanvas";

const ZoomController = () => {
  const [zoom, setZoom] = useState(1);
  const [maxScale, setMaxScale] = useState(200);
  const [minScale, setMinScale] = useState(30);
  const { canvas } = useCanvas();

  useEffect(() => {
    const onMainImageLoaded = () => {
      fitToScreen();
    };
    const onCanvasOpenedNew = () => {
      fitToScreen();
    };
    const onHistoryLoaded = () => {
      setZoom(canvas.currentScale * 100);
    };

    canvas.events.on("editor.mainImage.loaded", onMainImageLoaded);
    canvas.events.on("canvas.openedNew", onCanvasOpenedNew);
    canvas.events.on("history.loaded", onHistoryLoaded);

    return () => {
      canvas.events.off("editor.mainImage.loaded", onMainImageLoaded);
      canvas.events.off("canvas.openedNew", onCanvasOpenedNew);
      canvas.events.off("history.loaded", onHistoryLoaded);
    };
  }, [canvas]);

  useEffect(() => {
    const canvasZoom = canvas.currentZoom * 100;

    if (canvasZoom !== zoom) {
      setZoom(canvasZoom);
    }
  }, [canvas.currentZoom]);

  const fitToScreen = () => {
    const canvasZoom = canvas.currentZoom * 100;

    let oWidth, oHeight;

    if (canvas.mainImage) {
      oWidth = canvas.mainImage.originalState.width;
      oHeight = canvas.mainImage.originalState.height;
    } else {
      oWidth = canvas.original.width;
      oHeight = canvas.original.height;
    }

    const maxScale = Math.min(3582 / oHeight, 5731 / oWidth) * 100;
    const minScale = Math.min(141 / oHeight, 211 / oWidth) * 100;

    setMaxScale(Math.ceil(maxScale));
    setMinScale(Math.ceil(minScale));

    canvas.zoom(canvas.currentZoom);
  };

  const doZoom = () => {
    canvas.zoom(zoom / 100);
  };

  const getCurrentZoom = () => {
    return Math.round(canvas.currentZoom * 100);
  };

  return (
    <div>
      <div>{getCurrentZoom()}</div>
      <input
        type="range"
        min={minScale}
        max={maxScale}
        value={zoom}
        onChange={(e) => setZoom(e.target.value)}
        onMouseUp={doZoom}
      />
    </div>
  );
};

export default ZoomController;
