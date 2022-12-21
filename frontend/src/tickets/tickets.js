import React from "react";
import { useParams } from "react-router-dom";
import "./tickets.css";
import Header from "../components/header/header";
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
const match = {
  firstTeam: "ahly",
  secondTeam: "ahly",
  stadium: { name: "ay 7aga", columnsCount: 10, rowsCount: 15 },
  date: "2022-12-20T00:00:00.000Z",
  referee: "ali gom3a",
  firstLineman: "ma7mod",
  secondLineman: "ma7mod gom3a",
  fans: [
    {
      fanId: "6398a97d737c37fab7d8d80f",
      seatRow: 10,
      seatColumn: 5,
      _id: "639e595a480f08f5c23f88fb",
    },
    {
      fanId: "639e2f4b7f415cebc900259c",
      seatRow: 10,
      seatColumn: 15,
      _id: "639e5bb8f8bc3bcd06a76b73",
    },
  ],
};
function Tickets({ matchID }) {
  //FIXME: add an id to the match and use it to get the match data
  // const match = matches.find((match) => match._id === matchID);
  // const match_id = useParams().id;
  // return <div>tickets {match_id}</div>;
  // array of seats
  const rows = new Array(match.stadium.rowsCount).fill(0);
  const columns = new Array(match.stadium.columnsCount).fill(0);

  return (
    <div className="tickets">
      <Header />
      <div className="grid">
        <div className="grid__header">
          <h1>{match.firstTeam}</h1>
          <h1>VS</h1>
          <h1>{match.secondTeam}</h1>
        </div>
        <div className="grid__body">
          {rows.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <div
                  className="seat"
                  key={columnIndex}
                  onClick={() => {
                    //FIXME: how would I know if the seat is already reserved or not?
                  }}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <button className="button">Confirm</button>
      </div>
    </div>
  );
}

export default Tickets;
