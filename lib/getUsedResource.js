const { cpus, freemem, totalmem } = require("os");
const { isEmpty, sum } = require("lodash");

const getUsedCpuPercentage = () => {
  const cpusData = cpus();
  const usedPercentageOfEachCpu = cpusData.map((cpu) => {
    const {
      user, nice, sys, idle, irq,
    } = cpu.times;
    const used = user + nice + sys + irq;
    const total = used + idle;
    return (used / total) * 100;
  });
  const usedCpuPercentage = !isEmpty(usedPercentageOfEachCpu)
    ? sum(usedPercentageOfEachCpu) / usedPercentageOfEachCpu.length
    : 0;
  return usedCpuPercentage;
};

const getUsedMemPercentage = () => {
  const free = freemem();
  const total = totalmem();
  const usedMemPercentage = (free / total) * 100;
  return usedMemPercentage;
};

exports.getUsedCpuPercentage = getUsedCpuPercentage;
exports.getUsedMemPercentage = getUsedMemPercentage;
