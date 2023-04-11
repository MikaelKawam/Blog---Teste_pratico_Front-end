const setCenterToOrigin = (obj) => {
  const originPoint = obj.translateToOriginPoint(
    obj.getCenterPoint(),
    obj._originalOriginX,
    obj._originalOriginY
  );

  obj.set({
    originX: obj._originalOriginX,
    originY: obj._originalOriginY,
    left: originPoint.x,
    top: originPoint.y,
  });

  obj.setCoords();
  canvas.renderAll();
};

const rotateProper = (originalAngle) => {
  canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), 1);
  const angle = (canvas.mainImage.getAngle() + originalAngle) % 360;

  const height =
    Math.abs(canvas.mainImage.getWidth() * Math.sin((angle * Math.PI) / 180)) +
    Math.abs(canvas.mainImage.getHeight() * Math.cos((angle * Math.PI) / 180));

  const width =
    Math.abs(canvas.mainImage.getHeight() * Math.sin((angle * Math.PI) / 180)) +
    Math.abs(canvas.mainImage.getWidth() * Math.cos((angle * Math.PI) / 180));

  canvas.fabric.setWidth(width * canvas.currentZoom);
  canvas.fabric.setHeight(height * canvas.currentZoom);
  canvas.original.height = height;
  canvas.original.width = width;
  canvas.mainImage.center();

  canvas.fabric.forEachObject((obj) => {
    obj.rotate((obj.getAngle() + originalAngle) % 360);
    obj.setCoords();
  });

  canvas.fabric.renderAll();
  canvas.fitToScreen();
};

const rotate = (angle, direction) => {
  if (!angle || angle > 360 || angle < 0) return;
  let resetOrigin = false;

  canvas.fabric.forEachObject((obj) => {
    if (direction && direction === "left") {
      angle = obj.getAngle() - 90;
    } else if (direction && direction === "right") {
      angle = obj.getAngle() + 90;
    }

    if (obj.originX !== "center" || obj.originY !== "center") {
      setOriginToCenter(obj);
      resetOrigin = true;
    }

    angle = angle > 360 ? 90 : angle < 0 ? 270 : angle;

    obj.setAngle(angle).setCoords();

    if (resetOrigin) {
      setCenterToOrigin(obj);
    }
  });

  canvas.fitToScreen();
  canvas.fabric.renderAll();
};

const setOriginToCenter = (obj) => {
  obj._originalOriginX = obj.originX;
  obj._originalOriginY = obj.originY;

  const center = obj.getCenterPoint();

  obj.set({
    originX: "center",
    originY: "center",
    left: center.x,
    top: center.y,
  });

  obj.setCoords();
  canvas.renderAll();
};

const applyRotation = () => {
  history.add("rotation", "rotate-right");
};

const cancel = () => {
  history.load("rotate-original-state");
  setAngle(0);
};

return <>{/* Add JSX for the RotateController component here */}</>;

export default RotateController;
