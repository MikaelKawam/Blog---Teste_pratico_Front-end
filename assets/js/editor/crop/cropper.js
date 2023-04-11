import React from "react";
import Cropzone from "./Cropzone";
import Canvas from "./Canvas";
import History from "./History";
import Fabric from "fabric";

class Cropper extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = new Canvas();
    this.cropzone = new Cropzone();
    this.history = new History();
  }

  start(e) {
    if (this.cropzone.initiated) return;

    this.cropzone.add();
    this.props.openPanel("crop", e);
  }

  stop(e) {
    this.cropzone.remove();
    this.props.activePanel = false;
  }

  crop() {
    if (!this.cropzone.initiated) return false;

    this.cropzone.hide();
    const image = new Image();

    image.onload = () => {
      const fabricImage = new Fabric.Image(image, this.canvas.imageStatic);
      fabricImage.name = "mainImage";

      this.canvas.mainImage && this.canvas.mainImage.remove();
      this.canvas.fabric.clear();
      this.canvas.fabric.setWidth(Math.ceil(this.cropzone.rect.getWidth()));
      this.canvas.fabric.setHeight(Math.ceil(this.cropzone.rect.getHeight()));

      this.canvas.fabric.add(fabricImage);
      fabricImage.moveTo(0);
      fabricImage.center();
      this.canvas.mainImage = fabricImage;
      this.cropzone.remove();

      this.history.add("crop", "crop");

      this.props.editorCustomActions.crop = {
        left: this.cropzone.rect.getLeft(),
        top: this.cropzone.rect.getTop(),
        width: Math.ceil(this.cropzone.rect.getWidth()),
        height: Math.ceil(this.cropzone.rect.getHeight()),
      };

      this.canvas.original.width = Math.ceil(this.cropzone.rect.getWidth());
      this.canvas.original.height = Math.ceil(this.cropzone.rect.getHeight());
    };

    this.canvas.zoom(1);

    image.src = this.canvas.fabric.toDataURL({
      left: this.cropzone.rect.getLeft(),
      top: this.cropzone.rect.getTop(),
      width: Math.ceil(this.cropzone.rect.getWidth()),
      height: Math.ceil(this.cropzone.rect.getHeight()),
    });

    return <div>{/* Your ReactJS component goes here */}</div>;
  }
}

export default Cropper;
