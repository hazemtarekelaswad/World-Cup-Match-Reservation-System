import "./profile.css";
import Header from "../components/header/header";
import "../components/header/header.css";
import { useState } from "react";
import tamema from "../imges/toy.png";
import DatePicker from "react-date-picker";
import Dropdown from "react-dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const [dateValue, onDateChange] = useState(new Date());

  const [profile, setProfile] = useState({
    email: "sadf@gmail.com",
    username: "yehuda",
    firstname: "Yehuda",
    lastname: "Katz",
    birthdate: "1990-01-01",
    nationality: "USA",
    gender: "F",
    password: "123456",
  });

  const [fname, setFname] = useState(true);
  const [lname, setLname] = useState(true);
  const [gender, setGender] = useState(true);
  const [birthDate, setBirthDate] = useState(true);
  const [nationality, setNationality] = useState(true);
  const [password, setPassword] = useState(true);

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
                    defaultValue={profile.firstname}
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
                    defaultValue={profile.lastname}
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

            <div className="button-container">
              <button> Save </button>
            </div>
          </div>

          <div className="profile-img-container">
            {/* FIXME: fix image size when window size is small */}
            <div className="profile-img">
              <img className="profile-icon-img" src={tamema} alt="tamema" />
              {/* <FontAwesomeIcon className='icon-img' icon={faUser} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

// <div className='login-wrapper'>
//                     <div className={'login-container signup-style'}>
//                         <div className='img-container'>
//                             <div className='img'>
//                                 <img className='icon-img' src={tamema} alt='tamema' />
//                                 {/* <FontAwesomeIcon className='icon-img' icon={faUser} /> */}
//                             </div>
//                         </div>
//                         <div className='form-container'>
//                             <div className='inputs-container'>
//                                 <div className='form-wrapper'>
//                                     <div className='Name-container'>
//                                         <div className='first-name'>
//                                             <input type='text' name='firstname' id='firstname' placeholder='First name' />
//                                         </div>
//                                         <div className='last-name'>
//                                             <input type='text' name='lastname' id='lastname' placeholder='Last name' />
//                                         </div>
//                                     </div>

//                                     <div className='birth-date-container'>
//                                         <div className='label'>Birth date: </div>
//                                         <DatePicker className="DatePicker" onChange={onDateChange} value={dateValue} />
//                                     </div>

//                                     {/* <div className='role'>
//                                         <Dropdown className="Dropdown" options={options} value={''} placeholder="Select your role" />
//                                     </div> */}

//                                     <div className='nationality-container'>
//                                         <div className='icon'>
//                                             <FontAwesomeIcon className='icon-item' icon={faEarthAfrica} />
//                                         </div>
//                                         <div className='input'>
//                                             <input type='text' name='nationality' id='nationality' placeholder='nationality' />
//                                         </div>
//                                     </div>

//                                     <div className='gender-container'>
//                                         <div className='icon'>
//                                             <FontAwesomeIcon className='icon-item' icon={faVenusMars} />
//                                         </div>
//                                         <div className='gender'>
//                                             <Dropdown className="Dropdown" options={['M', 'F']} value={''} placeholder="Select your gender" />
//                                         </div>
//                                     </div>

//                                     <div className='password-container'>
//                                         <div className='icon'>
//                                             <FontAwesomeIcon className='icon-item' icon={faUnlockKeyhole} />
//                                         </div>
//                                         <div className='input'>
//                                             <input type='password' name='password' id='password' placeholder='password' />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='footer'>
//                                 <div className='button-container'>
//                                     <button>Save</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </d
