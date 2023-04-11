import React, { useState } from "react";

function Tabs(props) {
  const [activeTab, setActiveTab] = useState(props.defaultTab);

  const changeTab = (tabName) => {
    if (activeTab !== tabName) {
      setActiveTab(tabName);
      props.onTabChange(tabName, activeTab);
    }
  };

  return (
    <div className="tabs">
      <div className="tab-navigation">
        {props.tabNames.map((tabName) => (
          <button
            key={tabName}
            className={activeTab === tabName ? "active" : ""}
            onClick={() => changeTab(tabName)}
          >
            {tabName}
          </button>
        ))}
      </div>
      {props.tabContent.map((content, index) => (
        <div
          key={props.tabNames[index]}
          className={`tab ${activeTab === props.tabNames[index] ? "open" : ""}`}
        >
          {content}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
