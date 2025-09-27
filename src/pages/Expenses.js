import React, { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
// import Navbar from "../components/Navbar"; // ✅ correct import

export default function Expenses() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <Navbar current="Expenses" /> */}

      <div className="p-6 flex flex-col items-center gap-4 mt-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-blue-600">💵 Expenses</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          {showForm ? "Close Form" : "Add Expense"}
        </button>

        {showForm && <ExpenseForm onClose={() => setShowForm(false)} />}
        <ExpenseList />
      </div>
    </div>
  );
}
