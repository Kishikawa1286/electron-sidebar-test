import React from "react";
import style from "./usagePanel.module.css";
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
    return (
      <div className={style.usage_container}>
        <p className={style.usage_content}>
          {`Cpu : ${usedCpuPercentage.toFixed(1)}% used`}
        </p>
        <p className={style.usage_content}>
          {`Memory : ${usedMemPercentage.toFixed(1)}% used`}
        </p>
      </div>
    );
  }
}

export default UsagePanel;
