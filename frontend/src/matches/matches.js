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
const matches = [
  {
    id: 1,
    venue: "The Oval",
    date: "2020-09-02",
    time: "14:00",
    team1: "Morraco",
    team2: "Spain",
    refree: "Yasser",
    lineman1: "Magdy",
    lineman2: "Saif",
    tickets: 100,
  },
  {
    id: 2,
    venue: "Losail",
    date: "2020-09-03",
    time: "14:00",
    team1: "Morraco",
    team2: "Spain",
    refree: "Yasser",
    lineman1: "Magdy",
    lineman2: "Saif",
    tickets: 100,
  },
  {
    id: 3,
    venue: "ElBeit",
    date: "2020-09-04",
    time: "14:00",
    team1: "Morraco",
    team2: "Spain",
    refree: "Hazem",
    lineman1: "Magdy",
    lineman2: "Saif",
    tickets: 100,
  },
  {
    id: 4,
    venue: "The Oval",
    date: "2020-09-02",
    time: "14:00",
    team1: "Morraco",
    team2: "Spain",
    refree: "Yasser",
    lineman1: "Magdy",
    lineman2: "Saif",
    tickets: 100,
  },
];
function Matches() {
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
                window.location.href = "/tickets/" + match.id;
              }}
            >
              <div className="teams">
                <div className="team">
                  <img alt="team1" src={flag} className="team-flag" />
                  <h2>{match.team1}</h2>
                </div>
                <span>VS</span>
                <div className="team">
                  <img alt="team2" src={flag} className="team-flag" />
                  <h2>{match.team2}</h2>
                </div>
              </div>
              <div className="match_info">
                <div className="info">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <h3>{match.venue}</h3>
                </div>
                <div className="info">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <h3>{match.date}</h3>
                </div>
                <div className="info">
                  <FontAwesomeIcon icon={faClock} />
                  <h3>{match.time}</h3>
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
