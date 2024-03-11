import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const [me, setMe] = useState(localStorage.getItem("me") || "");
  useEffect(() => {
    if (me) {
      localStorage.setItem("me", me);
    } else {
      localStorage.removeItem("me");
    }
  }, [me]);

  const [getMe, setGetMe] = useState("");

  return (
    <UserContext.Provider
      value={{ token, setToken, me, setMe, getMe, setGetMe }}
    >
      {children}
    </UserContext.Provider>
  );
};
