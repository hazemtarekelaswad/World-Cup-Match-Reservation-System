
import "./cart.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function Cart() {
    const [reservations, setReservations] = useState([{}]);

    useEffect(() => {

        setReservations([
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
            }
        ]);

    }, []);


    return (
    <div className="cart">
        <div className="reservations_list" /*style={editopened? {marginRight:"70px"} : {marginRight:"250px"}}*/>
            {reservations.map(reservation => <div className="reservation_list_item" key={reservation._id}>
                
                <div className="delete-reservation">
                    <FontAwesomeIcon className='icon-item' icon={faTrash} />
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
                        <div className="seat-number-value">{reservation.seatNo}</div>
                    </div>  
                </div>

            </div>)}
        </div>
    </div>
  );
}

export default Cart;
