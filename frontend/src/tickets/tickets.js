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
//TODO:
// 1- get the match id from the url
// 2- get the match data from the backend
// 3- display the match data
// 4- display the tickets data (grid of seats)
// 5- add the ticket by clicking on the seat
// 6- remove the ticket by clicking on the seat
// 7- confirm the tickets
// 8- update the tickets data in the backend
// 9- update the user cart in the backend
// const match = {
//   firstTeam: "ahly",
//   secondTeam: "ahly",
//   stadium: { name: "ay 7aga", columnsCount: 10, rowsCount: 15 },
//   date: "2022-12-20T00:00:00.000Z",
//   referee: "ali gom3a",
//   firstLineman: "ma7mod",
//   secondLineman: "ma7mod gom3a",
//   fans: [
//     {
//       fanId: "6398a97d737c37fab7d8d80f",
//       seatRow: 10,
//       seatColumn: 5,
//       _id: "639e595a480f08f5c23f88fb",
//     },
//     {
//       fanId: "639e2f4b7f415cebc900259c",
//       seatRow: 10,
//       seatColumn: 15,
//       _id: "639e5bb8f8bc3bcd06a76b73",
//     },
//   ],
// };
function Tickets({ matchID, token, setToken }) {
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
        setMatch(res.data);
        setRows(Array(res.data.stadium.rowsCount / 10).fill(0));
        setColumns(Array(res.data.stadium.columnsCount / 10).fill(0));
        setOccupiedSeats(
          res.data.fans.map((fan) => {
            return { row: fan.seatRow, column: fan.seatColumn };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [match.matchId]);

  const handleConfirm = () => {
    console.log(selectedSeats);
    axios
      .put(
        `https://qatar2022worldcupreservationsystem.onrender.com/matches/${match_id}`,
        {
          fans: selectedSeats.map((seat) => {
            return {
              fanId: "6398a97d737c37fab7d8d80f", // TODO: get the user id from the backend
              seatRow: seat.row,
              seatColumn: seat.column,
            };
          }),
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
