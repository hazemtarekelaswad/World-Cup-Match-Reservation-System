import React from "react";
import Header from "./../components/header/header";
import "./stadiums.css";
function Stadiums() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // fan, admin, manager
  return (
    <div className="stadiums">
      <Header />
      <div className="stadiums__container">
        <div className="stadiums__header">
          <h1>Stadiums</h1>
        </div>
      </div>
    </div>
  );
}

export default Stadiums;
