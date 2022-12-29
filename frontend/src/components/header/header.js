import { useState, useEffect } from "react";
import "./header.css";
import logo from "./../../imges/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
// logout fontawesome
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // fan, admin, manager

  return (
    <div className="header">
      <div className="header__logo">
        <img className="header__logoImg" src={logo} alt="logo" />
      </div>
      <div className="header__menu">
        <div className="header__menuLeft">
          <a href="/">Home</a>
          <a href="/matches">Matches</a>
          <a href="/teams">Teams</a>
          {role === "manager" && <a href="/stadiums">Stadiums</a>}

          {role === "admin" && <a href="/users">Users</a>}
        </div>
        {!token ? (
          <div className="header__menuRight">
            <a href="/login">Login</a>
            <a href="/signup">Register</a>
          </div>
        ) : (
          <div className="header__menuRight">
            <a href="/profile">Profile</a>.{/* cart */}
            {role === "fan" && <a href="/reservations">
              <FontAwesomeIcon className="cart-icon" icon={faCartShopping} />
            </a>}
            <FontAwesomeIcon
              className="logout-icon"
              icon={faSignOutAlt}
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                window.location.href = "/";
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
