import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, handleLoginLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); 

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/friends", label: "Friends" },
    { path: "/expenses", label: "Expenses" },
    { path: "/expense-history", label: "Expense History" },
    // { path: "/summary", label: "Summary" },
    { path: "/balances", label: "Balances" },
  ];

  const onLoginLogout = () => {
    handleLoginLogout();
    if (isLoggedIn) {
      navigate("/");
    }
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-blue-600">BillMate</span>
        <span className="text-sm text-gray-600">Track, Split, Enjoy.</span>
      </div>

      <div className="flex items-center gap-6">
        {isLoggedIn && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="px-4 py-2 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
            >
              Menu
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                {menuItems
                  .filter((item) => item.path !== location.pathname) 
                  .map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Login / Logout */}
        <button
          onClick={onLoginLogout}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition text-lg font-semibold"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}
