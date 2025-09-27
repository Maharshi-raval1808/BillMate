import React from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import GoogleLoginButton from "../components/GoogleLoginButton";

export default function Home(props) {

  const {
    isLoggedIn,
    handleLoginLogout,
    loginPasswordVisible,
    setLoginPasswordVisible,
    regPasswordVisible,
    setRegPasswordVisible,
    showLoginModal,
    setShowLoginModal,
    showRegisterModal,
    setShowRegisterModal,
    loginIdentifier,
    setLoginIdentifier,
    loginPassword,
    setLoginPassword,
    loginError,
    setLoginError,
    regUsername,
    setRegUsername,
    regEmail,
    setRegEmail,
    regPassword,
    setRegPassword,
    regPhone,
    setRegPhone,
    regError,
    setRegError,
    handleLogin,
    handleRegister,
    handleGoogleLogin,
    googleUser,
  } = props;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4 relative">
            <button
              className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center text-3xl text-gray-700 hover:text-red-500 font-bold focus:outline-none rounded-full bg-white shadow"
              onClick={() => setShowLoginModal(false)}
              aria-label="Close login dialog"
            >
              <span className="flex items-center justify-center w-full h-full">&times;</span>
            </button>
            <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
            <input
              type="text"
              placeholder="Email or Username"
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="relative">
              <input
                type={loginPasswordVisible ? "text" : "password"}
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setLoginPasswordVisible((v) => !v)}
                tabIndex={-1}
                aria-label={loginPasswordVisible ? "Hide password" : "Show password"}
              >
                {loginPasswordVisible ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {loginError && <div className="text-red-500 text-center">{loginError}</div>}
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition font-semibold mb-2"
            >
              Login
            </button>
            <GoogleLoginButton onSuccess={handleGoogleLogin} />
          </div>
        </div>
      )}

      {/* Top Section: Logo + Description */}
      <div className="flex flex-col md:flex-row items-center justify-center p-8 gap-12 w-full max-w-6xl mx-auto mt-8">
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src={`${process.env.PUBLIC_URL}/BillMate_Logo.png`}
            alt="BillMate Logo"
            className="rounded-lg shadow-lg"
            style={{ height: '100%', maxHeight: '340px', width: 'auto', minHeight: '180px' }}
          />
        </div>
        <div className="flex flex-col gap-6 max-w-lg text-center md:text-left justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 drop-shadow-md">
            BillMate
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Track your expenses, split bills with friends, and enjoy a seamless experience
            managing your finances. Keep everything in one place and never miss a payment!
          </p>
          {!googleUser ? (
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition text-lg font-semibold w-fit mx-auto md:mx-0"
            >
              Get Started
            </button>
          ) : (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow text-left flex items-center gap-4">
              {googleUser.picture && (
                <img src={googleUser.picture} alt="Google profile" className="w-16 h-16 rounded-full border" />
              )}
              <div>
                <div className="font-bold text-lg">{googleUser.name || googleUser.given_name || googleUser.email}</div>
                <div className="text-gray-700">{googleUser.email}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4 relative">
            <button
              className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center text-3xl text-gray-700 hover:text-red-500 font-bold focus:outline-none rounded-full bg-white shadow"
              onClick={() => setShowRegisterModal(false)}
              aria-label="Close register dialog"
            >
              <span className="flex items-center justify-center w-full h-full">&times;</span>
            </button>
            <h2 className="text-2xl font-bold text-center text-green-600">Register</h2>
            <input
              type="text"
              placeholder="Username"
              value={regUsername}
              onChange={(e) => setRegUsername(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <div className="relative">
              <input
                type={regPasswordVisible ? "text" : "password"}
                placeholder="Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setRegPasswordVisible((v) => !v)}
                tabIndex={-1}
                aria-label={regPasswordVisible ? "Hide password" : "Show password"}
              >
                {regPasswordVisible ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            <input
              type="text"
              placeholder="Phone Number"
              value={regPhone}
              onChange={(e) => setRegPhone(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {regError && <div className="text-red-500 text-center">{regError}</div>}
            <button
              onClick={handleRegister}
              className="w-full py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition font-semibold mb-2"
            >
              Register
            </button>
            <GoogleLoginButton onSuccess={handleGoogleLogin} />
          </div>
        </div>
      )}

      {/* Carousel */}
      <div className="mt-16 w-full px-4 md:px-0">
        <Carousel />
      </div>
    </div>
  );
}
