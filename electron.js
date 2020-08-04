const {
  app, screen, BrowserWindow, ipcMain,
// eslint-disable-next-line import/no-extraneous-dependencies
} = require("electron");
const { join } = require("path");
const { format } = require("url");
const { getUsedCpuPercentage, getUsedMemPercentage } = require("./lib/getUsedResource");

let mainWindow;

function createWindow() {
  const { size } = screen.getPrimaryDisplay();
  const { width, height } = size;
  mainWindow = new BrowserWindow({
    show: false,
    width: width * 0.3,
    height,
    x: (process.platform === "darwin") ? width : width * 0.7,
    y: 0,
    transparent: true,
    frame: false,
    resizable: false,
    disableAutoHideCursor: true,
    // TODO: contextBridgeを使えばtrueにできる
    contextIsolation: false,
    webPreferences: {
      webviewTag: true,
      preload: `${__dirname}/preload.js`,
    },
  });

  const startUrl = process.env.ELECTRON_START_URL || format({
    pathname: join(__dirname, "./build/index.html"),
    protocol: "file:",
    slashes: true,
  });
  mainWindow.loadURL(startUrl);

  mainWindow.once("ready-to-show", async () => {
    await mainWindow.webContents.setZoomFactor(0.4);
    mainWindow.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// TODO: ipcMainを一つにまとめて文字列argで処理を分岐させる
ipcMain.on("usedCpuPercentage", (event) => {
  const usedCpuPercentage = getUsedCpuPercentage();
  event.reply("usedCpuPercentage-reply", usedCpuPercentage);
});

ipcMain.on("usedMemPercentage", (event) => {
  const usedMemPercentage = getUsedMemPercentage();
  event.reply("usedMemPercentage-reply", usedMemPercentage);
});
