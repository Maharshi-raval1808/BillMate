import React, { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";


export default function Friends() {
  const { friends, addFriend, removeFriend } = useContext(ExpenseContext);
  const [name, setName] = useState("");

  const handleAddFriend = () => {
    if (name && !friends.includes(name) && name !== "You") {
      addFriend(name);
      setName("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddFriend();
  };

  return (
  <div className="min-h-screen flex flex-col bg-gray-50 px-2 sm:px-0">
      {/* Navbar */}
      {/* <Navbar current="Friends" /> */}

      {/* Page Content */}
  <div className="flex flex-col items-center justify-start p-2 sm:p-6 mt-4 sm:mt-6 w-full">
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-green-600 text-center">👥 Friends</h1>

        {/* Add Friend Card */}
  <div className="w-full max-w-sm sm:max-w-lg bg-white p-3 sm:p-5 rounded-xl shadow-lg flex flex-col gap-3 sm:gap-4">
          <h2 className="text-lg font-semibold text-center mb-2">Add a Friend</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Friend Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleAddFriend}
              className="px-5 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Friends List */}
  <div className="w-full max-w-xs sm:max-w-md mt-4 sm:mt-6">
          {friends.length === 0 ? (
            <p className="text-gray-500 text-center mt-6">No friends added yet.</p>
          ) : (
            <ul className="space-y-3 max-h-72 sm:max-h-80 overflow-y-auto pr-2">
              {friends.map((f, i) => (
                <li
                  key={i}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition"
                >
                  <span className="text-lg font-medium mb-2 sm:mb-0">{f}</span>
                  <button
                    onClick={() => removeFriend(f)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
