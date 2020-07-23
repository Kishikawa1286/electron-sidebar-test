import React from "react";
// eslint-disable-next-line no-undef
const { ipcRenderer } = window.native;

class UsagePanel extends React.Component {
  constructor() {
    super();
    this.state = {
      usedCpuPercentage: 0,
      usedMemPercentage: 0,
    };
  }

  componentDidMount() {
    setInterval(() => {
      ipcRenderer.send("usedCpuPercentage");
      ipcRenderer.send("usedMemPercentage");
    }, 1000);

    ipcRenderer.on("usedCpuPercentage-reply", (event, usedCpuPercentage) => {
      this.setState({ usedCpuPercentage });
    });
    ipcRenderer.on("usedMemPercentage-reply", (event, usedMemPercentage) => {
      this.setState({ usedMemPercentage });
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeListener("usedCpuPercentage-reply", (event, usedCpuPercentage) => {
      this.setState({ usedCpuPercentage });
    });
    ipcRenderer.removeListener("usedMemPercentage-reply", (event, usedMemPercentage) => {
      this.setState({ usedMemPercentage });
    });
  }

  render() {
    const { usedCpuPercentage, usedMemPercentage } = this.state;
    const height = "72px";
    return (
      <div
        style={{
          display: "flex",
          height,
          background: "rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        <p
          style={{
            width: "49.5%",
            margin: 0,
            padding: 0,
            fontSize: "38px",
            lineHeight: height,
          }}
        >
          {`Cpu : ${usedCpuPercentage.toFixed(1)}% used`}
        </p>
        <p
          style={{
            width: "49.5%",
            margin: 0,
            padding: 0,
            fontSize: "38px",
            lineHeight: height,
          }}
        >
          {`Memory : ${usedMemPercentage.toFixed(1)}% used`}
        </p>
      </div>
    );
  }
}

export default UsagePanel;
