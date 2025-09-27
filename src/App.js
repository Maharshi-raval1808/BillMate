import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Friends from "./pages/Friends.js";
import Expenses from "./pages/Expenses.js";
import ExpenseHistory from "./pages/ExpenseHistory.js";
import Summary from "./pages/Summary.js";
import Balances from "./pages/Balances.js";
import Navbar from "./components/Navbar.js";
import { ExpenseProvider } from "./context/ExpenseContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginLogout = () => setIsLoggedIn((prev) => !prev);

  return (
    <ExpenseProvider>
      {/* Navbar always visible */}
      <Navbar
        isLoggedIn={isLoggedIn}
        handleLoginLogout={handleLoginLogout}
      />

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expense-history" element={<ExpenseHistory />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/balances" element={<Balances />} />
      </Routes>
    </ExpenseProvider>
  );
}

export default App;
