import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./style.css";

const myFirstElement = <App />;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(myFirstElement);
