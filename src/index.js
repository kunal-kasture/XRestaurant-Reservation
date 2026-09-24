import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Swiper core styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
