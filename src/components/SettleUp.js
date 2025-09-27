import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const SettleUp = () => {
  const { friends, settleUp } = useContext(ExpenseContext);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Settle Up</h2>
      {friends.map(f => (
        <button
          key={f.id}
          onClick={() => settleUp(f.name)}
          className="mr-2 mb-2 bg-green-500 text-white px-3 py-1 rounded"
        >
          Settle {f.name}
        </button>
      ))}
    </div>
  );
};

export default SettleUp;
