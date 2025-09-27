import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // Check for duplicate email or username
    if (users.some(u => u.email === email)) {
      setError("Email already registered");
      return;
    }
    if (users.some(u => u.username === username)) {
      setError("Username already taken");
      return;
    }
    // Save new user
    const newUser = { username, email, password, phone };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    // Generate dummy JWT
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        exp: Math.floor(Date.now() / 1000) + 3600,
        name: username,
        email,
      })
    );
    const fakeJWT = `${header}.${payload}.signature`;
    login(newUser, fakeJWT);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-green-600">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {error && <div className="text-red-500 text-center">{error}</div>}
        <button
          onClick={handleRegister}
          className="w-full py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition font-semibold"
        >
          Register
        </button>
      </div>
    </div>
  );
}
