import React, { useEffect, useState } from 'react'
import Search from "./assets/images/vector.png"
import cloud from "./assets/images/cloud.png"
import humidity from "./assets/images/humidity.png"
import wind from "./assets/images/wind.png"
import "./style.css"
import axios from 'axios';

function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: "Canada",
        humidity: 10,
        speed: 2
    })
    useEffect(() => {
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=mohali&appid=3db677f7a7bb7245ccd673d4112c6d1a&units=matric"
        axios.get(apiUrl)
            .then(res => {
                console.log(res.data)
                setData({ ...data, celcius: (res.data.main.temp - 273.15).toFixed(2), name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed })
            })
            .catch(err => console.log(err));
    }, [])
    return (
        <div className='container'>
            <div className='weather'>
                <div className='search'>
                    <input type="text" placeholder='Enter City Name' />
                    <button>
                        <img src={Search} alt="Search" />
                    </button>
                </div>
                <div className="weathrinfo">
                    <img className='icon' src={cloud} alt="cloud" />
                    <p>{data.celcius}°C</p>
                    <p>{data.name}</p>
                    <div className="details">
                        <div className="col">
                            <img className='humidity' src={humidity} alt="humidity" />
                            <div className='text-humidity' >
                                <p>{data.humidity}</p>
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