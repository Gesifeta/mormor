import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {  useSelector } from "react-redux"

import client from "../utils/client";
import { ThreeDots } from "react-loader-spinner";
import UploadImage from "./UploadImage";

const CreatePin = () => {
  const {  imageFile } = useSelector((state) => state.image);
  const { isLoggedIn } = useSelector((state) => state.user)

 
  //get current user from local storage
let user =
  localStorage.getItem("user") !== undefined
    ? JSON.parse(localStorage.getItem("user"))
    : localStorage.clear();
  let navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(false);
  const [pin, setPin] = useState({
    _id: uuidv4(),
    _type: "pin",
    about: "",
    destination: "",
    category: "",
    postedBy: {
      _type: "reference",
      _ref: user?._id ? user?._id : user?.sub,
    },
  })

  const createPin = (e) => {
    e.preventDefault();
    setPageLoading(true);
    //get new pin data including images
    client.createIfNotExists({ ...pin, ...imageFile }).then((response) => {
      setPageLoading(false);
        navigate("/home/pin/new", { replace: true });
      return response
      });
  };

  return (
    <section className="feed">
      <form action="post" className="form-pin">
        <div className="pin-detail">
          <label htmlFor="about">About</label>
          <input
            type="text"
            name="about"
            id="about"
            onChange={(e) => setPin((p) => {
              return { ...p, [e.target.name]: e.target.value }
            })}
          />
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            name="destination"
            id="destination"
            placeholder="http://...."
            onChange={(e) => setPin((p) => {
              return { ...p, [e.target.name]: e.target.value }
            })}
          />
          <label htmlFor="category">Category</label>
          <select name="category" id="category" onChange={(e) => setPin((p) => {

            return { ...p, [e.target.name]: e.target.value }
          })}>
            <option value="select">Select Category</option>
            <option value="car">car</option>
            <option value="Fitness">Fitness</option>
            <option value="wallpaper">wallpaper</option>
            <option value="photo">photo</option>
            <option value="food">food</option>
            <option value="nature">nature</option>
            <option value="art">art</option>
            <option value="travel">travel</option>
            <option value="group">group</option>
            <option value="cat">cat</option>
            <option value="dog">dog</option>
            <option value="other">Other</option>
          </select>
          <p>Image</p>
          <UploadImage />
        </div>

        <div className="pin-detail-user">
          <label htmlFor="postedBy">PostedBy</label>
          <select name="postedBy" id="PostedBy">
            <option value={user && user.given_name || user.firstName}>
              {user && user.given_name || user.firstName}
            </option>
          </select>
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            name="userId"
            id="userId"
            disabled
            value={user._id !== undefined ? user._id : user.sub}
          />
        </div>
        <div>
          <button
            type="button"
            className="btn-primary"
            onClick={(e) => createPin(e)}
          >
            {pageLoading ? (
              <ThreeDots width={75} color="#fff" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePin;
