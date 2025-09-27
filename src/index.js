import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ExpenseProvider } from "./context/ExpenseContext";
import "./index.css"; // ✅ import your CSS here

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ExpenseProvider>
        <App />
      </ExpenseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
