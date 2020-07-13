const { app, BrowserWindow } = require("electron");
const { screen } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  const { size } = screen.getPrimaryDisplay();
  const { width, height } = size;
  // 組み込みモジュールscreenが動いていない.自分のMacの画面のサイズを基に値を入れている.
  mainWindow = new BrowserWindow({
    width: width * 0.3,
    height,
    x: width,
    y: 0,
    transparent: true,
    frame: false,
    resizable: false,
    disableAutoHideCursor: true,
    webPreferences: {
      webviewTag: true,
      zoomFactor: 1.0,
    },
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, "./build/index.html"),
    protocol: "file:",
    slashes: true,
  });
  mainWindow.loadURL(startUrl);

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
