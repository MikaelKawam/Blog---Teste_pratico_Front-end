import React, { useRef, useEffect } from "react";
import $ from "jquery";
import "malihu-custom-scrollbar-plugin";

const EdPrettyScrollbar = ({
  edScrollTheme = "inset",
  edScrollAxis = "x",
  children,
}) => {
  const elRef = useRef(null);

  useEffect(() => {
    $(elRef.current).mCustomScrollbar({
      theme: edScrollTheme,
      scrollInertia: 300,
      autoExpandScrollbar: false,
      axis: edScrollAxis,
      advanced: { autoExpandHorizontalScroll: true },
    });
  }, [edScrollTheme, edScrollAxis]);

  return <div ref={elRef}>{children}</div>;
};

const EdIeSliderFix = () => {
  const elRef = useRef(null);

  useEffect(() => {
    $(elRef.current).find(".slider-fix-inner").mCustomScrollbar();
  }, []);

  return (
    <div
      className="slider-fix-outter"
      style={{ height: "2px", position: "absolute" }}
    >
      <div
        className="slider-fix-inner"
        style={{ height: "1px", overflow: "auto" }}
        ref={elRef}
      >
        IE FIX
      </div>
    </div>
  );
};

export { EdPrettyScrollbar, EdIeSliderFix };
