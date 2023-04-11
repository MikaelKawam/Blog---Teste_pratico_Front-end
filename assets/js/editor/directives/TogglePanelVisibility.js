import React, { useState } from "react";

function TogglePanelVisibility({ id }) {
  const [isToggled, setIsToggled] = useState(false);

  const handleClick = () => {
    setIsToggled(!isToggled);
    const panel = document.getElementById(id);
    if (panel) {
      const ul = panel.querySelector("ul");
      if (ul) {
        ul.style.display = isToggled ? "none" : "block";
      }
    }
  };

  return (
    <div onClick={handleClick}>
      <span className={isToggled ? "icon toggled" : "icon"}></span>
    </div>
  );
}
