import React, { useEffect, useState } from "react";
import canvas from "./canvas";
import folders from "./folders";
import photos from "./photos";
import utils from "./utils";

function EditorUploadsController() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    photos.getAll().then((data) => {
      setPhotos(data);
    });
  }, []);

  function openImage(photo) {
    canvas.openImage(photo.absoluteUrl);
  }

  useEffect(() => {
    const listener = $rootScope.$on("photos.uploaded", (e, data) => {
      if (data.uploaded && data.uploaded.length) {
        setPhotos([data.uploaded[0], ...photos]);
        openImage(data.uploaded[0]);
      }
    });

    return () => {
      listener();
    };
  }, [photos]);

  return (
    <div>
      {photos.map((photo) => (
        <div key={photo.id} onClick={() => openImage(photo)}>
          <img src={photo.absoluteUrl} alt={photo.name} />
        </div>
      ))}
    </div>
  );
}
