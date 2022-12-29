import { useState, useEffect } from "react";
import "./errorMessage.css";

function errorMessage({message, color, show, setShow}) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

    setTimeout(() => {
      setShow(false);
    }, 5000);

  return (
    <div className="error-message-wrapper">
        <div className="error-message">
            {/* <div className="close-button">
                <button onClick={() => setShow(false)}>X</button>
            </div> */}
            <div style={{color: color}} className="message">
                {message}
            </div>
        </div>
    </div>
  );
}

export default errorMessage;
