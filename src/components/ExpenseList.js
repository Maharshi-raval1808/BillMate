import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseList() {
  const { expenses, removeExpense } = useContext(ExpenseContext);
  const [editing, setEditing] = useState(null);

  return (
    <div>
      {editing && <ExpenseForm editExpense={editing} onClose={() => setEditing(null)} />}

      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses yet</p>
      ) : (
        <ul className="space-y-3">
          {expenses.map((exp) => (
            <li
              key={exp.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg bg-white shadow"
            >
              <div className="mb-2 sm:mb-0">
                <p className="font-semibold">{exp.description}</p>
                <p className="text-gray-700">
                  Amount: ₹{exp.amount}
                </p>
                <p className="text-gray-700">
                  Paid By: <span className="font-medium">{exp.paidBy}</span>
                </p>
                <p className="text-gray-600">
                  Split Between: {exp.splitBetween.join(", ")}
                </p>
              </div>

              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => setEditing(exp)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeExpense(exp.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
