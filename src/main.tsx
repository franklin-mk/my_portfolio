//import React from 'react'
//import ReactDOM from 'react-dom/client'
import ReactGA from 'react-ga4'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Initialize Google Analytics 4 (Replace G-XXXXXXXXXX with your actual Measurement ID)
ReactGA.initialize("G-WC3V7KBV9T");
// Send initial pageview hit
ReactGA.send({ hitType: "pageview", page: window.location.pathname });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
