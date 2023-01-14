import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const url = `http://127.0.0.1:5001/`;
  const [interest, setInterest] = useState(null);
  const [response, setResponse] = useState(null);

  function callYourAPI(e) {
    let requestURL = url + e;

    axios.get(requestURL).then((res) => {
      // Handle Your response here.
      // Likely you may want to set some state
      setResponse(res);
    });
  }

  return (
    <div className="App">
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="takeOff"
      >
        q
      </button>
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="arm"
      >
        ,
      </button>
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="disArm"
      >
        .
      </button>
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="boxArm"
      >
        /
      </button>
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="land"
      >
        e
      </button>
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="increaseHeight"
      >
        w
      </button>
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="decreaseHeight"
      >
        s
      </button>
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="lowThrottle"
      >
        x
      </button>
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="leftYaw"
      >
        a
      </button>
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="rightYaw"
      >
        d
      </button>
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="forward"
      >
        j
      </button>
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="backward"
      >
        h
      </button>
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="right"
      >
        k
      </button>
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="left"
      >
        h
      </button>
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="backFlip"
      >
        b
      </button>
      <button
        onClick={(e) => callYourAPI(e.target.value)}
        className="searchbutton"
        value="reset"
      >
        r
      </button>
    </div>
  );
}

export default App;
