import React, { useState, useEffect } from "react";
import Header from "./../components/header/header";
import "./reservations.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Reservations() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // fan, admin, manager

  const [reservations, setReservations] = useState([
    {
      _id: "0",
      matchId: "0",
      firstTeam: "Egypt",
      secondTeam: "Morocco",
      stadium: "Al Rayyan Stadium",
      date: "2021-12-12",
      time: "12:00",
      seatNo: "12",
    },
    {
      _id: "1",
      matchId: "5",
      firstTeam: "Egypt",
      secondTeam: "Argentina",
      stadium: "Al Rayyan Stadium",
      date: "2021-12-12",
      time: "12:00",
      seatNo: "12",
    },
    {
      _id: "2",
      matchId: "5",
      firstTeam: "Egypt",
      secondTeam: "Argentina",
      stadium: "Al Rayyan Stadium",
      date: "2021-12-12",
      time: "12:00",
      seatNo: "12",
    },
    {
      _id: "3",
      matchId: "5",
      firstTeam: "Egypt",
      secondTeam: "Argentina",
      stadium: "Al Rayyan Stadium",
      date: "2021-12-12",
      time: "12:00",
      seatNo: "12",
    },
    {
      _id: "4",
      matchId: "5",
      firstTeam: "Egypt",
      secondTeam: "Argentina",
      stadium: "Al Rayyan Stadium",
      date: "2021-12-12",
      time: "12:00",
      seatNo: "12",
    },
    {
      _id: "5",
      matchId: "5",
      firstTeam: "Egypt",
      secondTeam: "Argentina",
      stadium: "Al Rayyan Stadium",
      date: "2021-12-12",
      time: "12:00",
      seatNo: "12",
    },
    {
      _id: "6",
      matchId: "5",
      firstTeam: "Egypt",
      secondTeam: "Argentina",
      stadium: "Al Rayyan Stadium",
      date: "2021-12-12",
      time: "12:00",
      seatNo: "12",
    },
    {
      _id: "7",
      matchId: "5",
      firstTeam: "Egypt",
      secondTeam: "Argentina",
      stadium: "Al Rayyan Stadium",
      date: "2021-12-12",
      time: "12:00",
      seatNo: "12",
    },
    {
      _id: "8",
      matchId: "5",
      firstTeam: "Egypt",
      secondTeam: "Argentina",
      stadium: "Al Rayyan Stadium",
      date: "2021-12-12",
      time: "12:00",
      seatNo: "12",
    },
  ]);
  useEffect(() => {
    // TODO: fetch reservations from backend
  }, []);

  const cancelReservation = (id) => {
    setReservations([
      ...reservations.filter((reservation) => reservation._id !== id),
    ]);
    //TODO: delete reservation from backend
  };
  return (
    <div className="reservations">
      <Header />
      <div className="reservations__container">
        <div className="reservations__header">
          <h1>Reservations</h1>
        </div>
        {reservations.length > 0 ? (
          <div className="reservations_list">
            {reservations.map((reservation) => (
              <div className="reservation_list_item" key={reservation._id}>
                <div
                  className="delete-reservation"
                  onClick={() => cancelReservation(reservation._id)}
                >
                  <FontAwesomeIcon className="icon-item" icon={faTrash} />
                </div>

                <div className="reservation_list_item_container">
                  <div className="match-team">
                    <div className="team1">{reservation.firstTeam}</div>
                    <div className="vs">VS</div>
                    <div className="team2">{reservation.secondTeam}</div>
                  </div>

                  <div className="match-details">
                    <div className="match-stadium">{reservation.stadium}</div>
                    <div className="match-date">{reservation.date}</div>
                    <div className="match-time">{reservation.time}</div>
                  </div>

                  <div className="seat-number">
                    <div className="seat-number-label">Seat Number</div>
                    <div className="seat-number-value">
                      {reservation.seatNo}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-reservations">
            <h1>You have no reservations</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservations;
