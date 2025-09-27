import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
// import Navbar from "../components/Navbar";

export default function Summary() {
  const { expenses } = useContext(ExpenseContext);

  const balances = {};

  // Initialize balances based on all participants in all expenses
  expenses.forEach(exp => {
    exp.splitBetween.forEach(p => {
      if (!(p in balances)) balances[p] = 0;
    });
    if (!(exp.paidBy in balances)) balances[exp.paidBy] = 0;
  });

  // Calculate balances
  expenses.forEach(({ amount, paidBy, splitBetween }) => {
    const share = amount / splitBetween.length; // divide only among participants
    balances[paidBy] += amount - (splitBetween.includes(paidBy) ? share : 0);
    splitBetween.forEach(p => {
      if (p !== paidBy) balances[p] -= share;
    });
  });

  // Separate creditors and debtors
  const debtors = [], creditors = [];
  Object.entries(balances).forEach(([person, bal]) => {
    if (bal < 0) debtors.push({ person, amount: Math.abs(bal) });
    else if (bal > 0) creditors.push({ person, amount: bal });
  });

  // Generate transactions
  const transactions = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const settledAmount = Math.min(debtors[i].amount, creditors[j].amount);
    transactions.push(`${debtors[i].person} pays ${creditors[j].person} ₹${settledAmount.toFixed(2)}`);
    debtors[i].amount -= settledAmount;
    creditors[j].amount -= settledAmount;
    if (debtors[i].amount === 0) i++;
    if (creditors[j].amount === 0) j++;
  }

  return (
  <div className="min-h-screen flex flex-col bg-gray-50 px-2 sm:px-0">
      {/* <Navbar current="Summary" /> */}
  <div className="p-2 sm:p-6 flex flex-col items-center gap-3 sm:gap-4 mt-4 sm:mt-6 w-full max-w-md sm:max-w-2xl">
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-purple-600">📊 Summary</h1>
        {transactions.length === 0 ? (
          <p className="text-gray-500">All settled up 🎉</p>
        ) : (
          <ul className="w-full space-y-2">
            {transactions.map((t, i) => (
              <li key={i} className="border p-2 rounded bg-white shadow">{t}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
