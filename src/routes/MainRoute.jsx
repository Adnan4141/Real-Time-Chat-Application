import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
        <Login />
    ),
  },
  {
    path: "/register",
    element: (
        <Signup />
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <UserDashboard />
      </PrivateRoute>
    ),
  },
]);

const MainRoute = () => {
  return <RouterProvider router={router} />;
};

export default MainRoute;
