import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import service worker
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// register service worker
serviceWorkerRegistration.register();

// get service worker for dev mode
import serviceWorker from "./swDev";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
// run the new service worker
// serviceWorker();
