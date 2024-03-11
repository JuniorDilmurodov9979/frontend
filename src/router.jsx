import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { HeaderProfile, Profile } from "./components/Profile/Profile";
import { Security } from "./components/Security/Security";
import { Body } from "./components/Body/Body";
import { Books } from "./components/Books/Books";
import { Author } from "./components/Author/Author";
import { SinglePageAuthor } from "./pages/SinglePageAuthor/SinglePageAuthor";
import { SinglePageBooks } from "./pages/SinglePageBooks/SinglePageBooks";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { Settings } from "./components/Settings/Settings";
import { AddAuthor } from "./components/AddAuthor/AddAuthor";
import { AddBook } from "./components/AddBook/AddBook";
import { Item } from "./components/Item/Item";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Body />,
      },
      {
        path: "temuriy",
        element: <h1></h1>,
      },
      {
        path: "mustaqillik",
        element: <h1></h1>,
      },
      {
        path: "sovet",
        element: <h1></h1>,
      },
      {
        path: "jadid",
        element: <h1></h1>,
      },
      {
        path: "search",
        element: <></>,
      },
    ],
  },
  {
    path: "/books",
    element: <Books />,
    children: [
      {
        path: "temuriy",
        element: <h1></h1>,
      },
      {
        path: "mustaqillik",
        element: <h1></h1>,
      },
      {
        path: "sovet",
        element: <h1></h1>,
      },
      {
        path: "jadid",
        element: <h1></h1>,
      },
    ],
  },
  {
    path: "/author/:id",
    element: <SinglePageAuthor />,
  },
  {
    path: "/singlebook/:id",
    element: <SinglePageBooks />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <HeaderProfile />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "security",
        element: <Security />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <h1 className="text-white text-3xl">404 page not found</h1>,
  },
  {
    path: "/addauthor",
    element: <AddAuthor />,
  },
  {
    path: "/addbook",
    element: <AddBook />,
  },
]);
