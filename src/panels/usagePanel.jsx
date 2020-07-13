import React from "react";
import os from "os";

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
      /* update state here */
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
          {`Cpu : ${usedCpuPercentage}% used`}
        </p>
        <p
          style={{
            width: "49.5%",
            margin: 0,
            padding: 0,
            fontSize: "38px",
          }}
        >
          {`Memory : ${usedMemPercentage}% used`}
        </p>
      </div>
    );
  }
}

export default UsagePanel;
