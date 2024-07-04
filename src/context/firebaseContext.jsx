/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { app, auth, db } from "../config/firebaseConfig"; // Adjust the import path as necessary

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ app, auth, db }}>
      {children}
    </FirebaseContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useFirebase = () => {
  return useContext(FirebaseContext);
};
