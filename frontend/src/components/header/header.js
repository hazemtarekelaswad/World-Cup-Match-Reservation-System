import { useState, useEffect } from "react";
import "./header.css";
import logo from "./../../imges/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { UserContext } from "./../../context";
/*cart*/

function Header() {
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
          <a href="/stadiums">Stadiums</a>
          {/* TODO: find a way to add tickets list or remove it */}
          {/* <a href="/tickets">Tickets</a> */}
        </div>
        <div className="header__menuRight">
          <a href="/login">Login</a>
          <a href="/signup">Register</a>
          <a href="/profile">Profile</a>.{/* cart */}
          <a href="/reservations">
            <FontAwesomeIcon className="cart-icon" icon={faCartShopping} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
