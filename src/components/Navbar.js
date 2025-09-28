import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, handleLoginLogout, handleLogoutWithModal }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Friends", path: "/friends" },
    { name: "Expenses", path: "/expenses" },
    { name: "Expense History", path: "/expense-history" },
    { name: "Balances", path: "/balances" },
  ];

  return (
  <nav className="sticky top-0 w-full bg-white/90 backdrop-blur shadow-lg px-4 sm:px-8 py-4 flex flex-row justify-between items-center z-50 border-b border-gray-200">
      {/* Logo */}
  <div className="flex flex-col min-w-[110px] sm:min-w-[140px]">
        <span className="text-3xl font-extrabold text-indigo-600 tracking-tight">BillMate</span>
        <span className="text-sm text-gray-500">Track, Split, Enjoy.</span>
      </div>

      {/* Right Section */}
  <div className="flex items-center gap-4 sm:gap-8">
        {isLoggedIn && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl shadow hover:bg-gray-200 transition font-semibold"
            >
              Menu
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-2xl z-50">
                {menuItems
                  .filter((item) => item.path !== location.pathname)
                  .map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-5 py-3 hover:bg-indigo-50 text-gray-700 rounded-xl"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Login / Logout Button */}
        <button
          onClick={() => {
            if (isLoggedIn) {
              handleLogoutWithModal();
            } else {
              handleLoginLogout();
            }
          }}
          className="custom-button text-lg"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}
