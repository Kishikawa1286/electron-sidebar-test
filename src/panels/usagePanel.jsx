import React from "react";
import os from "os";
import { isEmpty } from "lodash";

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
      const cpus = os.cpus();
      const usedPercentageOfEachCpu = cpus.map((cpu) => {
        const {
          user, nice, sys, idle, irq,
        } = cpu.times;
        const used = user + nice + sys + irq;
        const total = used + idle;
        return used / total;
      });
      const usedCpuPercentage = !isEmpty(usedPercentageOfEachCpu.length)
        ? usedPercentageOfEachCpu.reduce((sumSoFar, current) => sumSoFar + current)
          / usedPercentageOfEachCpu.length
        : 0;
      const freeMem = os.freemem();
      const totalMem = os.totalmem();
      const usedMemPercentage = freeMem / totalMem;
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
