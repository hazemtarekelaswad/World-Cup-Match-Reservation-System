import React from "react";
//use params to get the id from the url
import { useParams } from "react-router-dom";

//useState to set the tickets
import { useState, useEffect } from "react";

function Tickets({ matchID }) {
  const match_id = useParams().id;
  return <div>tickets {match_id}</div>;
}

export default Tickets;
