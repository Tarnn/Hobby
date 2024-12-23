// import React, { createContext, useContext, useState, ReactNode } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../state/store";

// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: () => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   // const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const dispatch: AppDispatch = useDispatch();

//   const login = () => {
//     // setIsAuthenticated(true);
//     // Update your redux state here
//     dispatch({ type: 'LOGIN' });
//     // Update your router here
//     // history.push('/dashboard');
//   };

//   const logout = () => {
//     // setIsAuthenticated(false);
//     // Update your redux state here
//     dispatch({ type: 'LOGOUT' });
//     // Update your router here
//     // history.push('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };