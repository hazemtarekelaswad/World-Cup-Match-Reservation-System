import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./tickets.css";
import Header from "./../components/header/header";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
//referees
import { faFlag } from "@fortawesome/free-solid-svg-icons";
// linemen
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Tickets({ matchID }) {
  const token = localStorage.getItem("token");
  // console.log("token", token);
  const userType = localStorage.getItem("role");
  //FIXME: add an id to the match and use it to get the match data
  const match_id = useParams().id;
  const [match, setMatch] = useState({});
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  useEffect(() => {
    axios
      .get(
        `https://qatar2022worldcupreservationsystem.onrender.com/matches/${match_id}`
      )
      .then((res) => {
        console.log(res.data);
        setMatch(res.data);
        setRows(Array(res.data.stadium.rowsCount / 10).fill(0));
        setColumns(Array(res.data.stadium.columnsCount / 10).fill(0));
        setOccupiedSeats(
          res.data.fans.map((fan) => {
            return { row: fan.seatRow, column: fan.seatColumn };
          })
        );
        console.log(occupiedSeats);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [match.matchId]);

  const handleConfirm = () => {
    console.log(selectedSeats);
    console.log(match.matchId);
    
    axios
      .put(
        `https://qatar2022worldcupreservationsystem.onrender.com/users/reservation`,
        {
          matchId: match.matchId,
          seats: selectedSeats.map(seat => {
            return {
              seatRow: seat.row,
              seatColumn: seat.column,
            }
          }),
          creditCard: "123456789", // TODO: get the credit card from the user
          pinNumber: "1234", // TODO: get the pin number from the user

          // fans: selectedSeats.map((seat) => {
          //   return {
          //     fanId: "63ab90e7a309e2a7d3d777a0", // TODO: get the user id from the backend
          //     seatRow: seat.row,
          //     seatColumn: seat.column,
          //   };
          // }),
        },
        {
          headers: {
            Token: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="tickets">
      <Header />
      <div className="match">
        <div className="match__header">
          <h1>Match details</h1>
        </div>
        <div className="match__details">
          <div className="match__teams">
            <h1>{match.firstTeam}</h1>
            <h3>VS</h3>
            <h1>{match.secondTeam}</h1>
          </div>
          <div className="match__info">
            <div className="match__info__item">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <p>{match.stadium?.name}</p>
            </div>
            <div className="match__info__item">
              <FontAwesomeIcon icon={faClock} />
              <p>{match.date}</p>
            </div>
            <div className="match__info__item">
              <FontAwesomeIcon icon={faFlag} />
              <p>{match.referee}</p>
            </div>
            <div className="match__info__item">
              <FontAwesomeIcon icon={faUser} />
              <p>{match.firstLineman}</p>
            </div>
            <div className="match__info__item">
              <FontAwesomeIcon icon={faUser} />
              <p>{match.secondLineman}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="grid__header">
          <h1>Seat reservation</h1>
        </div>
        {rows.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <div
                className={`seat ${
                  occupiedSeats.find(
                    (seat) =>
                      seat.row === rowIndex + 1 &&
                      seat.column === columnIndex + 1
                  )
                    ? "occupied"
                    : ""
                } ${
                  selectedSeats.find(
                    (seat) =>
                      seat.row === rowIndex + 1 &&
                      seat.column === columnIndex + 1
                  )
                    ? "selected"
                    : ""
                }`}
                key={columnIndex}
                onClick={() => {
                  // disable the click if the seat is occupied
                  if (
                    occupiedSeats.find(
                      (seat) =>
                        seat.row === rowIndex + 1 &&
                        seat.column === columnIndex + 1
                    )
                  )
                    return;
                  // remove the seat from the selected seats if it's already selected
                  //FIXME: remove the seat is not working (it remove column and row at the same time)
                  // toggle the seat
                  if (
                    selectedSeats.find(
                      (seat) =>
                        seat.row === rowIndex + 1 &&
                        seat.column === columnIndex + 1
                    )
                  ) {
                    // remove the seat
                    setSelectedSeats(
                      selectedSeats.filter((seat) => {
                        return (
                          seat.row !== rowIndex + 1 ||
                          seat.column !== columnIndex + 1
                        );
                      })
                    );
                  } else {
                    setSelectedSeats([
                      ...selectedSeats,
                      { row: rowIndex + 1, column: columnIndex + 1 },
                    ]);
                  }
                  console.log(selectedSeats);
                }}
              ></div>
            ))}
          </div>
        ))}
        <button
          className="button"
          onClick={() => {
            handleConfirm();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Tickets;
