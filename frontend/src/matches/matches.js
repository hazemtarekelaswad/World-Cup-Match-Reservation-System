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
import Message from "../errorMessage/errorMessage";

function Matches() {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("role");
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState(["Algeria", "Argentina"]);
  const [stadiums, setStadiums] = useState([]);
  const [newMatch, setNewMatch] = useState(false);
  const [editMatch, setEditMatch] = useState(false);
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


  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    axios
      .get("https://qatar2022worldcupreservationsystem.onrender.com/matches")
      .then((res) => {
        setMatches(res.data);
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(err.response.data.message);
        setShow(true);
      });
  }, []);

  useEffect(() => {
    // use the token to get the teams
    {userType == "manager" && axios
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
        setErrMsg(err.response.data.message);
        setShow(true);
      });}
  }, [teams.length]);

  useEffect(() => {
    // use the token to get the stadiums
    {userType == "manager" && axios
      .get("https://qatar2022worldcupreservationsystem.onrender.com/stadiums", {
        headers: {
          Token: token,
        },
      })
      .then((res) => {
        setStadiums(res.data.stadiums);
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(err.response.data.message);
        setShow(true);
      });}
  }, [stadiums.length]);

  const handleAddMatch = (id) => {
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
      stadium: editMatch ? match.stadium.stadiumId : match.stadium,
      date: match.date + "T" + match.time + ":00.000+00:00",
      referee: match.referee,
      firstLineman: match.firstLineman,
      secondLineman: match.secondLineman,
    };
    //add match or edit match
    if (editMatch) {
      console.log("edit match");
      console.log("id: ", id);
      console.log("temp_match: ", temp_match);
      axios
        .put(
          `https://qatar2022worldcupreservationsystem.onrender.com/matches/${id}`,
          temp_match,
          {
            headers: {
              Token: token,
            },
          }
        )
        .then((res) => {
          window.location.reload();
          setEditMatch(false);
        })
        .catch((err) => {
          console.log(err);
          setErrMsg(err.response.data.message);
          setShow(true);
        });
    } else {
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
          setErrMsg(err.response.data.message);
          setShow(true);
        });
    }
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
        setErrMsg(err.response.data.message);
        setShow(true);
      });
  };

  function getTrueTime(date) {
    // console.log("date: ", date);
    // get time from date
    let time = date.split("T")[1].split(".")[0];
    // console.log("time: ", time);
    let hour = time.split(":")[0];
    let min = time.split(":")[1];

    time = hour + ":" + min;
    // console.log("time: ", time);
    return time;
  }

  return (
    <div className="matches">
      <Header />
      <div className="matches__container">
        <div className="matches__container__header">
          <h1>Matches</h1>
        </div>
        <div className="matches__content">
          <div className="matches_list">
            {show && <Message message={errMsg} show={show} setShow={setShow} />}

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
                      <h3>{
                        getTrueTime(match.date)
                      }</h3>
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
                        setMatch(match);
                        setEditMatch(true);
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
                  <h1>{editMatch ? "Edit Match" : "Add Match"}</h1>
                  {/* close button */}
                  <div
                    className="close"
                    onClick={() => {
                      setNewMatch(false);
                      setEditMatch(false);
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
                          value={match.firstTeam || ""}
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
                          value={match.secondTeam || ""}
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
                          value={match.stadium.name || ""}
                          onChange={(e) => {
                            setMatch({
                              ...match,
                              stadium: stadiums.find(
                                (stadium) => stadium.name === e.target.value
                              ).stadiumId,
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
                          //TODO: add match date in its format
                          value={moment(match.date).format("YYYY-MM-DD") || ""}
                          // format="YYYY-MM-DD"
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
                          //TODO: add match time in its format
                          type="time"
                          value={match.time}
                          onChange={(e) => {
                            console.log(match);
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
                          value={match.referee || ""}
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
                          value={match.firstLineman || ""}
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
                          value={match.secondLineman || ""}
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
                          if (editMatch) {
                            handleAddMatch(match.matchId);
                          } else {
                            handleAddMatch(0);
                          }
                        }}
                      >
                        {editMatch ? "Update Match" : "Add Match"}
                      </button>
                      
                    </div>
                    {show && <Message color={"red"} message={errMsg} show={show} setShow={setShow}/>}

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
