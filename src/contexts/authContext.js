"use client";
import { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { LOGOUT_ENDPOINT } from "@/api/endpoints";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("userToken")
      : null;
  const storedUserID =
    typeof localStorage !== "undefined" ? localStorage.getItem("userID") : null;
  const [userToken, setUserToken] = useState(storedToken);

  const [userID, setUserID] = useState(storedUserID);

  const [isLoading, setIsLoading] = useState(true);

  const isTokenExpired = (token) => {
    if (!token || token == "null") {
      return true;
    }
    console.log("token", token);
    console.log("id", userID);
    try {
      const decoded = jwt.decode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  useEffect(() => {
    getUserIDFromLocalStorage();
    getTokenFromLocalStorage();
    const storedToken = localStorage.getItem("userToken");
    if (isTokenExpired(storedToken)) {
      setUserToken(null);
    } else {
      setUserToken(storedToken);
    }
  }, []);

  const logout = async () => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userID");
    }
    try {
      const response = await fetch(LOGOUT_ENDPOINT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error during logout:", error);
    }

    setUserToken(null);
    setUserID(null);
  };

  const getTokenFromLocalStorage = () => {
    return typeof localStorage !== "undefined"
      ? localStorage.getItem("userToken")
      : null;
  };

  const getUserIDFromLocalStorage = () => {
    return typeof localStorage !== "undefined"
      ? localStorage.getItem("userID")
      : null;
  };

  const isLoggedIn = () => {
    if (
      getTokenFromLocalStorage() === "null" ||
      getTokenFromLocalStorage() === null ||
      getTokenFromLocalStorage() === undefined
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("userToken", userToken);

    }
  }, [userToken]);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("userID", userID);
    }
  }, [userID]);

  return (
    <AuthContext.Provider
      value={{
        userID,
        setUserID,
        userToken,
        setUserToken,
        isLoading,
        setIsLoading,
        logout,
        getTokenFromLocalStorage,
        getUserIDFromLocalStorage,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
