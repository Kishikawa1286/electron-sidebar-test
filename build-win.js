// eslint-disable-next-line import/no-extraneous-dependencies
const builder = require("electron-builder");

const { Platform } = builder;

builder.build({
  targets: Platform.WINDOWS.createTarget(),
  config: {
    appId: "com.tes.application",
    win: {
      target: "nsis",
    },
  },
});
