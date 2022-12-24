import React from "react";
import Header from "./../components/header/header";
import "./matches.css";
import flag from "./../imges/egypt.png";
//time form font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Tickets from "./../tickets/tickets";
// import to fetch data from backend
import { useState, useEffect } from "react";
import axios from "axios";

function Matches() {
  const [matches, setMatches] = useState([]);
  function gettime(time) {
    var date = new Date(time);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  useEffect(() => {
    //FIXME: fix the cors error
    axios
      .get("https://qatar2022worldcupreservationsystem.onrender.com/matches")
      .then((res) => {
        console.log(res.data);
        setMatches(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //   setMatches([
    //     {
    //       id: 1,
    //       firstTeam: "Egypt",
    //       secondTeam: "Morocco",
    //       stadium: "Al Rayyan Stadium",
    //       date: "2021-12-12",
    //       time: "12:00",
    //     },
    //     {
    //       id: 2,
    //       firstTeam: "Egypt",
    //       secondTeam: "Morocco",
    //       stadium: "Al Rayyan Stadium",
    //       date: "2021-12-12",
    //       time: "12:00",
    //     },
    //   ]);
  }, []);

  return (
    <div className="matches">
      <Header />
      <div className="matches__container">
        <div className="matches__container__header">
          <h1>Matches</h1>
        </div>
        <div className="matches_list">
          {matches.map((match) => (
            <div
              className="matches_list__item"
              onClick={() => {
                window.location.href = "/tickets/" + match.matchId;
              }}
            >
              <div className="teams">
                <div className="team">
                  <img alt="team1" src={flag} className="team-flag" />
                  <h2>{match.firstTeam}</h2>
                </div>
                <span>VS</span>
                <div className="team">
                  <img alt="team2" src={flag} className="team-flag" />
                  <h2>{match.secondTeam}</h2>
                </div>
              </div>
              <div className="match_info">
                <div className="info">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <h3>{match.stadium.name}</h3>
                </div>
                <div className="info">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <h3>{match.date}</h3>
                </div>
                <div className="info">
                  <FontAwesomeIcon icon={faClock} />
                  {/* FIXME: convert date to time */}
                  <h3>{gettime(match.time)}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Matches;
