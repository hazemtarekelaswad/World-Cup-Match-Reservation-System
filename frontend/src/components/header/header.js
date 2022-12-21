import React from "react";
import "./header.css";
import logo from "./../../imges/logo.png";
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
          {/* TODO: find a way to add tickets list or remove it */}
          {/* <a href="/tickets">Tickets</a> */}
        </div>
        <div className="header__menuRight">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
          {/* TODO: add profile drop menu */}
        </div>
      </div>
    </div>
  );
}

export default Header;
