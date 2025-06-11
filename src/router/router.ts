import { createBrowserRouter } from "react-router";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/main",
    Component: MainPage,
  },
]);
