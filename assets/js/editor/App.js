import { useState, useEffect } from "react";

function EditorController({
  folders,
  canvas,
  saver,
  photos,
  utils,
  selectedItem,
}) {
  const [active, setActive] = useState({});

  const saveImage = () => {
    const payload = getDesignPayload(active);
    setAjaxInProgress(true);

    let promise;
    if (payload.id) {
      promise = selectedItem.update(payload);
    } else {
      promise = photos.save(payload);
    }

    promise
      .then((data) => {
        utils.showToast("savedPhotoSuccessfully", true);
        setActive(data);
      })
      .finally(() => {
        setAjaxInProgress(false);
      });

    emitActivity("edited", "photo", [payload]);
  };

  const getDesignPayload = (photo) => {
    canvas.fabric.deactivateAll().renderAll();

    const fabricData = canvas.fabric.toDatalessJSON(["selectable", "name"]);
    fabricData.customActions = [...$rootScope.editorCustomActions];

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

    if (!Array.isArray(fabricData)) {
      fabricData = JSON.stringify(fabricData);
    }

    return {
      id: photo.id,
      name: photo.name || $rootScope.userPreset.name,
      folder_id: photo.folder_id || folders.selected.id,
      serialized_editor_state: fabricData,
      imageData: imageData,
      width: dimensions.width,
      height: dimensions.height,
      extension: extension,
    };
  };

  useEffect(() => {
    const unbind = $rootScope.$on("canvas.init", () => {
      if ($state.params.id) {
        $http
          .get($rootScope.baseUrl + "photos/" + $state.params.id)
          .then((photo) => {
            setActive(photo);
            selectedItem.set(photo);

            if (photo.serialized_editor_state) {
              canvas.loadFromJSON(photo, loadCustomActions);
            } else {
              canvas.loadMainImage(photo.originalUrl);
            }

            setStarted(true);
          });
      } else {
        canvas.openNew(
          $rootScope.userPreset.width,
          $rootScope.userPreset.height,
          $rootScope.userPreset.name
        );
        setStarted(true);
      }
    });

    return () => {
      canvas.destroy();
      setStarted(false);
      unbind();
    };
  }, []);

  const loadCustomActions = (photo) => {
    const state = JSON.parse(photo.serialized_editor_state);

    if (state.customActions && !Object.keys(state.customActions).length) {
      canvas.fabric.clear();
      canvas.zoom(1);
      canvas.loadMainImage(photo.absoluteUrl);
    }
  };

  return (
    <div>
      <p>Editor Controller</p>
      {/* pagination */}
      <div className="pagination" onClick={(e) => e.preventDefault()}>
        ...
      </div>
    </div>
  );
}

export default EditorController;
