import { useEffect } from "react";
import { fabric } from "fabric";

function EditorController({
  folders,
  canvas,
  saver,
  photos,
  utils,
  selectedItem,
}) {
  const active = {};

  function saveImage() {
    this.setState({ ajaxInProgress: true });

    const payload = getDesignPayload(active);

    let promise;
    if (payload.id) {
      promise = selectedItem.update(payload);
    } else {
      promise = photos.save(payload);
    }

    promise
      .then((data) => {
        utils.showToast("savedPhotoSuccessfully", true);
        active = data;
      })
      .finally(() => {
        this.setState({ ajaxInProgress: false });
      });

    this.props.emit("activity.happened", "edited", "photo", [payload]);
  }

  function getDesignPayload(photo) {
    canvas.fabric.deactivateAll().renderAll();

    const fabricData = canvas.fabric.toDatalessJSON(["selectable", "name"]);
    fabricData.customActions = Object.assign(
      {},
      this.props.editorCustomActions
    );

    const extension =
      fabricData.customActions && fabricData.customActions.roundCorners
        ? "png"
        : photo.extension;
    const imageData = canvas.fabric.toDataURL({
      format: extension || "png",
      quality: 1,
    });
    const dimensions = canvas.original;

    for (let i = 0; i < fabricData.objects.length; i++) {
      const obj = fabricData.objects[i];

      if (obj.name === "mainImage") {
        obj.src = active.originalUrl;
        break;
      }
    }

    if (!typeof fabricData === "string") {
      fabricData = JSON.stringify(fabricData);
    }

    return {
      id: photo.id,
      name: photo.name || this.props.userPreset.name,
      folder_id: photo.folder_id || folders.selected.id,
      serialized_editor_state: fabricData,
      imageData: imageData,
      width: dimensions.width,
      height: dimensions.height,
      extension: extension,
    };
  }

  useEffect(() => {
    const unbind = this.props.on("canvas.init", () => {
      if (this.props.match.params.id) {
        const url = `${this.props.baseUrl}photos/${this.props.match.params.id}`;
        fetch(url)
          .then((res) => res.json())
          .then((photo) => {
            active = photo;
            selectedItem.set(photo);

            if (photo.serialized_editor_state) {
              canvas.loadFromJSON(photo, loadCustomActions);
            } else {
              canvas.loadMainImage(photo.originalUrl);
            }

            this.props.setStarted(true);
          });
      } else {
        canvas.openNew(
          this.props.userPreset.width,
          this.props.userPreset.height,
          this.props.userPreset.name
        );
        this.props.setStarted(true);
      }
    });

    return () => {
      canvas.destroy();
      this.props.setStarted(false);
      unbind();
    };
  }, []);

  function loadCustomActions(photo) {
    const state = JSON.parse(photo.serialized_editor_state);

    if (state.customActions && !Object.keys(state.customActions).length === 0) {
      canvas.fabric.clear();
      canvas.zoom(1);
      canvas.loadMainImage(photo.absoluteUrl);
    }
  }

  return null;
}
