import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email, password) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      setCurrentUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      setCurrentUser(userCredential.user);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    signUp,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{loading?"Loading..................":children}</AuthContext.Provider>;
};
