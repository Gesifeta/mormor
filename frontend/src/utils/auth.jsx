import {
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { login } from "../features/userSlice";
import client from "./client";

//extract users' information
export const GoogleOauth = ({ setIsLoading }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  //set user info
  function googleAuth(response) {
    const user = jwtDecode(response.credential);
    localStorage.setItem("user", JSON.stringify(user));
    let userInfo = {
      _id: user.sub,
      _type: "user",
      firstName: user.name,
      image: user.picture,
      email: user.email,
    };
    client.createIfNotExists(userInfo).then(() => {
      dispatch(login(userInfo))
      navigate("/home/pin-feeds", { replace: true });
    });
    return user;
  }
  return (
    <>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_APP_MORMOR_GOOGLE_ID}
      >
        <div className="login-methods">
          <h2>Easy Sign in ?</h2>
          <GoogleLogin
            onSuccess={(response) => {
              setIsLoading(false)
              googleAuth(response)
            }}
            onError={(err) => {
              setIsLoading(false)
              navigate("/login-failure", {
                replace: true,
              })
              return err
            }}
          />
        </div>
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleOauth;
