import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import HomeLayout from "./Components/Home/HomeLayout";
import AuthProvider from "./Components/Provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import Login from "./Components/Users/Login";
import Register from "./Components/Users/Register";
import Error from "./Components/Shared/Error";
import AddFood from "./Components/Foods/AddFood";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import FetchAvailableFoods from "./Components/Foods/FetchAvailableFoods";
import FoodDetails from "./Components/Foods/FoodDetails";
import ManageMyFoods from "./Components/Foods/ManageMyFoods";
import FetchMyReq from "./Components/Foods/FetchMyReq";
import UpdateFood from "./Components/Foods/UpdateFood";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/availableFoods",
        element: <FetchAvailableFoods />,
      },
      {
        path: "/addFood",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/foods/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://food-sharing-server-pi.vercel.app/foods/${params.id}`),
      },
      {
        path: "/myFoods",
        element: (
          <PrivateRoute>
            <ManageMyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/myRequests",
        element: (
          <PrivateRoute>
            <FetchMyReq />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateFood/:id",
        element: (
          <PrivateRoute>
            <UpdateFood />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://food-sharing-server-pi.vercel.app/foods/${params.id}`),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
