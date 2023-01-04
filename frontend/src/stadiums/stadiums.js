import React, { useState, useEffect } from "react";
import Header from "./../components/header/header";
import axios from "axios";
import "./stadiums.css";
import Message from "../errorMessage/errorMessage";


function Stadiums() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // fan, admin, manager
  const [stadiums, setStadiums] = useState([]);
  const [stadium, setStadium] = useState({});
  const [added, setAdded] = useState(false);
    
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    // use the token to get the stadiums
    axios
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
      });
  }, [stadiums.length]);

  const handleAddStadium = () => {
    // add stadium
    console.log("stadium: ", stadium);
    if (stadium.rowsCount > 50 || stadium.columnsCount > 20) {
      setErrMsg("Columns must be less than or equal 20, and Rows must be less than or equal 50");
      setShow(true);
      return;
    }
    axios
      .post(
        "https://qatar2022worldcupreservationsystem.onrender.com/stadium",
        stadium,
        {
          headers: {
            Token: token,
          },
        }
      )
      .then((res) => {
        //refresh
        setStadiums([...stadiums, stadium]);
        //clear input get element by id
        document.getElementById("name").value = "";
        document.getElementById("rows").value = "";
        document.getElementById("columns").value = "";
        setStadium({});
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(err.response.data.message);
        setShow(true);
      });
  };

  return (
    <div className="stadiums">
      <Header />
      <div className="stadiums__container">
        <div className="stadiums__header">
          <h1>Stadiums</h1>
        </div>
        <div className="stadiums__body">
          {/* table of stadiums */}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Rows</th>
                <th>Columns</th>
                <th>Capacity</th>
              </tr>
            </thead>
            <tbody>
              {stadiums.map((stadium) => (
                <tr key={stadium.stadiumId}>
                  <td>{stadium.name}</td>
                  <td>{stadium.rowsCount}</td>
                  <td>{stadium.columnsCount}</td>
                  <td>{stadium.rowsCount * stadium.columnsCount}</td>
                </tr>
              ))}
              {/* Add stadium input places */}
              <tr>
                <td>
                  {/* reset after add */}
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => {
                      setStadium({ ...stadium, name: e.target.value });
                    }}
                  />
                </td>
                <td>
                  <input
                    id="rows"
                    type="number"
                    placeholder="Rows"
                    value={stadium.rowsCount > 50 ? 50 : (stadium.rowsCount < 3 ? 3 : stadium.rowsCount)}
                    onChange={(e) => {
                      setStadium({ ...stadium, rowsCount: e.target.value });
                    }}
                  />
                </td>
                <td>
                  <input
                    id="columns"
                    type="number"
                    placeholder="Columns"
                    value={stadium.columnsCount > 20 ? 20 : (stadium.columnsCount < 3 ? 3 : stadium.columnsCount)}
                    onChange={(e) => {
                      setStadium({ ...stadium, columnsCount: e.target.value });
                    }}
                  />
                </td>
                <td>
                  <button
                    className="stadiums__button"
                    onClick={() => {
                      // add stadium
                      handleAddStadium();
                    }}
                  >
                    Add Stadium
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          {show && <Message message={errMsg} show={show} setShow={setShow} />}
        </div>
      </div>
    </div>
  );
}

export default Stadiums;
