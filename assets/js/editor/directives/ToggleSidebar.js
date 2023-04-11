import React from "react";

class ToggleSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: false,
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState((prevState) => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleSidebar}>Toggle Sidebar</button>
        <div className={this.state.isSidebarOpen ? "open" : ""}>
          {/* Conteúdo da barra lateral */}
        </div>
      </div>
    );
  }
}
