import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import { useCanvas, useText, useFonts } from "./customHooks";

const TextController = () => {
  const [opacity, setOpacity] = useState(1);
  const [fontSize, setFontSize] = useState(25);
  const [enableOutline, setEnableOutline] = useState(true);
  const [filters, setFilters] = useState({
    category: "handwriting",
    family: "",
  });

  const canvas = useCanvas();
  const text = useText();
  const fonts = useFonts(filters);

  const isPanelEnabled = () => {
    const obj = canvas.fabric.getActiveObject();
    return obj && obj.name === "text";
  };

  const changeFont = (font, e) => {
    const active = canvas.fabric.getActiveObject();
    if (!active || active.name !== "text") {
      const newText = new fabric.IText("Double click me to edit my contents.", {
        fontWeight: 400,
        fontSize: 28 / canvas.currentZoom,
        fill: "#fff",
        removeOnCancel: true,
        name: "text",
      });

      canvas.fabric.add(newText);
      newText.setTop(25);
      newText.setLeft(25);
      canvas.fabric.setActiveObject(newText);
      canvas.fabric.renderAll();
    }

    text.setProperty("fontFamily", font);
  };

  const cancelAddingTextToCanvas = () => {
    const textObject = text.getTextObject();

    if (textObject.removeOnCancel) {
      text.removeTextFromCanvas(textObject);
    }
  };

  const finishAddingTextToCanvas = () => {
    const textObject = text.getTextObject();

    $rootScope.activePanel = false;
    $rootScope.$emit("text.added", textObject);
    canvas.fabric.setActiveObject(canvas.mainImage);
    fonts.createLinkToFont(textObject.fontFamily);
  };

  useEffect(() => {
    const textObject = text.getTextObject();

    if (textObject) {
      textObject.removeOnCancel = false;
      canvas.fabric.setActiveObject(textObject);
    }
  }, [text, canvas]);

  return (
    <div>
      <div>{text}</div>
      <div>{fonts}</div>
      <input
        type="number"
        value={opacity}
        onChange={(e) => setOpacity(e.target.value)}
      />
      <input
        type="number"
        value={fontSize}
        onChange={(e) => setFontSize(e.target.value)}
      />
      <input
        type="checkbox"
        checked={enableOutline}
        onChange={(e) => setEnableOutline(e.target.checked)}
      />
      <button onClick={() => fonts.getAll(filters)}>Get Fonts</button>
    </div>
  );
};

export default TextController;
