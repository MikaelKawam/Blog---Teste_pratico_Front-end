import React, { useEffect } from "react";

function Keybinds({ fabric }) {
  useEffect(() => {
    const movementDelta = 2;

    function handleKeyDown(e) {
      e = e || window.event;

      if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) moveObject(e);
      if (e.keyCode === 46) deleteObject();
    }

    function deleteObject() {
      const activeObject = fabric.getActiveObject();

      if (activeObject) {
        fabric.remove(activeObject);
        fabric.renderAll();
      }
    }

    function moveObject(e) {
      const activeObject = fabric.getActiveObject();
      const activeGroup = fabric.getActiveGroup();

      if (e.keyCode === 37) {
        e.preventDefault();
        if (activeObject) {
          const a = activeObject.get("left") - movementDelta;
          activeObject.set("left", a);
        } else if (activeGroup) {
          const a = activeGroup.get("left") - movementDelta;
          activeGroup.set("left", a);
        }
      } else if (e.keyCode === 39) {
        e.preventDefault();
        if (activeObject) {
          const a = activeObject.get("left") + movementDelta;
          activeObject.set("left", a);
        } else if (activeGroup) {
          const a = activeGroup.get("left") + movementDelta;
          activeGroup.set("left", a);
        }
      } else if (e.keyCode === 38) {
        e.preventDefault();
        if (activeObject) {
          const a = activeObject.get("top") - movementDelta;
          activeObject.set("top", a);
        } else if (activeGroup) {
          const a = activeGroup.get("top") - movementDelta;
          activeGroup.set("top", a);
        }
      } else if (e.keyCode === 40) {
        e.preventDefault();
        if (activeObject) {
          const a = activeObject.get("top") + movementDelta;
          activeObject.set("top", a);
        } else if (activeGroup) {
          const a = activeGroup.get("top") + movementDelta;
          activeGroup.set("top", a);
        }
      }

      if (activeObject) {
        activeObject.setCoords();
        fabric.renderAll();
      } else if (activeGroup) {
        activeGroup.setCoords();
        fabric.renderAll();
      }
    }

    function init() {
      document.addEventListener("keydown", handleKeyDown);
    }

    init();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [fabric]);

  return null;
}

export default Keybinds;
