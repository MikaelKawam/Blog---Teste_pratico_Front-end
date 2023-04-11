import React, { useState } from "react";

const TopPanelController = ({ canvas, history }) => {
  const [isDemo] = useState(false);
  const [canOpenImage] = useState(false);
  const [openImageMode] = useState("open");
  const [canvasWidth] = useState(800);
  const [canvasHeight] = useState(600);
  const [imageName] = useState("image");
  const [imageType] = useState("jpeg");
  const [imageQuality] = useState(8);
  const [objectsPanelOpen, setObjectsPanelOpen] = useState(true);
  const [historyPanelOpen, setHistoryPanelOpen] = useState(false);

  const openUploadDialog = ($event) => {
    // Implement logic here
  };

  const toggleRightPanel = (name, e) => {
    const panelIsOpen =
      name === "objects" ? objectsPanelOpen : historyPanelOpen;

    if (panelIsOpen) {
      name === "objects"
        ? setObjectsPanelOpen(false)
        : setHistoryPanelOpen(false);
      document.getElementById(name).style.display = "none";
    } else {
      name === "objects"
        ? setObjectsPanelOpen(true)
        : setHistoryPanelOpen(true);
      document.getElementById(name).style.display = "block";
    }
  };

  const transformOpen = (name, e) => {
    const panel = document.getElementById(name);

    panel.classList.remove("transition-out", "transition-in");
    panel.style.display = "block";
    transformToClickElement(panel, e);

    window.requestAnimationFrame(() => {
      panel.classList.add("transition-in");
      panel.style.transform = "";
      e.currentTarget.blur();
    });
  };

  const transformClose = (name, e) => {
    const panel = document.getElementById(name);

    panel.classList.add("transition-out");
    panel.classList.remove("transition-in");
    transformToClickElement(panel, e);

    panel.addEventListener(
      $rootScope.transitionEndEvent,
      function () {
        panel.style.display = "none";
        panel.style.transform = "";
        panel.classList.remove("transition-out");
        e.currentTarget.blur();
      },
      { once: true }
    );
  };

  const transformToClickElement = (panel, e) => {
    const clickRect = e.target.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();

    const scaleX = Math.min(0.5, clickRect.width / panelRect.width);
    const scaleY = Math.min(0.5, clickRect.height / panelRect.height);

    panel.style.transform = `translate3d(${
      -panelRect.left +
      clickRect.left +
      clickRect.width / 2 -
      panelRect.width / 2
    }px, ${
      -panelRect.top +
      clickRect.top +
      clickRect.height / 2 -
      panelRect.height / 2
    }px, 0) scale(${scaleX}, ${scaleY})`;
  };

  const openSaveDialog = ($event) => {
    if ($rootScope.getParam("onSaveButtonClick")) {
      return $rootScope.getParam("onSaveButtonClick")();
    }

    if ($rootScope.delayEditorStart) {
      return saver.saveImage();
    }

    // Implement logic here
  };

  return <div>{/* Implement the HTML for the component here */}</div>;
};

export default TopPanelController;
