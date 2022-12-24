import React from "react";
import Header from "./../components/header/header";
import "./matches.css";
import flag from "./../imges/egypt.png";
//time form font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
// import Tickets from "./../tickets/tickets";
// import to fetch data from backend
import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
import CartContainer from "../cart/cartContainer";

function Matches() {

  const [cartopened, setcartOpened] = useState(false);
  const [matches, setMatches] = useState([]);
  
  
  
  useEffect(() => {
    //FIXME: fix the cors error
    // axios
    //   .get("https://qatar2022worldcupreservationsystem.onrender.com/matches")
    //   .then((res) => {
    //     console.log(res.data);
    //     setMatches(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    fetch("https://qatar2022worldcupreservationsystem.onrender.com/matches", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.log(res.data);
        setMatches(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setMatches([
      {
        id: 0,
        firstTeam: "Egypt",
        secondTeam: "Morocco",
        stadium: "Al Rayyan Stadium",
        date: "2021-12-12",
        time: "12:00",
      },
      {
        id: 1,
        firstTeam: "Egypt",
        secondTeam: "Morocco",
        stadium: "Al Rayyan Stadium",
        date: "2021-12-12",
        time: "12:00",
      },
      {
        id: 2,
        firstTeam: "Egypt",
        secondTeam: "Morocco",
        stadium: "Al Rayyan Stadium",
        date: "2021-12-12",
        time: "12:00",
      },
    ]);
  }, []);

  return (
    <div className="matches">
      <Header />
      <div className="matches__container">
        <div className="matches__container__header">
          <h1>{cartopened ? "Cart" : "Matches"}</h1>
        </div>

        <div className="matches__content">
          <CartContainer cartopened={cartopened} setcartOpened={setcartOpened}/>

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Matches;