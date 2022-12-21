import "./profile.css";
import Header from "../components/header/header";
import '../components/header/header.css'
import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'

function Profile() {


    


  return (
    <div className="profile">
        <Header />
        <div className="profile_container">        
            <div className="profile_header">
                <h1>Edit Profile</h1>
            </div>

            <div className="profile-content">
                
            </div>

        </div>
        
        
    </div>
  );
}

export default Profile;
