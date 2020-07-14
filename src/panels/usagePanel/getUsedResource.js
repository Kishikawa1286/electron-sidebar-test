import os from "os";
import { isEmpty, sum } from "lodash";

export const getUsedCpuPercentage = () => {
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

export const getUsedMemPercentage = () => {
  const freeMem = os.freemem();
  const totalMem = os.totalmem();
  const usedMemPercentage = (freeMem / totalMem) * 100;
  return usedMemPercentage;
};
