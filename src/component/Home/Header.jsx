import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import live_logo_gif from "../../Assets/wallpaper/live_logo.gif";

const Header = () => {
  const switcherTab = useRef(null);

  const [mode, setMode] = useState("default");
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const [favouriteCount, setFavouriteCount] = useState(0); // ✅ Favourite count

  // ✅ Fetch favourite course count from backend
  const fetchFavouriteCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/v2/courses/favorited", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavouriteCount(response.data.courses?.length || 0);
    } catch (error) {
      console.error("Error fetching favourite courses:", error);
      setFavouriteCount(0);
    }
  };

  useEffect(() => {
    fetchFavouriteCount();
  }, []);

  // Apply selected theme mode
  useEffect(() => {
    document.body.classList.remove("visual-aid", "dark-mode");
    if (mode === "visual-aid") document.body.classList.add("visual-aid");
    if (mode === "dark") document.body.classList.add("dark-mode");
  }, [mode]);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 100) {
        navbar.classList.add("active");
      } else {
        navbar.classList.remove("active");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleThemeOptions = () => {
    setShowThemeOptions(!showThemeOptions);
  };

  return (
    <div className="Header">
      <div className="navbar" ref={switcherTab}>
        <div className="navigation">
          <Link to="/">
            <img src={live_logo_gif} alt="logo" className="logo" />
          </Link>
          <ul>
            <li>
              <NavLink to="/products">Explore</NavLink>
            </li>
            <li>
              <NavLink to="/faq">Courses</NavLink>
            </li>
          </ul>
        </div>

        <div className="rightOption">
          {/* Theme Toggle */}
          <div
            className="icon-link"
            onClick={toggleThemeOptions}
            style={{ cursor: "pointer" }}
          >
            👁️
          </div>
          {showThemeOptions && (
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="theme-select"
            >
              <option value="default">Default</option>
              <option value="visual-aid">Visual Aid</option>
              <option value="dark">Dark Mode</option>
            </select>
          )}

          {/* Search */}
          <Link to="/search" className="icon-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </Link>

          {/* ❤️ Favourites */}
          <Link to="/favorites" className="icon-link relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="M8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
            {favouriteCount > 0 && <div className="badge">{favouriteCount}</div>}
          </Link>

          {/* 👤 User */}
          <Link to="/login" className="icon-link user-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
