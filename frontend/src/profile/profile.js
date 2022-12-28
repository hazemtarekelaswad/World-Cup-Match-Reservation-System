import "./profile.css";
import Header from "../components/header/header";
import "../components/header/header.css";
import { useState, useEffect } from "react";
import tamema from "../imges/toy.png";
import DatePicker from "react-date-picker";
import Dropdown from "react-dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Profile() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // fan, admin, manager
  const [dateValue, onDateChange] = useState(new Date());
  const [profile, setProfile] = useState({});
  useEffect(() => {
    axios
      .get("https://qatar2022worldcupreservationsystem.onrender.com/users/me", {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        setProfile(res.data);
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

  const saveProfile = () => {
    // update using axios and token
    axios
      .put(
        "https://qatar2022worldcupreservationsystem.onrender.com/users/me",
        {
          firstName: "Ahmed", // FIXME: you should update the value from the input field
          lastName: "Yasser", // FIXME: you should update the value from the input field
          birthDate: "1999-09-20", // FIXME: you should update the value from the input field
          gender: "M", // FIXME: you should update the value from the input field (M or F)
          role: "fan",
          nationality: "Egyptian", //FIXME: you should update the value from the input field
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
                <div className="profile-field">
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="First name"
                    defaultValue={profile.firstName}
                    disabled={fname}
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
            <div className="profile-item">
              <div className="label">Last Name:</div>
              <div className="field-container">
                <div className="profile-field">
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Last name"
                    defaultValue={profile.lastName}
                    disabled={lname}
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

            <div className="profile-item">
              <div className="label">Gender:</div>
              <div className="field-container">
                <div className="profile-field">
                  {gender === true &&
                    (profile.gender === "F" ? "Female" : "Male")}
                  {gender === false && (
                    <Dropdown
                      className="Dropdown"
                      options={["Male", "Female"]}
                      value={profile.gender === "F" ? "Female" : "Male"}
                      placeholder="Select your gender"
                      disabled={gender}
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

            <div className="profile-item">
              <div className="label">Birth Date:</div>
              <div className="field-container">
                <div className="profile-field">
                  {birthDate === true && profile.birthdate}
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

            <div className="profile-item">
              <div className="label">Nationality:</div>
              <div className="field-container">
                <div className="profile-field">
                  <input
                    type="text"
                    name="nationality"
                    id="nationality"
                    placeholder="Nationality"
                    defaultValue={profile.nationality}
                    disabled={nationality}
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

            <div className="profile-item">
              <div className="label">Passowrd:</div>
              <div className="field-container">
                <div className="profile-field">
                  {password === true && profile.password}
                  {password === false && (
                    <input
                      type="passowrd"
                      name="password"
                      id="password"
                      placeholder="password"
                      defaultValue={profile.password}
                      disabled={password}
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
                  <div className="profile-field">
                    <input
                      type="passowrd"
                      name="password"
                      id="password"
                      placeholder="confirm password"
                      defaultValue={""}
                      disabled={password}
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
