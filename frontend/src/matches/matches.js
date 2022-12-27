import React from "react";
import Header from "./../components/header/header";
import "./matches.css";
import getFlag from "../getFlag.js";
import stadium from "../imges/stadium.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import CartContainer from "../cart/cartContainer";
import axios from "axios";

function Matches() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzllMmY0YjdmNDE1Y2ViYzkwMDI1OWMiLCJ1c2VybmFtZSI6ImFobWVkeWFzc2VyIiwiZW1haWwiOiJ5YXNzZXJAZ21haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE2NzE0ODkyMjl9.a50elPCVT6kF9EGbovyOXFDmK8uwLIWvTNGEhWoq6D8";

  const [cartopened, setcartOpened] = useState(false);
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState(["Algeria", "Argentina"]);
  const [stadiums, setStadiums] = useState([]); // TODO: get stadiums from the backend

  const [userType, setUserType] = useState("manager"); // fan , manager , admin (get it from token)
  const [newMatch, setNewMatch] = useState(false);
  const [match, setMatch] = useState({
    firstTeam: "",
    secondTeam: "",
    stadium: "",
    date: "",
    referee: "",
    lineman1: "",
    lineman2: "",
  });

  useEffect(() => {
    //FIXME: fix the cors error
    axios
      .get("https://qatar2022worldcupreservationsystem.onrender.com/matches")
      .then((res) => {
        setMatches(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
  const handleAddMatch = () => {
    //TODO: add the match to the database
  };
  return (
    <div className="matches">
      <Header />
      <div className="matches__container">
        <div className="matches__container__header">
          <h1>{cartopened ? "Cart" : "Matches"}</h1>
        </div>

        <div className="matches__content">
          {userType === "fan" && (
            <CartContainer
              cartopened={cartopened}
              setcartOpened={setcartOpened}
            />
          )}

          <div className="matches_list">
            {matches.map((match, index) => (
              <div
                className="matches_list__item"
                key={index}
                onClick={() => {
                  window.location.href = "/tickets/" + match.matchId;
                }}
              >
                <div className="teams">
                  <div className="team">
                    <img
                      alt="team1"
                      src={getFlag(match.firstTeam)}
                      className="team-flag"
                    />
                    <h2>{match.firstTeam}</h2>
                  </div>
                  <span>VS</span>
                  <div className="team">
                    <img
                      alt="team2"
                      src={getFlag(match.secondTeam)}
                      className="team-flag"
                    />
                    <h2>{match.secondTeam}</h2>
                  </div>
                </div>
                <div className="match_info">
                  <div className="info">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <h3>{match.stadium.name}</h3>
                  </div>
                  <div className="info">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <h3>{match.date}</h3>
                  </div>
                  <div className="info">
                    <FontAwesomeIcon icon={faClock} />
                    {/* FIXME: convert date to time */}
                    <h3>{match.date}</h3>
                  </div>
                </div>
              </div>
            ))}
            {/* add match */}
            {userType === "manager" && (
              <div
                className="matches_list__item"
                onClick={() => {
                  setNewMatch(true);
                }}
              >
                <h1>+</h1>
              </div>
            )}
          </div>
          {/* add match */}
          {newMatch && (
            <div className="new_match">
              <div className="new_match__container">
                <div className="new_match__container__header">
                  <h1>Add Match</h1>
                  {/* close button */}
                  <div
                    className="close"
                    onClick={() => {
                      setNewMatch(false);
                    }}
                  >
                    <span>X</span>
                  </div>
                  <div className="new_match__container__content">
                    {/* add match info */}
                    <div className="new_match__container__content__info">
                      <div className="input_info">
                        <h3>First Team</h3>
                        {/* select from teams */}
                        <select>
                          {teams.map((team, index) => (
                            <option key={index}>{team.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="input_info">
                        <h3>Second Team</h3>
                        {/* select from teams */}
                        <select>
                          {teams.map((team, index) => (
                            <option key={index}>{team.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="input_info">
                        <h3>Stadium</h3>
                        {/* select from stadiums */}
                        <select>
                          {stadiums.map((stadium, index) => (
                            <option key={index}>{stadium.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="input_info">
                        <h3>Date</h3>
                        <input type="date" />
                      </div>
                      <div className="input_info">
                        <h3>Time</h3>
                        <input type="time" />
                      </div>
                      <div className="input_info">
                        <h3>Referee</h3>
                        <input type="text" />
                      </div>
                      <div className="input_info">
                        <h3>Lineman 1</h3>
                        <input type="text" />
                      </div>
                      <div className="input_info">
                        <h3>Lineman 2</h3>
                        <input type="text" />
                      </div>
                      <button>Add Match</button>
                      {/* <div className="stadium_image">
                        <img
                          alt="stadium"
                          src={stadium}
                          className="stadium-image"
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Matches;
