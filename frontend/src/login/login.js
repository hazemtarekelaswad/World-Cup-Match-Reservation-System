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
import { useSelector, useDispatch } from "react-redux";
import { SET_TOKEN } from "../store/actions";
import Message from "../errorMessage/errorMessage";

function Login({ signupParam }) {
  const [signup, setSignup] = useState(signupParam);
  const [dateValue, onDateChange] = useState(new Date());
  const getRole = (token) => {
    axios
      .get("https://qatar2022worldcupreservationsystem.onrender.com/users/me", {
        headers: {
          Token: token,
        },
      })
      .then((res) => {
        console.log("role_login: " + res.data.role);
        localStorage.setItem("role", res.data.role);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    nationality: "",
    email: "",
    role: "fan",
  });


  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");


  function setUserOnChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
    console.log(user);
  }

  function setGenderOnChange(event) {
    setUser({ ...user, ["gender"]: event.value == "Male" ? "M" : "F" });
  }

  function setRoleOnChange(event) {
    console.log(event);
    setUser({ ...user, ["role"]: event.target.checked ? "manager" : "fan" });
  }

  function signupOnClick() {

    if (user.password.length < 8) {
      setErrMsg("password must be at least 8 characters");
      setShow(true);
      return;
    }

    if (user.confirmPassword != user.password) {
      setErrMsg("passwords do not match");
      setShow(true);
      return;
    }

    setUser({
      ...user,
      ["birthDate"]: moment(dateValue).format("yyyy-MM-DD"),
    });
    console.log(user);
    axios
      .post(
        "https://qatar2022worldcupreservationsystem.onrender.com/users/signup",
        {
          username: user.username,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          birthDate: moment(dateValue).format("yyyy-MM-DD"),
          gender: user.gender,
          nationality: user.nationality || "",
          email: user.email,
          role: user.role,
        }
      )
      .then((res) => {
        console.log(res);
        setSignup(false);
      })
      .catch((err) => {
        console.log(err);

        setErrMsg(err.response.data.message);
        setShow(true);
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
        localStorage.setItem("token", res.data.token);
        getRole(res.data.token);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);

        setErrMsg(err.response.data.message);
        setShow(true);
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
                        name="firstName"
                        id="firstname"
                        placeholder="First name"
                        onChange={(e) => setUserOnChange(e)}
                      />
                    </div>
                    <div className="last-name">
                      <input
                        type="text"
                        name="lastName"
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
                {signup && <div className="password-container">
                  <div className="icon">
                    <FontAwesomeIcon
                      className="icon-item"
                      icon={faUnlockKeyhole}
                    />
                  </div>
                  <div className="input">
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={(e) => setUserOnChange(e)}
                    />
                  </div>
                </div>}
                {signup && (
                  <div className="choose-role">
                    <div className="choose-role-container">
                      <div className="label">Sign Up as manager </div>
                      <input
                        type="checkbox"
                        name="role"
                        id="role"
                        onChange={setRoleOnChange}
                      />
                    </div>
                  </div>
                )}
                {show && <Message color={"red"} message={errMsg} show={show} setShow={setShow} />}

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
