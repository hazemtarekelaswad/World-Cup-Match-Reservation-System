import "./App.css";
import Login from "./login/login.js";
import Matches from "./matches/matches";
import Home from "./home/home";
import Tickets from "./tickets/tickets";
import Profile from "./profile/profile";
import Teams from "./teams/teams";
import Stadiums from "./stadiums/stadiums";
import Reservations from "./reservations/reservations";
import Users from "./users/users";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SET_TOKEN } from "./store/actions/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/login" element={<Login signupParam={false} />} />
        <Route path="/signup" element={<Login signupParam={true} />} />
        <Route path="/profile" element={<Profile />} />
        {/* TODO: change this to include the match id */}
        <Route path="/tickets/:id" element={<Tickets />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/stadiums" element={<Stadiums />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
