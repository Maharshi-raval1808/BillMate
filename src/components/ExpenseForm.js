import React, { useState, useContext, useEffect } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const ExpenseForm = ({ editExpense, onClose }) => {
  const { addExpense, updateExpense, friends, groups, addGroup } = useContext(ExpenseContext);

  // Group creation state
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("You");
  const [splitBetween, setSplitBetween] = useState([]);

  useEffect(() => {
  if (editExpense) {
    setDescription(editExpense.description);
    setAmount(editExpense.amount);
    setPaidBy(editExpense.paidBy);
    setSplitBetween(editExpense.splitBetween.filter(p => ["You", ...friends].includes(p)));
  }
}, [editExpense, friends]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || splitBetween.length === 0) return;

    const newExpense = {
      id: editExpense ? editExpense.id : Date.now(),
      description,
      amount,
      paidBy,
      splitBetween,
    };
    if (editExpense) {
      updateExpense(newExpense);
    } else {
      addExpense(newExpense);
    }
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg bg-white shadow mb-4 space-y-3 w-full max-w-lg mx-auto"
    >
      <h2 className="text-xl sm:text-2xl font-semibold">
        {editExpense ? "Edit Expense" : "Add Expense"}
      </h2>

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />

            {/* Create Group Section */}
            <div className="mb-4">
              <button
                type="button"
                className="px-3 py-1 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 font-semibold mb-2"
                onClick={() => setShowGroupForm((v) => !v)}
              >
                {showGroupForm ? "Cancel Group" : "Create Group"}
              </button>
              {showGroupForm && (
                <div className="border rounded-lg p-3 bg-blue-50 mt-2">
                  <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={e => setGroupName(e.target.value)}
                    className="w-full p-2 border rounded-lg mb-2"
                  />
                  <div className="flex flex-wrap gap-2 mb-2 ">
                    {["You", ...friends].map((p) => (
                      <label key={p} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={groupMembers.includes(p)}
                          onChange={e => {
                            if (e.target.checked)
                              setGroupMembers([...groupMembers, p]);
                            else
                              setGroupMembers(groupMembers.filter(x => x !== p));
                          }}
                        />
                        {p}
                      </label>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="px-3 py-1 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 font-semibold"
                    onClick={() => {
                      if (groupName && groupMembers.length > 0) {
                        addGroup(groupName, groupMembers);
                        setGroupName("");
                        setGroupMembers([]);
                        setShowGroupForm(false);
                      }
                    }}
                  >
                    Save Group
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <label className="font-medium block mb-1">Paid By</label>
                <select
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="You">You</option>
                  {friends.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="font-medium block mb-1">Split Between</label>
                {/* Group selection dropdown */}
                {groups.length > 0 && (
                  <select
                    className="w-full p-2 border rounded-lg mb-2"
                    onChange={e => {
                      const group = groups.find(g => g.name === e.target.value);
                      if (group) setSplitBetween(group.members);
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>Select group (optional)</option>
                    {groups.map(g => (
                      <option key={g.name} value={g.name}>{g.name}</option>
                    ))}
                  </select>
                )}
                <div className="flex flex-wrap gap-2">
                  {["You", ...friends].map((p) => (
                    <label key={p} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={splitBetween.includes(p)}
                        onChange={(e) => {
                          if (e.target.checked)
                            setSplitBetween([...splitBetween, p]);
                          else
                            setSplitBetween(splitBetween.filter((x) => x !== p));
                        }}
                      />
                      {p}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                {editExpense ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
    </form>
  );

}
export default ExpenseForm;
