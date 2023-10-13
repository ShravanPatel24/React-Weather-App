import React, { useState, useEffect } from "react";
import Search from "../assets/images/vector.png";
import "./Weather.css";
import humidity from "../assets/images/humidity.png";
import wind from "../assets/images/wind.png";
import defaultWeather from "../assets/images/season.png";
import weatherCodes from "./WeatherCode";

const initialWeatherState = {
  celcius: "",
  name: "",
  humidity: "",
  speed: 0,
  image: defaultWeather,
  isDay: true,
  description: "",
  country: "IN",
};

function Weather() {
  // Set default data for the Weather component
  const [data, setData] = useState(initialWeatherState);
  // State to manage user input (city name)
  const [name, setName] = useState("");
  // State to manage error messages
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    };

    fetchData();
  }, []);

  //****  DEbounce ***8//
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchData = async () => {
    if (name !== "") {
      try {
        setIsLoading(true);
        const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`City not found: ${response.status}`);
        }

        const data = await response.json();
        const iconCode = data.weather[0].icon;
        let imagePath = defaultWeather;

        if (iconCode in weatherCodes) {
          imagePath = weatherCodes[iconCode];
        }

        // Create a new image element
        const img = new Image();

        // Set the onLoad event for the image
        img.onload = () => {
          // Once the image is loaded, update the state with the fetched data
          setData({
            celcius: data.main.temp.toFixed(2),
            name: data.name,
            humidity: data.main.humidity,
            speed: data.wind.speed,
            image: imagePath,
            description: data.weather[0].description,
            country: data.sys.country,
          });

          // Clear any previous errors
          setError("");

          // Set isLoading to false after both data and image have loaded
          setIsLoading(false);
        };

        // Set the source for the image
        img.src = imagePath;
      } catch (error) {
        if (error.message.includes("City not found")) {
          setError("Invalid City Name");
          setData(initialWeatherState);
          setIsLoading(false);
        } else {
          setError("");
          setIsLoading(false);
        }
      }
    } else {
      setData(initialWeatherState);
      setError("Enter Your City Name");
    }
  };

  // Debounce the fetchData function to avoid rapid API calls
  const handleClick = debounce(fetchData, 500);

  //  Event handler for input change
  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setName(inputText);
    if (inputText === "") {
      setError(""); // Clear the error message when input is empty
      setData(initialWeatherState); // Clear the data when input is empty
    }
  };

  // Event handler for Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="container">
      <div className="text-header">
        <h1 style={{ textAlign: "center" }}> Weather Application</h1>
      </div>
      <div className=" weather ">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            value={name}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button>
            <img src={Search} onClick={handleClick} alt="Search" />
          </button>
        </div>
        <div className="error-show">
          <p>{error}</p>
        </div>

        <div className="weather-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="weathr-info">
                <div className="weather-img">
                  <img className="icon" src={data.image} alt="icon" />
                </div>
                <div className="disc-text">
                  <p>{data.description}</p>
                </div>

                <div className="name-city">
                  <h2>{Math.round(data.celcius)}°C</h2>
                  <div className="name-countary">
                    <p>{data.name} </p>
                    <p>{`(${data.country})`}</p>
                  </div>
                </div>
              </div>
              <div className="details">
                <div className="col">
                  <img className="humidity" src={humidity} alt="humidity" />
                  <div className="text-humidity">
                    <p>{Math.round(data.humidity)}</p>
                    <p className="humidity-name">Humidity</p>
                  </div>
                </div>
                <div className="col">
                  <img className="wind" src={wind} alt="wind" />
                  <div className=" text-wind">
                    <p>{data.speed} km/h</p>
                    <p className="wind-name">Wind</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
