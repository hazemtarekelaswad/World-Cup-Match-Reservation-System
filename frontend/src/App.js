import "./App.css";
import Login from "./login/login.js";
import Matches from "./matches/matches";
import Home from "./home/home";
import Tickets from "./tickets/tickets";
import Profile from "./profile/profile";
import Teams from "./teams/teams";
import Stadiums from "./stadiums/stadiums";
import Reservations from "./reservations/reservations";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [token, setToken] = useState("");
  console.log("token App", token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home token={token} setToken={setToken} />} />
        <Route
          path="/matches"
          element={<Matches token={token} setToken={setToken} />}
        />
        <Route
          path="/login"
          element={
            <Login token={token} setToken={setToken} signupParam={false} />
          }
        />
        <Route
          path="/signup"
          element={
            <Login token={token} setToken={setToken} signupParam={true} />
          }
        />
        <Route
          path="/profile"
          element={<Profile token={token} setToken={setToken} />}
        />
        {/* TODO: change this to include the match id */}
        <Route
          path="/tickets/:id"
          element={<Tickets token={token} setToken={setToken} />}
        />
        <Route
          path="/teams"
          element={<Teams token={token} setToken={setToken} />}
        />
        <Route
          path="/stadiums"
          element={<Stadiums token={token} setToken={setToken} />}
        />
        <Route
          path="/reservations"
          element={<Reservations token={token} setToken={setToken} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
