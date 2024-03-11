import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./main.css";
import { routers } from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { AddContextProvider } from "./context/AddContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ThemeProvider>
      <AddContextProvider>
        <UserContextProvider>
          <RouterProvider router={routers} />
        </UserContextProvider>
      </AddContextProvider>
    </ThemeProvider>
  </>
);
