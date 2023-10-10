import React from 'react'
import Search from "./assets/images/vector.png"
import cloud from "./assets/images/cloud.png"
import humidity from "./assets/images/humidity.png"
import wind from "./assets/images/wind.png"
import "./style.css"
function Home() {
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
                    <p>32°C</p>
                    <p>London</p>
                    <div className="details">
                        <div className="col">
                            <img className='humidity' src={humidity} alt="humidity" />
                            <div className='text-humidity' >
                                <p>32°C</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className="col">
                            <img className='wind' src={wind} alt="wind" />
                            <div className=' text-wind'>
                                <p>2 lm/h</p>
                                <p>wind</p>
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