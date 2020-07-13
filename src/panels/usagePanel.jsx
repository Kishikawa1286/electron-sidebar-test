import React from "react";
import { getUsedCpuPercentage, getUsedMemPercentage } from "./getUsedResource";

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
      const usedCpuPercentage = getUsedCpuPercentage();
      const usedMemPercentage = getUsedMemPercentage();
      this.setState({ usedCpuPercentage, usedMemPercentage });
    }, 1000);
  }

  render() {
    const { usedCpuPercentage, usedMemPercentage } = this.state;
    return (
      <div
        style={{
          display: "flex",
          height: "72px",
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
          }}
        >
          {`Memory : ${usedMemPercentage.toFixed(1)}% used`}
        </p>
      </div>
    );
  }
}

export default UsagePanel;
