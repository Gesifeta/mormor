import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./../assets/logo/main-logo.png";
import { LogoSmallColor } from "../assets/logo";
import { Categories } from "../utils/categories";
import { FaBars, FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  let triggerPoint;
  window.addEventListener("resize", () => {
    triggerPoint = window.innerWidth;
    if (triggerPoint < 600) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  });

  return (
    <div className="sidebar">
      <div className="container-logo">
        <FaBars
          className="burger-menu"
          onClick={() =>
            showSidebar
              ? setShowSidebar(false)
              : setShowSidebar(true)
          }
        />
        <img
          className="logo-small"
          src={LogoSmallColor}
          alt="logo"
        />
      </div>
      {showSidebar ? (
        <div className="sidebar-menu">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <div className="title">
            <FaHouse className="home" />
            <span className="sub-title">Home</span>
          </div>
          <div className="category">
            <p className="title">Discover </p>
            <ul className="category-list">
              {Categories.map((category, index) => (
                <li
                  key={index}
                  onClick={(e) => {
                    navigate(
                      `/home/category/${e.target.textContent}`,
                      { replace: true }
                    );
                  }}
                >
                  <div className="category-image">
                    <img src={category.image} alt="" />
                  </div>
                  <Link>{category.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
