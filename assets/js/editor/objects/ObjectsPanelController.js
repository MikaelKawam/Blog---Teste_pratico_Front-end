import React, { useState, useEffect } from "react";

const ObjectsPanelController = ({ canvas }) => {
  const [objects, setObjects] = useState(canvas.fabric._objects || []);

  const sortableOptions = {
    items: ".object:visible",
    scroll: false,
    containment: "parent",
    start: (e, ui) => {
      ui.item.data("start", ui.item.index());
    },
    update: (e, ui) => {
      const start = ui.item.data("start");
      const end = ui.item.index();
      let obj = canvas.fabric.getObjects()[start];
      if (!obj) return;

      if (end > start) {
        //send object forwards by the amount of objects it passed
        for (let i = 0; i < end - start; i++) {
          canvas.fabric.bringForward(obj);
        }
      } else {
        //send object backwards by the amount of objects it passed
        for (let i = 0; i < start - end; i++) {
          canvas.fabric.sendBackwards(obj);
        }
      }

      setTimeout(() => {
        canvas.fabric.renderAll();
      });
    },
  };

  const setAsActive = (object) => {
    if (object) {
      canvas.fabric.setActiveObject(object);
    }
  };

  const toggleVisibility = (object) => {
    if (!object) return;
    if (object.visible) {
      object.set({
        visible: false,
        evented: false,
        selectable: false,
        hasBorders: false,
        hasCorners: false,
      });
    } else {
      object.set({
        visible: true,
        evented: true,
        selectable: true,
        hasBorders: true,
        hasCorners: true,
      });
      canvas.fabric.setActiveObject(object);
    }

    canvas.fabric.renderAll();
  };

  const deleteObject = (object) => {
    if (object) {
      canvas.fabric.remove(object);
      canvas.fabric.renderAll();
    }
  };

  const toggleLock = (object) => {
    if (!object) return;
    if (object.locked) {
      object.set({
        locked: false,
        selectable: true,
        evented: true,
        lockMovementX: false,
        lockMovementY: false,
        lockRotation: false,
        lockScalingX: false,
        lockScalingY: false,
        lockUniScaling: false,
        hasControls: true,
        hasBorders: true,
      });

      canvas.fabric.setActiveObject(object);
    } else {
      object.set({
        locked: true,
        selectable: false,
        evented: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        hasControls: false,
        hasBorders: false,
      });
    }

    canvas.fabric.renderAll();
  };

  useEffect(() => {
    setObjects(canvas.fabric._objects || []);
  }, [canvas.fabric._objects]);

  return <div>{/* Your JSX code goes here */}</div>;
};

export default ObjectsPanelController;
