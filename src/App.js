import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import takeOffButton from "./Assets/Images/take_off_cropped.png";
import armButton from "./Assets/Images/arm_cropped.png";
import trapezium from "./Assets/Images/trapezium.png";
import aButton from "./Assets/Images/a.png";
import dButton from "./Assets/Images/d.png";
import sButton from "./Assets/Images/s.png";
import wButton1 from "./Assets/Images/w_new.png";
import leftButton from "./Assets/Images/left.png";
import downButton from "./Assets/Images/down.png";
import rightButton from "./Assets/Images/right.png";
import upButton from "./Assets/Images/up.png";
import wasd from "./Assets/Images/wasd.png";
import UpRightDownLeft from "./Assets/Images/UpRightDownLeft.png";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  // CHART STATES AND FUNCTIONS

  // CONTROLLER
  const url = `http://127.0.0.1:5001/`;
  const [interest, setInterest] = useState(null);
  const [response, setResponse] = useState(null);
  const [time, setTime] = useState(new Date());
  const [throttle, setThrottle] = useState("-1");
  const [roll, setRoll] = useState("-1");
  const [pitch, setPitch] = useState("-1");
  const [yaw, setYaw] = useState("-1");

  const callYourAPI = (e) => {
    let requestURL = url + "controller/" + e;

    axios.get(requestURL).then((res) => {
      setResponse(res);
    });
  };

  const droneParameterAPI = () => {
    let requestURL = url + "drone_param";

    axios.get(requestURL).then((res) => {
      console.log(res);
      let resData = res.data;
      setThrottle((prev) => resData["rcThrottle"]);
      setRoll((prev) => resData["Roll"]);
      setPitch((prev) => resData["Pitch"]);
      setYaw((prev) => resData["Yaw"]);
      // setResponse(res);
    });
  };

  // TEST
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgb(233, 137, 175)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgb(25, 252, 253)",
      },
    ],
  };

  useEffect(() => {
    document.body.addEventListener("keydown", function (event) {
      if (event.keyCode == 87) callYourAPI("increaseHeight");
      else if (event.keyCode == 65) callYourAPI("leftYaw");
      else if (event.keyCode == 83) callYourAPI("decreaseHeight");
      else if (event.keyCode == 68) callYourAPI("rightYaw");
      else if (event.keyCode == 38) callYourAPI("forward");
      else if (event.keyCode == 37) callYourAPI("left");
      else if (event.keyCode == 40) callYourAPI("backward");
      else if (event.keyCode == 39) callYourAPI("right");
      else if (event.keyCode == 81) callYourAPI("takeOff");
      else if (event.keyCode == 188) callYourAPI("arm");
    });

    const interval = setInterval(() => {
      // console.log({ time });
      droneParameterAPI();
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App text-white flex">
      <div className="h-screen w-[50vw] mx-auto bg-[url('./Assets/Images/background.png')] bg-top bg-cover">
        <div className="grid grid-rows-1 grid-flow-col h-1/10 bg-[url('./Assets/Images/black_rectangle.png')] border-b-2 border-white">
          <div className="flex justify-evenly items-center">
            <div className="w-[20%] font-bold text-2xl">
              {/* DRONE NAME: */}
            </div>
            <div className="w-[55%] flex justify-center relative top-[10%] w-[55vw] max-w-lg">
              <div>
                <img src={trapezium} alt="trapezium background" />
              </div>
              <div className="absolute flex items-center h-full font-bold text-3xl">
                CONNECTED
              </div>
            </div>
            <div className="w-[20%] font-bold text-2xl">
              {/* CONNECTION STRENGTH:{" "} */}
            </div>
          </div>
        </div>
        <div className="grid grid-rows-1 grid-flow-col h-7/10">
          <div className="flex justify-evenly">
            <div className="flex justify-center flex-col max-w-[40%]">
              <div className="relative">
                <img src={wasd} alt="wasd" />
                <button
                  value="increaseHeight"
                  onClick={(e) => callYourAPI(e.target.value)}
                  className="w-[23.4375%] h-[23.4375%] absolute left-[38.2%] top-[18.4%] rounded-full border border-white bg-red-500 opacity-0"
                >
                  {/* <div className="w-12 h-12 rounded-full border border-white bg-red-500"> */}
                  w{/* </div> */}
                </button>
                <button
                  value="leftYaw"
                  onClick={(e) => callYourAPI(e.target.value)}
                  className="w-[23.4375%] h-[23.4375%] absolute left-[58.4%] top-[38.3%] rounded-full border border-white bg-red-500 opacity-0"
                >
                  {/* <div className="w-12 h-12 rounded-full border border-white bg-red-500"> */}
                  a{/* </div> */}
                </button>
                <button
                  value="decreaseHeight"
                  onClick={(e) => callYourAPI(e.target.value)}
                  className="w-[23.4375%] h-[23.4375%] absolute left-[38.2%] top-[58.2%] rounded-full border border-white bg-red-500 opacity-0"
                >
                  {/* <div className="w-12 h-12 rounded-full border border-white bg-red-500"> */}
                  s{/* </div> */}
                </button>
                <button
                  value="rightYaw"
                  onClick={(e) => callYourAPI(e.target.value)}
                  className="w-[23.4375%] h-[23.4375%] absolute left-[18.2%] top-[38.3%] rounded-full border border-white bg-red-500 opacity-0"
                >
                  {/* <div className="w-12 h-12 rounded-full border border-white bg-red-500"> */}
                  d{/* </div> */}
                </button>
              </div>
            </div>
            <div className="flex justify-around flex-col max-w-[20%] w-[20%]">
              <div className="grid grid-rows-1 grid-flow-col border-2 border-dashed rounded-lg">
                <div className="flex flex-col ">
                  <div className="drop-shadow-xl h-10 w-9/10 my-2 mx-auto rounded bg-[#545454] border border-white">
                    {throttle}
                  </div>
                  <div className="text-2xl">THROTTLE</div>
                </div>
              </div>
              <div className="grid grid-rows-1 grid-flow-col border-2 border-dashed rounded-lg">
                <div className="flex flex-col ">
                  <div className="drop-shadow-xl h-10 w-9/10 my-2 mx-auto rounded bg-[#545454] border border-white">
                    {roll}
                  </div>
                  <div className="text-2xl">ROLL</div>
                </div>
              </div>
              <div className="grid grid-rows-1 grid-flow-col border-2 border-dashed rounded-lg">
                <div className="flex flex-col ">
                  <div className="drop-shadow-xl h-10 w-9/10 my-2 mx-auto rounded bg-[#545454] border border-white">
                    {pitch}
                  </div>
                  <div className="text-2xl">PITCH</div>
                </div>
              </div>
              <div className="grid grid-rows-1 grid-flow-col border-2 border-dashed rounded-lg">
                <div className="flex flex-col ">
                  <div className="drop-shadow-xl h-10 w-9/10 my-2 mx-auto rounded bg-[#545454] border border-white">
                    {yaw}
                  </div>
                  <div className="text-2xl">YAW</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center flex-col max-w-[40%]">
              <div className="relative">
                <img src={UpRightDownLeft} alt="Up Right Down Left Button" />
                <button
                  value="forward"
                  onClick={(e) => callYourAPI(e.target.value)}
                  className="w-[23.4375%] h-[23.4375%] absolute left-[38.2%] top-[18.4%] rounded-full border border-white bg-red-500 opacity-0"
                >
                  {/* <div className="w-12 h-12 rounded-full border border-white bg-red-500"> */}
                  ⬆️{/* </div> */}
                </button>
                <button
                  value="right"
                  onClick={(e) => callYourAPI(e.target.value)}
                  className="w-[23.4375%] h-[23.4375%] absolute left-[58.4%] top-[38.3%] rounded-full border border-white bg-red-500 opacity-0"
                >
                  {/* <div className="w-12 h-12 rounded-full border border-white bg-red-500"> */}
                  ➡️{/* </div> */}
                </button>
                <button
                  value="backward"
                  onClick={(e) => callYourAPI(e.target.value)}
                  className="w-[23.4375%] h-[23.4375%] absolute left-[38.2%] top-[58.2%] rounded-full border border-white bg-red-500 opacity-0"
                >
                  {/* <div className="w-12 h-12 rounded-full border border-white bg-red-500"> */}
                  ⬇️{/* </div> */}
                </button>
                <button
                  value="left"
                  onClick={(e) => callYourAPI(e.target.value)}
                  className="w-[23.4375%] h-[23.4375%] absolute left-[18.2%] top-[38.3%] rounded-full border border-white bg-red-500 opacity-0"
                >
                  {/* <div className="w-12 h-12 rounded-full border border-white bg-red-500"> */}
                  ⬅️{/* </div> */}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-flow-col grid-col-2 h-1/5">
          <div className="flex h-8/10">
            {/* <div className="w-4/12 flex justify-around items-center relative">
              <div className="h-4/5 relatve">
                <button
                  value="takeOff"
                  onClick={(e) => callYourAPI(e.target.value)}
                  className="absolute w-full h-full left-0"
                ></button>
                <img
                  className="mx-auto h-full"
                  src={takeOffButton}
                  alt="takeOffButton"
                />
              </div>
            </div> */}

            <div className="w-4/12 flex justify-around items-center relative">
              <div className="h-4/5 relative">
                <button
                  value="arm"
                  onClick={(e) => callYourAPI(e.target.value)}
                  className="absolute w-full h-full left-0 "
                ></button>
                <img
                  className="mx-auto h-full"
                  src={takeOffButton}
                  alt="armButton"
                />
              </div>
            </div>

            <div className="w-4/12"></div>
            <div className="w-4/12 flex justify-around items-center relative">
              <div className="h-4/5 relative">
                <button
                  value="arm"
                  onClick={(e) => callYourAPI(e.target.value)}
                  className="absolute w-full h-full left-0 "
                ></button>
                <img
                  className="mx-auto h-full"
                  src={armButton}
                  alt="armButton"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen w-[50vw] mx-auto bg-[url('./Assets/Images/graph_bg.png')] bg-top bg-cover">
        <div className="flex flex-col justify-around h-full items-center">
          <div className="grid grid-rows-1 grid-flow-col h-[40vh] w-[90%] bg-[url('./Assets/Images/black_rectangle.png')] border-b-2 border-white">
            <div className="flex justify-evenly items-center">
              <div className="w-[45%] font-bold text-2xl h-full flex items-center">
                {/* <div>CONTAINER FOR SCALES AND CHART NAME</div> */}
                <div className="border border-white h-[95%] w-full">
                  {/* DRONE NAME: */}
                  {/* <Line data={data1} /> */}
                </div>
              </div>
              <div className="w-[45%] font-bold text-2xl h-full flex items-center">
                {/* <div>CONTAINER FOR SCALES AND CHART NAME</div> */}
                <div className="border border-white h-[95%] w-full">
                  CONNECTION STRENGTH:
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-1 grid-flow-col h-[40vh] w-[90%] bg-[url('./Assets/Images/black_rectangle.png')] border-b-2 border-white">
            <div className="flex justify-evenly items-center">
              <div className="w-[20%] font-bold text-2xl">DRONE NAME:</div>
              <div className="w-[20%] font-bold text-2xl">
                CONNECTION STRENGTH:{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <Line options={options} data={data} />
        <Line data={data} />
      </div> */}
    </div>
  );
}

export default App;
