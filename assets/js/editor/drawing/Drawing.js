import React, { useRef } from "react";
import { fabric } from "fabric";

const Drawing = ({ canvas }) => {
  const drawingRef = useRef(null);

  const availableBrushes = [
    "pencil",
    "vLine",
    "diamond",
    "hLine",
    "circle",
    "square",
    "spray",
  ];

  const defaultBrushName = "pencil";

  const params = {
    shadowColor: "#1E89E6",
    brushWidth: 9,
    brushColor: "#000",
    shadowBlur: 30,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    enableShadow: false,
  };

  const enable = () => {
    canvas.isDrawingMode = true;
    changeBrush(defaultBrushName);

    if (!shadow) {
      shadow = new fabric.Shadow({
        color: params.shadowColor,
        blur: params.shadowBlur,
        offsetX: params.shadowOffsetX,
        offsetY: params.shadowOffsetY,
      });
    }

    isEnabled = true;
  };

  const disable = () => {
    canvas.isDrawingMode = false;
    isEnabled = false;
  };

  const setShadowProperty = (name, value) => {
    if (canvas.freeDrawingBrush.shadow[name]) {
      canvas.freeDrawingBrush.shadow[name] = value;
    }
  };

  const setProperty = (name, value) => {
    if (canvas.freeDrawingBrush[name]) {
      canvas.freeDrawingBrush[name] = value;
    }
  };

  const toggleShadow = (on) => {
    if (on) {
      canvas.freeDrawingBrush.shadow = shadow;
    } else {
      shadow = canvas.freeDrawingBrush.shadow;
      canvas.freeDrawingBrush.shadow = undefined;
    }
  };

  const makeBrushName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1) + "Brush";
  };

  const makeVLineBrush = () => {
    const VLineBrush = new fabric.PatternBrush(canvas);

    VLineBrush.getPatternSrc = function () {
      const patternCanvas = fabric.document.createElement("canvas");
      patternCanvas.width = patternCanvas.height = 10;
      const ctx = patternCanvas.getContext("2d");

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(10, 5);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };

    return VLineBrush;
  };

  const makeDiamondBrush = () => {
    const DiamondBrush = new fabric.PatternBrush(canvas);

    DiamondBrush.getPatternSrc = function () {
      const squareWidth = 10,
        squareDistance = 5;
      const patternCanvas = fabric.document.createElement("canvas");
      const rect = new fabric.Rect({
        width: squareWidth,
        height: squareWidth,
        angle: 45,
        fill: this.color,
      });

      const canvasWidth = rect.getBoundingRectWidth();

      patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
      rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

      const ctx = patternCanvas.getContext("2d");
      rect.render(ctx);

      return patternCanvas;
    };

    return DiamondBrush;
  };

  const makeHLineBrush = () => {
    const HLineBrush = new fabric.PatternBrush(canvas);

    HLineBrush.getPatternSrc = function () {
      if (HLineBrush.patternSrc) {
        return HLineBrush.patternSrc;
      }

      var canvas = document.createElement("canvas");
      canvas.width = canvas.height = HLineBrush.patternSize;

      var context = canvas.getContext("2d");
      context.strokeStyle = HLineBrush.patternColor;
      context.lineWidth = HLineBrush.patternLineWidth;
      context.beginPath();
      context.moveTo(0, HLineBrush.patternSpacing / 2);
      context.lineTo(HLineBrush.patternSize, HLineBrush.patternSpacing / 2);
      context.stroke();

      HLineBrush.patternSrc = canvas.toDataURL();
      return HLineBrush.patternSrc;
    };
  };
};
