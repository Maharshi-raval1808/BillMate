// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // store user info
//   const [token, setToken] = useState(localStorage.getItem("token") || null);

//   // persist token in localStorage
//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }, [token]);

//   const login = (userData, jwt) => {
//     setUser(userData);
//     setToken(jwt);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//   };

//   const isLoggedIn = !!token;

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
