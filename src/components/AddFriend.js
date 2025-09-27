import React, { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const AddFriend = () => {
  const [name, setName] = useState("");
  const { addFriend } = useContext(ExpenseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    addFriend(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input 
        type="text"
        placeholder="Enter friend's name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Add Friend
      </button>
    </form>
  );
};

export default AddFriend;
