import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUnlockKeyhole,
  faUser,
  faEnvelope,
  faEarthAfrica,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import tamema from "../imges/toy.png";
import Header from "../components/header/header";
import moment from "moment";
import axios from "axios";

function Login({ signupParam, token, setToken }) {
  const [signup, setSignup] = useState(signupParam);
  const [dateValue, onDateChange] = useState(new Date());

  const [user, setUser] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    birthDate: "",
    gender: "",
    nationality: "",
    email: "",
    role: "fan",
  });

  function setUserOnChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function setGenderOnChange(event) {
    setUser({ ...user, ["gender"]: event.value == "Male" ? "M" : "F" });
  }

  function signupOnClick() {
    setUser({ ...user, ["birthDate"]: moment(dateValue).format("YYYY-MM-DD") });
    console.log(user);
    axios
      .post(
        "https://qatar2022worldcupreservationsystem.onrender.com/users/signup",
        {
          username: user.username,
          password: user.password,
          firstName: user.firstname,
          lastName: user.lastname,
          birthDate: user.birthDate,
          gender: user.gender,
          nationality: user.nationality,
          email: user.email,
          role: "fan",
        }
      )
      .then((res) => {
        console.log(res);
        setSignup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function loginOnClick() {
    axios
      .post(
        "https://qatar2022worldcupreservationsystem.onrender.com/users/signin",
        {
          username: user.username,
          password: user.password,
        }
      )
      .then((res) => {
        setToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="login">
      <Header />
      <div className="login-wrapper">
        <div
          className={
            signup ? "login-container signup-style" : "login-container"
          }
        >
          <div className="img-container">
            <div className="img">
              <img className="icon-img" src={tamema} alt="tamema" />
              {/* <FontAwesomeIcon className='icon-img' icon={faUser} /> */}
            </div>
          </div>
          <div className="form-container">
            <div className="inputs-container">
              <div className="form-wrapper">
                {signup && (
                  <div className="Name-container">
                    <div className="first-name">
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="First name"
                        onChange={(e) => setUserOnChange(e)}
                      />
                    </div>
                    <div className="last-name">
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Last name"
                        onChange={(e) => setUserOnChange(e)}
                      />
                    </div>
                  </div>
                )}

                {signup && (
                  <div className="birth-date-container">
                    <div className="label">Birth date: </div>
                    <DatePicker
                      className="DatePicker"
                      name="birthDate"
                      format="dd/MM/yyyy"
                      onChange={onDateChange}
                      value={dateValue}
                    />
                  </div>
                )}

                {signup && (
                  <div className="nationality-container">
                    <div className="icon">
                      <FontAwesomeIcon
                        className="icon-item"
                        icon={faEarthAfrica}
                      />
                    </div>
                    <div className="input">
                      <input
                        type="text"
                        name="nationality"
                        id="nationality"
                        placeholder="nationality"
                        onChange={(e) => setUserOnChange(e)}
                      />
                    </div>
                  </div>
                )}

                {signup && (
                  <div className="email-container">
                    <div className="icon">
                      <FontAwesomeIcon
                        className="icon-item"
                        icon={faEnvelope}
                      />
                    </div>
                    <div className="input">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email"
                        onChange={(e) => setUserOnChange(e)}
                      />
                    </div>
                  </div>
                )}

                {signup && (
                  <div className="gender-container">
                    <div className="icon">
                      <FontAwesomeIcon
                        className="icon-item"
                        icon={faVenusMars}
                      />
                    </div>
                    <div className="gender">
                      <Dropdown
                        className="Dropdown"
                        name="gender"
                        options={["Male", "Female"]}
                        value={""}
                        placeholder="Select your gender"
                        onChange={(e) => setGenderOnChange(e)}
                      />
                    </div>
                  </div>
                )}

                <div className="username-container">
                  <div className="icon">
                    <FontAwesomeIcon className="icon-item" icon={faUser} />
                  </div>
                  <div className="input">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="username"
                      onChange={(e) => setUserOnChange(e)}
                    />
                  </div>
                </div>
                <div className="password-container">
                  <div className="icon">
                    <FontAwesomeIcon
                      className="icon-item"
                      icon={faUnlockKeyhole}
                    />
                  </div>
                  <div className="input">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="password"
                      onChange={(e) => setUserOnChange(e)}
                    />
                  </div>
                </div>
                {signup && (
                  <div className="choose-role">
                    <div className="choose-role-container">
                      <div className="label">Sign Up as admin </div>
                      <input
                        type="checkbox"
                        name="role"
                        id="role"
                        onChange={(e) =>
                          setUserOnChange(e.target.value ? "manager" : "fan")
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="footer">
              <div className="button-container">
                <button
                  onClick={() => {
                    {
                      !signup && loginOnClick();
                    }
                    {
                      signup && signupOnClick();
                    }
                  }}
                >
                  {signup ? "SignUp" : "Login"}
                </button>
              </div>
              <div className="change-mode" onClick={() => setSignup(!signup)}>
                {signup ? "Login" : "SignUp"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
