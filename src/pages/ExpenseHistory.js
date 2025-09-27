import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ExpenseHistory() {
  const { expenses, removeExpense, updateExpense } = useContext(ExpenseContext);
  const [selectedExpense, setSelectedExpense] = useState(null);
  //eslint-disable-next-line 
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  //eslint-disable-next-line 
  const handleEditChange = (e) => setEditedData({ ...editedData, [e.target.name]: e.target.value });
  //eslint-disable-next-line 
  const handleSaveEdit = () => {
    const index = expenses.indexOf(selectedExpense);
    updateExpense(index, {
      description: editedData.description || selectedExpense.description,
      amount: parseFloat(editedData.amount) || selectedExpense.amount,
      paidBy: editedData.paidBy || selectedExpense.paidBy,
    });
    setEditMode(false);
    setSelectedExpense(null);
  };
  //eslint-disable-next-line 
  const handleDelete = () => {
    const index = expenses.indexOf(selectedExpense);
    removeExpense(index);
    setSelectedExpense(null);
  };

  return (
  <div className="min-h-screen flex flex-col bg-gray-50 px-2 sm:px-0">
      {/* <Navbar current="Expense History" /> */}

  <div className="p-2 sm:p-6 flex flex-col items-center gap-3 sm:gap-4 mt-4 sm:mt-6 w-full max-w-xl sm:max-w-3xl">
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-yellow-600">📜 Expense History</h1>

        {expenses.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <ul className="w-full space-y-3 overflow-y-auto max-h-96">
            {expenses.map((expense, index) => (
              <li key={index} className="flex flex-col sm:flex-row justify-between p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => { setSelectedExpense(expense); setEditedData(expense); }}>
                <div>
                  <p className="font-semibold">{expense.description}</p>
                  <p className="text-gray-700">Amount: ₹{expense.amount.toFixed(2)} | Paid By: <span className="font-medium">{expense.paidBy}</span></p>
                  <p className="text-gray-600 text-sm">Participants: {expense.participants.join(", ")}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
