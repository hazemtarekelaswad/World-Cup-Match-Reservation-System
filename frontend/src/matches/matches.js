import React from "react";
import Header from "./../components/header/header";
import "./matches.css";
import getFlag from "../getFlag.js";
import stadium from "../imges/stadium.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function Matches() {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("role");
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState(["Algeria", "Argentina"]);
  // const [stadiums, setStadiums] = useState([
  const [stadiums, setStadiums] = useState([
    //FIXME: get stadiums to pass their id to the match
    {
      _id: "639a4f107ae74d5f9de83751",
      name: "ay 7aga",
      columnsCount: 100,
      rowsCount: 150,
    },
    {
      _id: "63ac2da865ce80b49de6e144",
      name: "Borg Elarab",
      columnsCount: 50,
      rowsCount: 30,
    },
    {
      _id: "63aca2893fff7dee3edde16d",
      name: "Cairo",
      columnsCount: 70,
      rowsCount: 30,
    },
  ]);

  const [newMatch, setNewMatch] = useState(false);
  const [match, setMatch] = useState({
    firstTeam: "",
    secondTeam: "",
    stadium: "",
    date: "",
    referee: "",
    firstLineman: "",
    secondLineman: "",
    time: "",
  });

  useEffect(() => {
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

  // useEffect(() => {
  //   // use the token to get the stadiums
  //   axios
  //     .get("https://qatar2022worldcupreservationsystem.onrender.com/stadiums", {
  //       headers: {
  //         Token: token,
  //       },
  //     })
  //     .then((res) => {
  //       setStadiums(res.data.stadiums);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [stadiums.length]);

  const handleAddMatch = () => {
    if (
      match.firstTeam === "" ||
      match.secondTeam === "" ||
      match.stadium === "" ||
      match.date === "" ||
      match.referee === "" ||
      match.firstLineman === "" ||
      match.secondLineman === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    if (match.firstTeam === match.secondTeam) {
      alert("Please choose two different teams");
      return;
    }
    if (match.firstLineman === match.secondLineman) {
      alert("Please choose two different linemen");
      return;
    }
    if (match.firstLineman === match.referee) {
      alert("Please choose a different referee");
      return;
    }
    if (match.secondLineman === match.referee) {
      alert("Please choose a different referee");
      return;
    }
    const temp_match = {
      firstTeam: match.firstTeam,
      secondTeam: match.secondTeam,
      stadium: match.stadium,
      // stadium: match.stadium,
      date: match.date + "T" + match.time + ":00.000+00:00",
      //date: "2023-06-12T12:00:00.000+00:00",
      referee: match.referee,
      firstLineman: match.firstLineman,
      secondLineman: match.secondLineman,
    };
    console.log("temp_match: ", temp_match);
    axios
      .post(
        "https://qatar2022worldcupreservationsystem.onrender.com/manager/match",
        temp_match,
        {
          headers: {
            Token: token,
          },
        }
      )
      .then((res) => {
        window.location.reload();
        setNewMatch(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteMatch = (matchId) => {
    axios
      .delete(
        `https://qatar2022worldcupreservationsystem.onrender.com/manager/match/${matchId}`,
        {
          headers: {
            Token: token,
          },
        }
      )
      .then((res) => {
        console.log("res: ", res);
        setMatches(matches.filter((match) => match.matchId !== matchId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="matches">
      <Header />
      <div className="matches__container">
        <div className="matches__container__header">
          <h1>Matches</h1>
        </div>
        <div className="matches__content">
          <div className="matches_list">
            {matches.map((match, index) => (
              <div className="matches_list__container" key={index}>
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
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      <h3>{match.stadium.name}</h3>
                    </div>

                    <div className="info">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <h3>{moment(match.date).format("YYYY-MM-DD")}</h3>
                    </div>

                    <div className="info">
                      <FontAwesomeIcon icon={faClock} />
                      <h3>{moment(match.date).format("hh:mm")}</h3>
                    </div>
                    <div className="info">
                      <FontAwesomeIcon icon={faUser} />
                      <h3>{match.referee}</h3>
                    </div>
                  </div>
                </div>
                {userType === "manager" && (
                  <div className="actions-matches">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="edit_icon"
                      onClick={() => {
                        setNewMatch(true);
                        //TODO: edit match callback
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="delete_icon"
                      onClick={() => {
                        handleDeleteMatch(match.matchId);
                      }}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* add match */}
            {userType === "manager" && (
              <div
                className="matches_list__item__add"
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
                        <select
                          onChange={(e) => {
                            setMatch({
                              ...match,
                              firstTeam: e.target.value,
                            });
                          }}
                        >
                          {teams.map((team, index) => (
                            <option key={index}>{team.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="input_info">
                        <h3>Second Team</h3>
                        {/* select from teams */}
                        <select
                          onChange={(e) => {
                            setMatch({
                              ...match,
                              secondTeam: e.target.value,
                            });
                          }}
                        >
                          {teams.map((team, index) => (
                            <option key={index}>{team.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="input_info">
                        <h3>Stadium</h3>
                        {/* select from stadiums */}
                        <select
                          onChange={(e) => {
                            setMatch({
                              ...match,
                              stadium: stadiums.find(
                                (stadium) => stadium.name === e.target.value
                              )._id,
                            });
                          }}
                        >
                          {stadiums.map((stadium, index) => (
                            <option key={index}>{stadium.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="input_info">
                        <h3>Date</h3>
                        <input
                          type="date"
                          onChange={(e) => {
                            setMatch({
                              ...match,
                              date: moment(e.target.value).format("YYYY-MM-DD"),
                            });
                          }}
                        />
                      </div>
                      <div className="input_info">
                        <h3>Time</h3>
                        <input
                          type="time"
                          onChange={(e) => {
                            setMatch({
                              ...match,
                              time: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="input_info">
                        <h3>Referee</h3>
                        <input
                          type="text"
                          onChange={(e) => {
                            setMatch({
                              ...match,
                              referee: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="input_info">
                        <h3>Lineman 1</h3>
                        <input
                          type="text"
                          onChange={(e) => {
                            setMatch({
                              ...match,
                              firstLineman: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="input_info">
                        <h3>Lineman 2</h3>
                        <input
                          type="text"
                          onChange={(e) => {
                            setMatch({
                              ...match,
                              secondLineman: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <button
                        onClick={() => {
                          handleAddMatch();
                        }}
                      >
                        Add Match
                      </button>
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
