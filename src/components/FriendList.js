import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function FriendList() {
  const { friends, addFriend, removeFriend } = useContext(ExpenseContext);
  const [friendName, setFriendName] = useState("");

  const handleAddFriend = () => {
    if (friendName.trim() !== "") {
      addFriend(friendName.trim());
      setFriendName("");
    }
  };

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>
            {friend}{" "}
            <button onClick={() => removeFriend(friend)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        placeholder="Enter friend's name"
      />
      <button onClick={handleAddFriend}>Add Friend</button>
    </div>
  );
}
