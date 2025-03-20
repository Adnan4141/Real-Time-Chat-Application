import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ErrorPage from "./Errorpage";
import useUserStore from "../app/zustard/userStore";

const MainRoute = () => {
  const user = useUserStore((state) => state.user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: user ? <Navigate to={"/dashboard"} /> : <Login />,
    },
    {
      path: "/register",
      element:user ? <Navigate to={"/dashboard"} /> : <Signup />,
    },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <UserDashboard />
        </PrivateRoute>
      ),
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default MainRoute;
