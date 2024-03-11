import { createContext, useContext, useEffect, useState } from "react";

export const AddContext = createContext();

export const AddContextProvider = ({ children }) => {
  const [book, setBook] = useState("");
  const [genre, setGenre] = useState("");
  //   const [me, setMe] = useState(localStorage.getItem("me") || "");
  //   useEffect(() => {
  //     if (me) {
  //       localStorage.setItem("me", me);
  //     } else {
  //       localStorage.removeItem("me");
  //     }
  //   }, [me]);

  //   const [getMe, setGetMe] = useState("");

  return (
    <AddContext.Provider value={{ book, setBook }}>
      {children}
    </AddContext.Provider>
  );
};
