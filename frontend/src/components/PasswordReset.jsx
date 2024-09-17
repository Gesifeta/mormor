import React from "react";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const navigate = useNavigate();
  return (
    <section className="password-form">
      <div className="password-reset">
        <p>
          If your email is found with us, we will send you a
          link to reset your password to your email address
        </p>
        <label htmlFor="userName">
          Enter your email address
        </label>
        <input
          type="email"
          name="userName"
          id="userName"
          placeholder="email addres..."
        />
        <button className="btn-primary">Send </button>
        <button
          className="btn-primary"
          onClick={() =>
            navigate("/home/pin-feeds", { replace: true })
          }
        >
          Cancel{" "}
        </button>
      </div>
    </section>
  );
};

export default PasswordReset;
