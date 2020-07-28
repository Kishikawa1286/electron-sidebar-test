// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require("electron");

process.once("loaded", global.native = { ipcRenderer });
