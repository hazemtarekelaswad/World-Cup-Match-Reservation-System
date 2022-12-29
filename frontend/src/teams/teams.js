import React, { useState, useEffect } from "react";
import Header from "./../components/header/header";
import "./teams.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import getFlag from "../getFlag";
import Message from "../errorMessage/errorMessage";

function Teams() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // fan, admin, manager
  const [teams, setTeams] = useState([]);
  const [userType, setUserType] = useState("fan"); // fan , manager , admin (get it from token)
  const [flags, setFlags] = useState([]);

  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    // use the token to get the teams
    axios
      .get("https://qatar2022worldcupreservationsystem.onrender.com/teams", {
        headers: {
          Token: token, //FIXME: why only manager can see the teams?
        },
      })
      .then((res) => {
        setTeams(res.data.teams);
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(err.response.data.message);
        setShow(true);
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
          {show && <Message message={errMsg} show={show} setShow={setShow} />}
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
