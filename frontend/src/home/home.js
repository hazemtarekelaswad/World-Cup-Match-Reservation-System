import { useState, useEffect } from "react";
import bg from "./../imges/t.png";
import toy from "./../imges/toy.png";
import "./home.css";
import Header from "./../components/header/header";
function Home() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [user, setUser] = useState({});

  console.log("token: ", token);
  console.log("role: ", role);

  return (
    <div className="home">
      <div className="home_container">
        <Header />
        <div className="background">
          <div className="background__content">
            <img alt="logo" className="background__content__logo" src={toy} />
            <h1>
              FIFA World Cup
              <br />
              Qatar 2022
              <br />
              Tickets
            </h1>
            {!token ? (
              <div className="background__content__buttons">
                <button className="background__content__buttons__button">
                  <a href="/login">Login</a>
                </button>
                <button className="background__content__buttons__button">
                  <a href="/signup">Sign Up</a>
                </button>
              </div>
            ) : (
              //matches

              <div className="background__content__buttons">
                <button className="background__content__buttons__button">
                  <a href="/matches">Matches</a>
                </button>
                {role === "fan" && <button className="background__content__buttons__button">
                  <a href="/reservations">Tickets</a>
                </button>}
              </div>
            )}
          </div>

          <img alt="background" className="background-img" src={bg} />
        </div>
      </div>
    </div>
  );
}

export default Home;
