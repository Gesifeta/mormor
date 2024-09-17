import { useDispatch } from 'react-redux';
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { userLogin } from "../utils/queryStrings.js";
import client from "../utils/client";
import GoogleOauth from "../utils/auth.jsx";
import { login } from "../features/userSlice.js"
import Loader from "./Loader.jsx";


const Login = () => {
  //extract users' information
  //let user = useContext(userContext);
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const [username, setUserName] = useState(null);
  const [password, setPassord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    //check if the user is already login
        await client
          .fetch(userLogin(username, password))
          .then((response) => response)
          .then((data) => {
            if (data.length > 0) {
              localStorage.setItem(
                "user",
                JSON.stringify(...data)
              );
              setIsLoading(false);
              navigate("/home/pin-feeds", { replace: true });
              dispatch(login({
                _id: data[0]._id,
                firstName: data[0].firstName,
                lastName: data[0].lastName,
                email: data[0].email,
                image: data[0].image,
                status: { isAdmin: false },
              },));
              window.location.reload();
            } else {
              setIsLoading(false)
              navigate("/login", { replace: true });
            }
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
  }
  return isLoading ? (
    <Loader />
  ) : (
    <section className="user-login">
      <form
        method="get"
        className="user-login--form"
        autoComplete="false"
      >
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassord(e.target.value)}
        />
        <input
          type="button"
          value="Login"
            onClick={() => {
              setIsLoading(true)
              signIn()
            }}
          className="btn-primary"
        />
        <NavLink to="/reset">Forgot your password?</NavLink>
        <div className="login-methods">
            <GoogleOauth setIsLoading={setIsLoading} />
        </div>
      </form>
    </section>
  );
};

export default Login;
