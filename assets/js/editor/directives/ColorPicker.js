import React, { useEffect, useRef } from "react";
import "spectrum-colorpicker";
import "spectrum-colorpicker/spectrum.css";

const EdColorPicker = ({
  startColor,
  edColorPicker,
  edFlat,
  edDiscrete,
  ngDisabled,
}) => {
  const el = useRef(null);

  useEffect(() => {
    const flat = !!edFlat;
    const params = {
      color: startColor,
      clickoutFiresChange: true,
      showPalette: !flat,
      palette: colorsForPicker,
      preferredFormat: "hex",
      showAlpha: true,
      showInput: true,
      flat: flat,
      showButtons: !flat,
      change: (selectedColor) => {
        setter(selectedColor);
      },
    };

    if (edDiscrete !== undefined) {
      params.move = null;
    }

    const picker = el.current;
    const setter = (selectedColor) => {
      edColorPicker({ color: selectedColor.toString() });
      picker.value = selectedColor.toString();
    };

    $(picker).spectrum(params);

    return () => {
      $(picker).spectrum("destroy");
    };
  }, [startColor, edColorPicker, edFlat, edDiscrete]);

  useEffect(() => {
    const picker = el.current;
    $(picker).spectrum(ngDisabled ? "disable" : "enable");
  }, [ngDisabled]);

  return <input type="text" ref={el} />;
};

export default EdColorPicker;
