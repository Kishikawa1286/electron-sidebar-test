import React from "react";
import ReactDOM from "react-dom";
import Sidebar from "./Sidebar";

ReactDOM.render(
  <React.StrictMode>
    <Sidebar />
  </React.StrictMode>,
  /* XSSの危険あり */
  // eslint-disable-next-line no-undef
  document.getElementById("root"),
);
