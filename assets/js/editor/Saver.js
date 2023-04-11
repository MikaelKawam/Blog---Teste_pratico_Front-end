import React from "react";
import { saveAs } from "file-saver";
import canvas from "./canvas"; // import the canvas module
import cropper from "./cropper"; // import the cropper module
import history from "./history"; // import the history module

const Saver = ({ isDemo, isIntegrationMode, handleCallbacks }) => {
  const saveImage = (format, quality, name, e) => {
    canvas.fabric.deactivateAll();
    cropper.stop();

    if (isDemo) {
      return handleDemoSiteSave(e);
    }

    if (isIntegrationMode) {
      return handleIntegrationModeSave(format, quality, name);
    }

    saveToComputer(format, quality, name);
  };

  const handleIntegrationModeSave = (format, quality, name) => {
    canvas.zoom(1);
    const data = getDataUrl(format, quality);

    handleCallbacks(data, name);

    //firefox integration mode fix
    document.querySelector(".md-dialog-container").remove();

    //close the dialog and the pixie editor
    $mdDialog.hide();
    $rootScope.pixie.close();
  };

  const saveToComputer = (format, quality, name) => {
    canvas.zoom(1);

    const link = document.createElement("a");
    const data = getDataUrl(format, quality);

    handleCallbacks(data, name);

    //browser supports html5 download attribute
    if (typeof link.download !== "undefined") {
      link.download = (name || "image") + "." + format;
      link.href = data;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    //canvas blob and file saver workaround
    else {
      canvas.fabric.lowerCanvasEl.toBlob(
        function (blob) {
          saveAs(blob, name + "." + format);
        },
        "image/" + format,
        quality
      );
    }

    $mdDialog.hide();
  };

  const handleDemoSiteSave = (e) => {
    const demoAlert = document.querySelector(".demo-alert");
    demoAlert.addEventListener(
      "animationend",
      () => {
        demoAlert.classList.remove("animated", "shake");
        e.target.blur();
      },
      { once: true }
    );
    demoAlert.classList.add("animated", "shake");
  };

  const getDataUrl = (format, quality) => {
    if (format === "json") {
      return (
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(history.getCurrentCanvasState()))
      );
    }

    return canvas.fabric.toDataURL({
      format: format || "png",
      quality: (quality || 8) / 10,
    });
  };

  return <div>{/* your component UI */}</div>;
};

export default Saver;
