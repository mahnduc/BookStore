import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./hooks/context/authProvider";
import App from "./App";

import "./styles/global.css";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);