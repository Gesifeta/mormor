"use strict"
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { Login } from "./components";
import { LoginFailure, PageNotFound } from "./error";
import "./index.css";
import Home from "./containers/Home";
import RegisterUser from "./components/RegisterUser";
import PinFeed from "./containers/PinFeed";
import PinDetail from "./components/PinDetail";
import CreatePin from "./components/CreatePin";
import UserProfile from "./components/UserProfile";
import LandingPage from "./components/LandingPage";
import PasswordReset from "./components/PasswordReset";
import userReducer from "./features/userSlice";
import  imageReducer  from "./features/imageSlice"
import pinReducer from "./features/pinSlice"
import UploadImage from "./components/UploadImage";

//create data store
const store = configureStore({
  reducer: {
    user: userReducer,
    pin: pinReducer,
    image: imageReducer
  },
});

//create root router
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/reset",
    element: <PasswordReset />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/register",
    element: <RegisterUser />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/login-failure",
    element: <LoginFailure />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/home/pin/new",
        element: <CreatePin />,
      },
      {
        path: "/home/pin-feeds",
        element: <PinFeed />,
      },
      {
        path: "/home/pin-detail/:pinID",
        element: <PinDetail />,
      },
      {
        path: "/home/category/:categoryID",
        element: <PinFeed />,
      },
      {
        path:"/home/user/new",
        element: <RegisterUser/>,
      },
      {
        path: "/home/user/delete/:userID",
        element: <PinFeed />,
      },
      {
        path: "/home/user/update/:userID",
        element: <PinFeed />,
      },
      {
        path: "/home/user/profile/:userID",
        element: <UserProfile />,
      },

      
      {
        path: "/home/user/file-upload/",
        element: <UploadImage />,
      },
      {
        path: "/home/search/:searchText",
        element: <PinFeed />,
      },
          ],
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
