import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const BalanceSummary = () => {
  const { balances } = useContext(ExpenseContext);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">💰 Balances</h2>
      {Object.keys(balances).length === 0 ? (
        <p>No friends added yet.</p>
      ) : (
        <ul>
          {Object.entries(balances).map(([name, balance]) => (
            <li key={name}>
              {name}: {balance >= 0 ? `is owed ₹${balance.toFixed(2)}` : `owes ₹${(-balance).toFixed(2)}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BalanceSummary;
