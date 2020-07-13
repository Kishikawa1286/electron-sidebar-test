const { app, screen, BrowserWindow } = require("electron");
const { join } = require("path");
const { format } = require("url");
const { platform } = require("os");

let mainWindow;

function createWindow() {
  const { size } = screen.getPrimaryDisplay();
  const { width, height } = size;
  mainWindow = new BrowserWindow({
    width: width * 0.3,
    height,
    x: (platform() === "darwin") ? width : width * 0.7,
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

  const startUrl = process.env.ELECTRON_START_URL || format({
    pathname: join(__dirname, "./build/index.html"),
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
