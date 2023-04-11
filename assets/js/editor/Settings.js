import { useState, useEffect } from "react";

function Settings() {
  const [allSettings, setAllSettings] = useState({});

  useEffect(() => {
    fetch("config.json")
      .then((response) => response.json())
      .then((data) => setAllSettings(data));
  }, []);

  const getSetting = (name) => {
    return allSettings[name];
  };

  return {
    all: allSettings,
    get: getSetting,
  };
}

export default Settings;
