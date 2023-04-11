import { useEffect, useRef } from "react";
import $ from "jquery";
import "jquery-ui/ui/widgets/slider";

function EdSlider({ value, onChange, min, max, step, disabled, discrete }) {
  const sliderRef = useRef();

  useEffect(() => {
    const sliderElem = $(sliderRef.current);
    sliderElem.slider({
      range: "min",
      create: bindAttributes,
      ...(discrete ? { stop: updateModel } : { slide: updateModel }),
    });

    function updateModel(_, ui) {
      onChange(ui.value);
    }

    function bindAttributes() {
      if (min) {
        sliderElem.slider("option", "min", parseFloat(min));
      }
      if (max) {
        sliderElem.slider("option", "max", parseFloat(max));
      }
      if (step) {
        sliderElem.slider("option", "step", parseFloat(step));
      }
    }

    return () => {
      sliderElem.slider("destroy");
    };
  }, [value, min, max, step, onChange, disabled, discrete]);

  useEffect(() => {
    if (sliderRef.current) {
      const sliderElem = $(sliderRef.current);
      if (disabled) {
        sliderElem.slider("disable");
      } else {
        sliderElem.slider("enable");
      }
    }
  }, [disabled]);

  useEffect(() => {
    if (sliderRef.current) {
      const sliderElem = $(sliderRef.current);
      if (
        value !== undefined &&
        value !== null &&
        value >= min &&
        value <= max
      ) {
        sliderElem.slider("value", value);
      }
    }
  }, [value, min, max]);

  return (
    <div className="ed-range-slider">
      <div className="ed-slider-inner">
        <div className="slider-extender"></div>
        <div className="focus-handle"></div>
      </div>
      <input type="hidden" ref={sliderRef} />
    </div>
  );
}
