import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CalendarApp from "./CalendarApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  /*  <React.StrictMode> */
    <BrowserRouter>
      <CalendarApp />
    </BrowserRouter>
  /* </React.StrictMode> */
);
