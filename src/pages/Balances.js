import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function Balances() {
  const { friends, expenses } = useContext(ExpenseContext);
  // Build participant list from friends and all expense participants
  const participantsSet = new Set(["You", ...friends]);
  expenses.forEach(exp => {
    exp.splitBetween.forEach(p => participantsSet.add(p));
    participantsSet.add(exp.paidBy);
  });
  const participants = Array.from(participantsSet);

  // Calculate balances
  const balances = {};
  participants.forEach(p => (balances[p] = 0));
  expenses.forEach(({ amount, paidBy, splitBetween }) => {
    const share = amount / splitBetween.length;
    splitBetween.forEach(person => {
      if (person === paidBy) balances[person] += amount - share;
      else balances[person] -= share;
    });
  });

  // Separate creditors and debtors
  const debtors = [], creditors = [];
  Object.entries(balances).forEach(([person, balance]) => {
    if (balance < 0) debtors.push({ person, amount: Math.abs(balance) });
    else if (balance > 0) creditors.push({ person, amount: balance });
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
      <div className="p-2 sm:p-6 flex flex-col items-center gap-3 sm:gap-4 mt-4 sm:mt-6 w-full max-w-md sm:max-w-2xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-indigo-600">💰 Balances</h1>
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
