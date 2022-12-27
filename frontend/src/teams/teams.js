import React, { useState, useEffect } from "react";
import Header from "./../components/header/header";
import "./teams.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import getFlag from "../getFlag";

function Teams({ token, setToken }) {
  const [teams, setTeams] = useState([]);
  const [userType, setUserType] = useState("fan"); // fan , manager , admin (get it from token)
  const [flags, setFlags] = useState([]);
  // TODO: get token in another way
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzllMmY0YjdmNDE1Y2ViYzkwMDI1OWMiLCJ1c2VybmFtZSI6ImFobWVkeWFzc2VyIiwiZW1haWwiOiJ5YXNzZXJAZ21haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE2NzE0ODkyMjl9.a50elPCVT6kF9EGbovyOXFDmK8uwLIWvTNGEhWoq6D8";
  useEffect(() => {
    // use the token to get the teams
    axios
      .get("https://qatar2022worldcupreservationsystem.onrender.com/teams", {
        headers: {
          Token: token,
        },
      })
      .then((res) => {
        setTeams(res.data.teams);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [teams.length]);

  return (
    <div className="teams_page">
      <Header />
      <div className="teams__container__header">
        <h1>Teams</h1>
      </div>
      <div className="teams__content">
        <div className="teams_list">
          {teams.map((team, index) => (
            <div className="teams_list__item" key={index}>
              <div className="country">
                <img
                  alt={team.name}
                  src={getFlag(team.name)}
                  className="country-flag"
                  key={index}
                />
                <h2>{team.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teams;
