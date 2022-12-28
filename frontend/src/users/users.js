import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./../components/header/header";
import "./users.css";

function Users() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // fan, admin, manager
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://qatar2022worldcupreservationsystem.onrender.com/admin/users",
        {
          headers: {
            Token: token,
          },
        }
      )
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Approve = (id) => {
    axios
      .post(
        `https://qatar2022worldcupreservationsystem.onrender.com/admin/approve/${id}`,
        {},
        {
          headers: {
            Token: token,
          },
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Delete = (id) => {
    console.log("delete", id);
    //delete user
    axios
      .delete(
        `https://qatar2022worldcupreservationsystem.onrender.com/admin/user/${id}`,
        {
          headers: {
            Token: token,
          },
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="users">
      <Header />
      <div className="users__container">
        <div className="users__header">
          <h1>Users</h1>
        </div>
        <div className="users__table">
          <div className="filter">
            <span>Username:</span>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setFilteredUsers(
                  users.filter((user) => {
                    return user.username
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase());
                  })
                );
              }}
            />
            <span>Role:</span>
            <select
              onChange={(e) => {
                if (e.target.value === "all") {
                  setFilteredUsers(users);
                } else {
                  setFilteredUsers(
                    users.filter((user) => {
                      return user.role
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase());
                    })
                  );
                }
              }}
            >
              <option value="all">All</option>
              <option value="fan">Fan</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            <span>Status:</span>
            <select
              onChange={(e) => {
                if (e.target.value === "all") {
                  console.log("all");
                  setFilteredUsers(users);
                } else {
                  setFilteredUsers(
                    users.filter((user) => {
                      return user.status
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase());
                    })
                  );
                }
              }}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Active</option>
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.userId}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                    <td className="actions">
                      {user.status === "pending" && (
                        <button onClick={() => Approve(user.userId)}>
                          Approve
                        </button>
                      )}
                      {user.role !== "admin" && (
                        <button onClick={() => Delete(user.userId)}>
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
