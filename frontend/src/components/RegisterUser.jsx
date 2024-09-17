import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useSelector } from "react-redux";

import { users } from "./data";
import getImageFile from "./../utils/getLocalFile";
import client from "../utils/client";
import UploadImage from "./UploadImage";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const RegisterUser = () => {
  let navigate = useNavigate();
  const { imageFile } = useSelector((state) => state.image);
  const [pageLoading, setPageLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  //create user
  const [user, setUser] = useState({
    _id: uuidv4(),
    _type: "user",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    password2: "",
    address: {
      _type: "address",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  function registerUser() {
    setPageLoading(true);
    client.createIfNotExists({ ...user, ...imageFile }).then(() => {
      setPageLoading(false);
      navigate("/home", { replace: true });
      return;
    });
    return;
  }
  return (
    <section className="feeds">
      <div className="user-form">
        <form action="post" className="user-form--register">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(event) => setUser((prev) => {
              return { ...prev, firstName: event.target.value }
            })
            }
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"

            onChange={(event) =>
              setUser((prev) => {
                return { ...prev, lastName: event.target.value }
              })
            }
          />
          <label htmlFor="gender">Gender</label>
          <select
            type="text"
            name="gender"
            id="gender"

            onChange={(event) =>
              setUser((prev) => {
                return { ...prev, gender: event.target.value }
              })
            }
          >
            <option value="select">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="none">Not to say</option>
          </select>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="on"
            onChange={(event) =>
              setUser((prev) => {
                return { ...prev, email: event.target.value }
              })
            }
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="on"
            onChange={(event) =>
              setUser((prev) => {
                return { ...prev, password: event.target.value }
              })
            }
          />
          <label htmlFor="password">Repeat Password</label>
          <input
            type="password"
            name="password2"
            id="password2"
            autoComplete="off"
            onChange={(event) =>
              setUser((prev) => {
                return { ...prev, password2: event.target.value }
              })
            }
          />

          <button
            type="button"
            className="btn-primary"
            onClick={registerUser}
          >
            {pageLoading ? (
              <ThreeDots width={75} color="#fff" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
        <div className="profile-photo">
          <div className="user-address">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              name="street"
              id="street"
              onChange={(event) =>
                setUser((prev) => {
                  return { ...prev, address: { ...prev.address, street: event.target.value } }
                })
              }
            />
            <label htmlFor="zip">Zip</label>
            <input type="text" name="zip" id="zip" />
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              onChange={(event) =>
                setUser((prev) => {
                  return { ...prev, address: { ...prev.address, city: event.target.value } }
                })  
              }
            />
            <label htmlFor="state">State</label>
            <input type="text" name="state" id="state" onChange={(event) => setUser(
              (prev) => {
                return { ...prev, address: { ...prev.address, state: event.target.value } }
              }
            )} />
            <label htmlFor="country">Country</label>
            <input type="text" name="country" id="country" onChange={(event) => setUser(
              (prev) => {
                return { ...prev, address: { ...prev.address, country: event.target.value } }
              }
            )} />       
          </div>
          <p>Upload Profile Photo</p>
          <UploadImage
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterUser;
