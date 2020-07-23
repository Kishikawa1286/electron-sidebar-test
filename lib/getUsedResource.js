const os = require("os");
const { isEmpty, sum } = require("lodash");

const getUsedCpuPercentage = () => {
  const cpus = os.cpus();
  const usedPercentageOfEachCpu = cpus.map((cpu) => {
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
  const freeMem = os.freemem();
  const totalMem = os.totalmem();
  const usedMemPercentage = (freeMem / totalMem) * 100;
  return usedMemPercentage;
};

exports.getUsedCpuPercentage = getUsedCpuPercentage;
exports.getUsedMemPercentage = getUsedMemPercentage;
