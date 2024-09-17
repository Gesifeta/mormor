import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { login } from "../features/userSlice";
import Shareme from "./../assets/share.mp4";
import Login from "./Login";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  const dispatch = useDispatch();
  const userInfo =
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  const user = {
    _id: userInfo?.sub,
    firstName: userInfo?.given_name,
    lastName: userInfo?.family_name,
    email: userInfo?.email,
    image: userInfo?.picture,
    status: {
      loggedIn: true,
      isAdmin: userInfo?.isAdmin,
    },
  };
  useEffect(() => {
    if (userInfo?._id) dispatch(login(user));
  }, []);
  return (
    <div className="landing-page">
      <div className="hero-video">
        <video
          type="video/mp4"
          loop
          autoPlay
          muted
          src={Shareme}
        />
      </div>
      <div className="hero">
        <div className="hero-text">
          <h1>Want to explore high quality images?</h1>
          <p>
            At MORMOR gallary, you can interect with images.
            You want to download, download it. You want to
            comment and like, you can do it also. We
            hand-select every image and accept only the
            best, so that no matter what you need—you’ll
            find exactly what you’re looking for.
          </p>
        </div>
        <div className="hero-cta">
          <NavLink to="/home/pin-feeds">
            <button className="btn-register">
              Explore
            </button>
          </NavLink>
          <NavLink to="/register">
            <button className="reg">Sign Up </button>
          </NavLink>
        </div>
      </div>
      <div className="user-login">
        <Login />
      </div>
    </div>
  );
};

export default LandingPage;
