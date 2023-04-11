import { useContext } from "react";
import { CanvasContext } from "./CanvasContext";

function Text() {
  const { canvas } = useContext(CanvasContext);

  function removeTextFromCanvas(textObject) {
    if (!textObject) {
      textObject = canvas.fabric.getActiveObject();
    }

    // bail if we don't have a text object
    if (!textObject.setFontSize) return;

    canvas.fabric.remove(textObject);
    canvas.fabric.renderAll();
  }

  function getTextObject() {
    const active = canvas.fabric.getActiveObject();

    if (active && active.fontFamily) {
      return active;
    }

    // if there is no active object or active object
    // is not text, return first text object available
    if (!active || !active.fontFamily) {
      const objects = canvas.fabric.getObjects();

      for (let i = 0; i < objects.length; i++) {
        if (objects[i].fontFamily) {
          return objects[i];
        }
      }
    }
  }

  function toggleTextDecoration(value) {
    const text = getTextObject();
    let current = text.textDecoration.trim();

    // font style
    if (value === "italic") {
      if (text.fontStyle.indexOf("italic") > -1) {
        text.setFontStyle("normal");
      } else {
        text.setFontStyle("italic");
      }
    }

    // text decoration
    else {
      if (current.indexOf(value) > -1) {
        current = current.replace(value, "").trim();
      } else {
        current += " " + value;
      }

      if (text.setTextDecoration) {
        text.setTextDecoration(current);
      }
    }

    canvas.fabric.renderAll();

    const decorations = text.fontStyle + " " + text.textDecoration.trim();

    return decorations.split(" ");
  }

  function setProperty(property, value) {
    const text = getTextObject();
    const setter = makeSetterName(property);

    if (text[setter]) {
      text[setter](value);
    }

    canvas.fabric.renderAll();
  }

  /**
   * Toggle given property on/off on text object.
   *
   * @param {string}  property
   * @param {boolean} enabled
   */
  function toggleProperty(property, enabled) {
    const text = getTextObject();
    const setter = makeSetterName(property);

    if (text[setter]) {
      text[setter](enabled);
    }

    canvas.fabric.renderAll();
  }

  /**
   * Compile a fabric setter function name from give property.
   *
   * @param name (backgroundColor)
   * @returns string (setBackgroundColor)
   */
  function makeSetterName(name) {
    return "set" + name.charAt(0).toUpperCase() + name.slice(1);
  }

  return {
    removeTextFromCanvas,
    getTextObject,
    toggleTextDecoration,
    setProperty,
    toggleProperty,
    makeSetterName,
  };
}

export default Text;
