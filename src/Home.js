import React, { useEffect, useState } from 'react'
import Search from "./assets/images/vector.png"
import cloud from "./assets/images/cloud.png"
import clouds from "./assets/images/clouds.png"
import humidity from "./assets/images/humidity.png"
import wind from "./assets/images/wind.png"
import clear from "./assets/images/01_sunny_color.png"
import mist from "./assets/images/mist.png"
import rain from "./assets/images/heavy-rain.png"
import drizzle from "./assets/images/drizzle.png"
import "./style.css"
import axios from 'axios';

function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: "Canada",
        humidity: 10,
        speed: 2,
        image: cloud
    })
    const [name, setName] = useState("")
    const [error, setError] = useState([]);
    // useEffect(() => {

    // }, [])
    const handleClick = () => {
        if (name !== "") {

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=3db677f7a7bb7245ccd673d4112c6d1a&units=matric`
            axios.get(apiUrl)
                .then(res => {
                    let imagePath = ""; // Default to cloud if no match is found
                    if (res.data.weather[0].main === "Clouds") {
                        imagePath = clouds;
                    } else if (res.data.weather[0].main === "Clear") {
                        imagePath = clear;
                    } else if (res.data.weather[0].main === "Rain") {
                        imagePath = rain;
                    } else if (res.data.weather[0].main === "Drizzle") {
                        imagePath = drizzle;
                    } else if (res.data.weather[0].main === "Mist") {
                        imagePath = mist;
                    } else if (res.data.weather[0].main === "Haze") {
                        imagePath = mist;
                    }

                    console.log(res.data)
                    setData({ ...data, celcius: (res.data.main.temp - 273.15).toFixed(2), name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagePath })
                    setError("");    })
             .catch(err => {
                if(err.response.status == 404){
                    setError("invalid city name")
                    }else{
                        setError("");
                    }

                    console.log(err);
               
            });
    } else {
       alert("Empty city name");
    }
};



    return (
        <div className='container'>
            <div className='weather'>
                <div className='search' >
                    <input type="text" placeholder='Enter City Name' value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    <button>
                        <img src={Search} onClick={handleClick} alt="Search" />
                    </button>
                </div>
                    <div className="error-show">
                        <p>{error}</p>
                    </div>
                <div className="weathrinfo">
                    <img className='icon' src={data.image} alt="cloud" style={{ height: "100px", width: "100px" }} />
                    <h1>{Math.round(data.celcius)}°C</h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                        <div className="col">
                            <img className='humidity' src={humidity} alt="humidity" />
                            <div className='text-humidity' >
                                <p>{Math.round(data.humidity)}</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className="col">
                            <img className='wind' src={wind} alt="wind" />
                            <div className=' text-wind'>
                                <p>{data.speed}km/h</p>
                                <p>Wind</p>
                            </div>
                            <h1></h1>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home