import "./profile.css";
import Header from "../components/header/header";
import "../components/header/header.css";
import { useState, useEffect } from "react";
import tamema from "../imges/toy.png";
import DatePicker from "react-date-picker";
import Dropdown from "react-dropdown";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import {useNavigate} from 'react-router-dom';


function Profile() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // fan, admin, manager
  const [dateValue, onDateChange] = useState(new Date());
  const [profile, setProfile] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    nationality: "",
    password: "",
  });
  useEffect(() => {
    axios
      .get("https://qatar2022worldcupreservationsystem.onrender.com/users/me", {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        setProfile({
          email: res.data.email,
          username: res.data.username,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          gender: res.data.gender,
          birthDate: moment(res.data.birthDate).format("YYYY-MM-DD"),
          nationality: res.data.nationality,
          password: res.data.password ? res.data.password : "********", 
        });
        console.log(profile);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [fname, setFname] = useState(true);
  const [lname, setLname] = useState(true);
  const [gender, setGender] = useState(true);
  const [birthDate, setBirthDate] = useState(true);
  const [nationality, setNationality] = useState(true);
  const [password, setPassword] = useState(true);

  function setProfileOnChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    console.log(profile);
  }

  function setGenderOnChange(event) {
    setProfile({ ...profile, ["gender"]: event.value == "Male" ? "M" : "F" });
    console.log(profile);
  }


  const saveProfile = () => {
    // update using axios and token
    axios
      .put(
        "https://qatar2022worldcupreservationsystem.onrender.com/users/me",
        {
          firstName: profile.firstName, 
          lastName: profile.lastName, 
          birthDate: dateValue, 
          gender: profile.gender, 
          // role: "fan",
          nationality: profile.nationality, 
          // FIXME: add password
        },
        {
          headers: {
            token: token,
          },
        }
      )

      .then((res) => {
        setProfile(res.data);
        window.location.reload();
        console.log("Updated: ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="profile">
      <Header />
      <div className="profile_container">
        <div className="profile_header">
          <h1>Edit Profile</h1>
        </div>

        <div className="profile-content">
          <div className="content-wrapper">
            <div className="profile-item">
              <div className="label">Email:</div>
              <div className="field-container">
                <div className="profile-field">{profile.email}</div>
                <div className="edit-icon"></div>
              </div>
            </div>
            <div className="profile-item">
              <div className="label">Username:</div>
              <div className="field-container">
                <div className="profile-field">{profile.username}</div>
                <div className="edit-icon"></div>
              </div>
            </div>

            <div className="profile-item">
              <div className="label">First Name:</div>
              <div className="field-container">
                <div className={fname ? "profile-field" : "profile-field edit-clicked"}>
                  <input
                    type="text"
                    name="firstName"
                    id="firstname"
                    placeholder="First name"
                    defaultValue={profile.firstName}
                    disabled={fname}
                    onChange={setProfileOnChange}
                  />
                </div>
                <div className="edit-icon" onClick={() => setFname(false)}>
                  <FontAwesomeIcon
                    className="profile-icon"
                    icon={faPenToSquare}
                  />
                </div>
              </div>
            </div>
            <div className='profile-item'>
              <div className="label">Last Name:</div>
              <div className="field-container">
                <div className={lname ? "profile-field" : "profile-field edit-clicked"}>
                  <input
                    type="text"
                    name="lastName"
                    id="lastname"
                    placeholder="Last name"
                    defaultValue={profile.lastName}
                    disabled={lname}
                    onChange={setProfileOnChange}
                  />
                </div>
                <div className="edit-icon" onClick={() => setLname(false)}>
                  <FontAwesomeIcon
                    className="profile-icon"
                    icon={faPenToSquare}
                  />
                </div>
              </div>
            </div>

            <div className='profile-item'>
              <div className="label">Gender:</div>
              <div className="field-container">
                <div className={gender ? "profile-field" : "profile-field edit-clicked"}>
                  {gender === true &&
                    (profile.gender === "F" ? "Female" : "Male")}
                  {gender === false && (
                    <Dropdown
                      className="Dropdown"
                      options={["Male", "Female"]}
                      value={profile.gender === "F" ? "Female" : "Male"}
                      placeholder="Select your gender"
                      disabled={gender}
                      onChange={setGenderOnChange}
                    />
                  )}
                </div>
                <div className="edit-icon" onClick={() => setGender(false)}>
                  <FontAwesomeIcon
                    className="profile-icon"
                    icon={faPenToSquare}
                  />
                </div>
              </div>
            </div>

            <div className='profile-item'>
              <div className="label">Birth Date:</div>
              <div className="field-container">
                <div className={birthDate ? "profile-field" : "profile-field edit-clicked"}>
                  {birthDate === true && profile.birthDate}
                  {birthDate === false && (
                    <DatePicker
                      className="DatePicker"
                      onChange={onDateChange}
                      value={dateValue}
                      disabled={birthDate}
                    />
                  )}
                </div>
                <div className="edit-icon" onClick={() => setBirthDate(false)}>
                  <FontAwesomeIcon
                    className="profile-icon"
                    icon={faPenToSquare}
                  />
                </div>
              </div>
            </div>

            <div className='profile-item'>
              <div className="label">Nationality:</div>
              <div className="field-container">
                <div className={nationality ? "profile-field" : "profile-field edit-clicked"}>
                  <input
                    type="text"
                    name="nationality"
                    id="nationality"
                    placeholder="Nationality"
                    defaultValue={profile.nationality}
                    disabled={nationality}
                    onChange={setProfileOnChange}
                  />
                </div>
                <div
                  className="edit-icon"
                  onClick={() => setNationality(false)}
                >
                  <FontAwesomeIcon
                    className="profile-icon"
                    icon={faPenToSquare}
                  />
                </div>
              </div>
            </div>

            <div className='profile-item'>
              <div className="label">Passowrd:</div>
              <div className="field-container">
                <div className={password ? "profile-field" : "profile-field edit-clicked"}>
                  {password === true && profile.password}
                  {password === false && (
                    <input
                      type="passowrd"
                      name="password"
                      id="password"
                      placeholder="password"
                      defaultValue={profile.password}
                      disabled={password}
                      onChange={setProfileOnChange}
                    />
                  )}
                </div>
                <div className="edit-icon" onClick={() => setPassword(false)}>
                  <FontAwesomeIcon
                    className="profile-icon"
                    icon={faPenToSquare}
                  />
                </div>
              </div>
            </div>
            {password === false && (
              <div className="profile-item">
                <div className="label">Confirm passowrd:</div>
                <div className="field-container">
                  <div className={password ? "profile-field" : "profile-field edit-clicked"}>
                    <input
                      type="passowrd"
                      name="password"
                      id="password"
                      placeholder="confirm password"
                      defaultValue={""}
                      disabled={password}
                      onChange={setProfileOnChange}
                    />
                  </div>
                  <div className="edit-icon"></div>
                </div>
              </div>
            )}

            <div className="button-container" onClick={saveProfile}>
              <button> Save </button>
            </div>
          </div>

          {/* <div className="profile-img-container">
            <div className="profile-img">
               <img className="profile-icon-img" src={tamema} alt="tamema" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
