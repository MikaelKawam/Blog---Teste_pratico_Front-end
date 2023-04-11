import React from "react";

const validTypes = ["png", "jpg", "jpeg", "gif"];

function EdFileUploader({ setter, edCloseAfter }) {
  const handleChange = (e) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const mime = event.target.result
        .split(",")[0]
        .split(":")[1]
        .split(";")[0]
        .split("/")[1];

      if (validTypes.indexOf(mime) < 0) {
        //
      }

      if (setter) {
        setter(event.target.result);

        if (typeof edCloseAfter !== "undefined") {
          // handle closing of dialog/bottom sheet
        }
      }
    };

    if (e.target.files[0].name.match(".json")) {
      reader.readAsText(e.target.files[0]);
    } else {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return <input type="file" onChange={handleChange} />;
}

export default EdFileUploader;
