import React, { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [groups, setGroups] = useState([]);
  // Add a group
  const addGroup = (groupName, members) => {
    setGroups((prev) => [...prev, { name: groupName, members }]);
  };

  // Remove a group
  const removeGroup = (groupName) => {
    setGroups((prev) => prev.filter((g) => g.name !== groupName));
  };

  // Add a friend
  const addFriend = (friend) => {
    setFriends((prev) => [...prev, friend]);
  };

  // Remove a friend
  const removeFriend = (friend) => {
    setFriends((prev) => prev.filter((f) => f !== friend));
  };

  // Add a new expense
  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(), // ensure unique id
      date: new Date().toLocaleString(),
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  // Remove an expense by id
  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  // Update an expense by id
  const updateExpense = (id, updatedExpense) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              ...updatedExpense,
              date: new Date().toLocaleString(),
            }
          : expense
      )
    );
  };

  return (
    <ExpenseContext.Provider
      value={{
        friends,
        addFriend,
        removeFriend,
        expenses,
        addExpense,
        removeExpense,
        updateExpense,
        groups,
        addGroup,
        removeGroup,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
