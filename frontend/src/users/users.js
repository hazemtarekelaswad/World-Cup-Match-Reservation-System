import React from "react";
import Header from "./../components/header/header";
import "./users.css";

function Users() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // fan, admin, manager
  return (
    <div className="users">
      <Header />
      <div className="users__container">
        <div className="users__header">
          <h1>Users</h1>
        </div>
      </div>
    </div>
  );
}

export default Users;
