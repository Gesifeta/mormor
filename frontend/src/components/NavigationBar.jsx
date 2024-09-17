import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaEllipsisVertical,
  FaSistrix,
  FaX,
} from "react-icons/fa6";

import { searchPin } from "../utils/queryStrings";
import client, { urlFor } from "../utils/client";
import { logout } from '../features/userSlice';
import UploadImage from "./UploadImage";
import { setPins } from '../features/pinSlice';
const user =
  localStorage.getItem("user") !== undefined
    ? JSON.parse(localStorage.getItem("user"))
    : localStorage.clear();
const NavigationBar = () => {
  const dispatch = useDispatch()
  //get imagefiles from store
  const {  isLoggedIn } = useSelector((state) => state.user)
  //get loading status from redux store
  const { loading } = useSelector((state) => state.pin)
  const [searchString, setSearchString] = useState("");
  const { imageFile } = useSelector((state) => state.image)
  let navigate = useNavigate();
  const [upload, setUpload] = useState(false)
  const [picture, setPicture] = useState("");
  useEffect(() => {
    if (user) {
      if (user?.image) {
        setPicture(urlFor(user?.image).url());
      }
      else {
        setPicture(user?.picture);
      }
    }
  }, [user]);
  //used to toggle profileoperations
  const showProfileOperation = () => {
    const profileMenu =
      document.getElementById("profile-menu");
    const setting = document.querySelector(".setting");

    profileMenu.addEventListener("mouseenter", () => {
      setting.classList.add("show");
    });

    setting.addEventListener("mouseleave", () => {
      setting.classList.remove("show");
    });
  };
  //seach every aspects of pin data
  const searchPins = (searchText) => {

    client
      .fetch(searchPin(searchText))
      .then((data) => {
        dispatch(setPins(data));
      }).catch(err => err);
  };
  useEffect(() => {
    showProfileOperation();
  }, []);
  //update profile image
  const updateProfilePicture = () => {
    if (!imageFile.image.asset._ref) return;
    client
      .patch(user?._id || user?.sub)
      .set({
        image: {
          asset: {
            _type: "reference",
            _ref: imageFile.image.asset._ref,
          },
        },

      })
      .commit()
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.reload();
        setUpload(!upload);
      });
  };
  const handleSearch = (e) => {
    setSearchString(e.target.value);
    return searchPins(searchString);
  };
  return (
    <nav className="nav-bar">

      <div className="nav-header">
        <div className="search">
          <FaSistrix className="search-icon" />
          <input
            className="search-input"
            type="text"
            name=""
            id=""
            onChange={handleSearch}
          />
        </div>
        {isLoggedIn ?
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem"
          }} onClick={()=>navigate("/home/pin/new")} >
            <div className="app__gallery-add"><FaPlus /></div>
            <span style={{ textWrap: "nowrap" }}>Add gallery</span>
          </div> : null}
      </div>
      {/* upload image */}
      {!upload && isLoggedIn &&
        <div className="app__upload-container">
          <p>Profile picture</p>
          <UploadImage /> <div><FaX className="close"
            onClick={() => {
              setUpload(!upload)
            }}
          /></div>
          <button className="btn-primary" onClick={updateProfilePicture}>Submit</button>
        </div>}
      <div className="profile">
        {user ? (
          <div className="app__user-profile--image">
          <img
              src={
                picture
              }
            alt="profile"
              onClick={() => setUpload(!upload)} /></div>
        ) : <span className="app__user-profile--image"><FaPlus onClick={() => (user?._id || user?.sub) ? navigate(`/file-upload/${user?._id ? user._id : user?.sub}`, { replace: true }) : navigate("/register")} /> profile</span>}

        <div id="profile-menu">
          <FaEllipsisVertical />
        </div>
        <div className="setting">
          <ul className="setting-user">
            <li onClick={() => setUpload(!upload)} >Change Profile image</li>
            <li>Profile</li>
            <li
              onClick={() => {
                navigate("/reset", { replace: true });
              }}
            >
              Change password
            </li>
            <li
              onClick={() => {
                navigate("/", { replace: true });
                dispatch(logout())
                window.location.reload();
                return localStorage.removeItem("user");
              }}
            >
              Log out
            </li>
            <li
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "red";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "inherit";
                e.target.style.color = "inherit";
              }}
            >
              Close Account
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
