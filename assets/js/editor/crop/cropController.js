import React, { useState, useEffect } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

function CropController(props) {
  const [cropper, setCropper] = useState(null);
  const [cropzone, setCropzone] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const cropperInstance = new Cropper(document.getElementById("image"), {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: function (event) {
        setWidth(Math.round(event.detail.width));
        setHeight(Math.round(event.detail.height));
      },
    });
    setCropper(cropperInstance);

    return () => {
      cropperInstance.destroy();
    };
  }, []);

  useEffect(() => {
    if (props.activePanel !== "crop" && props.oldPanel === "crop") {
      cropzone.remove();
    }
  }, [props.activePanel, props.oldPanel, cropzone]);

  useEffect(() => {
    if (props.oldTab === "basics" && props.newTab !== "basics") {
      cropper.stop();
    }
  }, [props.oldTab, props.newTab, cropper]);

  const handleCropzoneAdded = () => {
    setWidth(Math.round(cropzone.rect.width));
    setHeight(Math.round(cropzone.rect.height));
  };

  return (
    <div>
      <img src={props.imageSrc} id="image" alt="Crop image" />
      <button onClick={() => cropper.zoom(0.1)}>Zoom in</button>
      <button onClick={() => cropper.zoom(-0.1)}>Zoom out</button>
    </div>
  );
}

export default CropController;
