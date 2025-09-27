import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ExpenseProvider } from "./context/ExpenseContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Expenses from "./pages/Expenses";
import ExpenseHistory from "./pages/ExpenseHistory";
import Summary from "./pages/Summary";
import Balances from "./pages/Balances";

function App() {
  // Logout confirmation modal state
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Handler for logout with modal
  const handleLogoutWithModal = () => {
    setShowLogoutModal(true);
  };

  // Confirm logout
  const confirmLogout = () => {
    setShowLogoutModal(false);
    handleLogout();
  };

  // Cancel logout
  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  // --- Global Authentication State ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [regPasswordVisible, setRegPasswordVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  // Login modal state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  // Register modal state
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regError, setRegError] = useState("");

  // Simple JWT decode and expiry check
  function isTokenValid(token) {
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload.exp) return false;
      // exp is in seconds since epoch
      return payload.exp * 1000 > Date.now();
    } catch (e) {
      return false;
    }
  }

  // On mount, check for JWT token
  React.useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setIsLoggedIn(isTokenValid(token));
  }, []);

  // Dummy JWT token generator (exp 1 hour from now)
  function generateDummyJWT(user) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        exp: Math.floor(Date.now() / 1000) + 3600,
        name: user?.username || 'Demo User',
        email: user?.email || '',
      })
    );
    return `${header}.${payload}.signature`;
  }

  // Modal login logic
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) =>
        (u.email === loginIdentifier || u.username === loginIdentifier) &&
        u.password === loginPassword
    );
    if (user) {
      const fakeJWT = generateDummyJWT(user);
      localStorage.setItem('jwtToken', fakeJWT);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginError("");
      setLoginIdentifier("");
      setLoginPassword("");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  // Modal register logic
  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail)) {
      setRegError("Please enter a valid email address");
      return;
    }
    if (users.some(u => u.email === regEmail)) {
      setRegError("Email already registered");
      return;
    }
    if (users.some(u => u.username === regUsername)) {
      setRegError("Username already taken");
      return;
    }
    const newUser = { username: regUsername, email: regEmail, password: regPassword, phone: regPhone };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    const fakeJWT = generateDummyJWT(newUser);
    localStorage.setItem('jwtToken', fakeJWT);
    setIsLoggedIn(true);
    setShowRegisterModal(false);
    setRegError("");
    setRegUsername("");
    setRegEmail("");
    setRegPassword("");
    setRegPhone("");
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('googleUser');
    setIsLoggedIn(false);
  };

  // Google OAuth login handler
  const handleGoogleLogin = (credentialResponse) => {
    // Decode JWT from Google
    const token = credentialResponse.credential;
    let payload = {};
    try {
      payload = JSON.parse(atob(token.split('.')[1]));
    } catch (e) {}
    localStorage.setItem('jwtToken', token);
    // Store all Google users in localStorage array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Only add if not already present
    if (!users.some(u => u.email === payload.email)) {
      users.push({
        username: payload.name || payload.given_name || payload.email,
        email: payload.email,
        picture: payload.picture || '',
        google: true
      });
      localStorage.setItem('users', JSON.stringify(users));
    }
    localStorage.setItem('googleUser', JSON.stringify(payload));
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  // Unified handler for Navbar
  const handleLoginLogoutUnified = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      setShowLoginModal(true);
    }
  };

  // Get Google user info if logged in with Google
  let googleUser = null;
  if (isLoggedIn) {
    try {
      googleUser = JSON.parse(localStorage.getItem('googleUser'));
    } catch (e) {}
  }

  return (
    <ExpenseProvider>
      <Navbar
        isLoggedIn={isLoggedIn}
        handleLoginLogout={handleLoginLogoutUnified}
        handleLogoutWithModal={handleLogoutWithModal}
      />
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4 relative">
            <h2 className="text-xl font-bold text-center text-red-600">Confirm Logout</h2>
            <p className="text-gray-700 text-center">Are you sure you want to logout?</p>
            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={confirmLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 font-semibold"
              >
                Yes, Logout
              </button>
              <button
                onClick={cancelLogout}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              handleLoginLogout={handleLoginLogoutUnified}
              loginPasswordVisible={loginPasswordVisible}
              setLoginPasswordVisible={setLoginPasswordVisible}
              regPasswordVisible={regPasswordVisible}
              setRegPasswordVisible={setRegPasswordVisible}
              showLoginModal={showLoginModal}
              setShowLoginModal={setShowLoginModal}
              showRegisterModal={showRegisterModal}
              setShowRegisterModal={setShowRegisterModal}
              loginIdentifier={loginIdentifier}
              setLoginIdentifier={setLoginIdentifier}
              loginPassword={loginPassword}
              setLoginPassword={setLoginPassword}
              loginError={loginError}
              setLoginError={setLoginError}
              regUsername={regUsername}
              setRegUsername={setRegUsername}
              regEmail={regEmail}
              setRegEmail={setRegEmail}
              regPassword={regPassword}
              setRegPassword={setRegPassword}
              regPhone={regPhone}
              setRegPhone={setRegPhone}
              regError={regError}
              setRegError={setRegError}
              handleLogin={handleLogin}
              handleRegister={handleRegister}
              handleGoogleLogin={handleGoogleLogin}
              googleUser={googleUser}
            />
          }
        />
        <Route path="/friends" element={<Friends />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expense-history" element={<ExpenseHistory />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/balances" element={<Balances />} />
      </Routes>
    </ExpenseProvider>
  );
}

export default App;
