const { app, BrowserWindow, screen } = require("electron");

const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: width * 0.3,
    height,
    x: width * 0.7,
    y: 0,
    transparent: true,
    frame: false,
    resizable: false,
    disableAutoHideCursor: true,
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, "/../build/index.html"),
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
