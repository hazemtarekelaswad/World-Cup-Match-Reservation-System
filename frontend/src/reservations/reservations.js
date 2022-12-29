import React, { useState, useEffect } from "react";
import Header from "./../components/header/header";
import "./reservations.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import moment from "moment";

function Reservations() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // fan, admin, manager
  const [reservation, setReservation] = useState([]); // to be filled from the backend

  const [reservations, setReservations] = useState([]); // after reformating
  
  
  useEffect(() => {
    setReservations(reservation.map((reserv) => {
      return reserv.seats.map((seat) => {
        return {
          matchId: reserv.matchId,
          firstTeam: reserv.firstTeam,
          secondTeam: reserv.secondTeam,
          date: moment(reserv.date).format("DD/MM/YYYY"),
          time: moment(reserv.date).format("HH:mm"),
          stadium: reserv.stadium.name,
          seatNO: (seat.seatRow-1)*reserv.stadium.columnsCount + seat.seatColumn,
          seatRow: seat.seatRow,
          seatColumn: seat.seatColumn,
        };
      });
    }));

    // console.log(reservations);
  }, [reservation]);



  // const [matches, setMatches] = useState([]);
  let matches = [];

  useEffect(() => {
    // TODO: fetch reservations from backend
    // console.log(token);

    axios
    .get("https://qatar2022worldcupreservationsystem.onrender.com/users/reservations", {
        headers: {
          Token: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setReservation(res.data.reservations);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);


  const cancelReservation = (matchId, seatColumn, seatRow) => {
    //TODO: delete reservation from backend
    console.log(matchId, seatColumn, seatRow);
    axios
    .put("https://qatar2022worldcupreservationsystem.onrender.com/users/cancellation", {
      matchId: matchId,
      seatRow: seatRow,
      seatColumn: seatColumn,
    }, 
    {
      headers: {
        Token: token,
      }
    })
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
  };
  return (
    <div className="reservations">
      <Header />
      <div className="reservations__container">
        <div className="reservations__header">
          <h1>Reservations</h1>
        </div>
        {reservations[0] ? (
          <div className="reservations_list">
            {reservations[0].map((reserv, id) => {
            {/* console.log(reserv); */}
            return ( 
                <div className="reservation_list_item" key={id}>
                  <div
                    className="delete-reservation"
                    onClick={() => cancelReservation(reserv.matchId, reserv.seatRow, reserv.seatColumn)}
                  >
                    <FontAwesomeIcon className="icon-item" icon={faTrash} />
                  </div>

                  <div className="reservation_list_item_container">
                    <div className="ticket-box-container">
                      <div className="team1">{reserv.firstTeam}</div>
                      <div className="vs">VS</div>
                      <div className="team2">{reserv.secondTeam}</div>
                    </div>

                    <div className="ticket-box-container">
                      <div className="match-stadium">{reserv.stadium}</div>
                      <div className="match-date">{reserv.date}</div>
                      <div className="match-time">{reserv.time}</div>
                    </div>

                    <div className="ticket-box-container">
                      <div className="seat-number-container">
                        <div className="seat-number-label">Seat Number</div>
                        <div className="seat-number-value">
                          {reserv.seatNO}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

            )})}
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
