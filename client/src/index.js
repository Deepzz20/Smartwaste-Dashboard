
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from "App";

// SmartWaste Dashboard React Context Provider
import { UIControllerProvider } from "context";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
  <BrowserRouter>
    <UIControllerProvider>
      <App />
    </UIControllerProvider>
  </BrowserRouter>
)

