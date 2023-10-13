// weatherCodes.js

import FewClouds from "../assets/images/fewClouds.png";
import ScatteredClouds from "../assets/images/clouds.png";
import BrokenClouds from "../assets/images/BrokenClouds.png";
import HeavyRain from "../assets/images/heavy-rain.png";
import ShowerRain from "../assets/images/ShowerRain.png";
import ThunderStorm from "../assets/images/thunderstorm.png";
import Snow from "../assets/images/snow.png";
import mist from "../assets/images/mist.png";
import clear from "../assets/images/sun.png";
import moon from "../assets/images/moon.png";
import fewCloudsNight from "../assets/images/fewCloudsNight.png";
import ScatteredCloudsNight from "../assets/images/ScatteredCloudsNight.png";
import borkenCloudsNight from "../assets/images/borkenCloudsNight.png";

const weatherCodes = {
  "01d": clear, // clear sky (day)
  "02d": FewClouds, // few clouds (day)
  "03d": ScatteredClouds, // scattered clouds (day)
  "04d": BrokenClouds, // broken clouds (day)
  "09d": ShowerRain, // shower rain (day)
  "10d": HeavyRain, // rain (day)
  "11d": ThunderStorm, // thunderstorm (day)
  "13d": Snow, // snow (day)
  "50d": mist, // mist (day)
  "01n": moon, // clear sky (night)
  "02n": fewCloudsNight, // few clouds (night)
  "03n": ScatteredCloudsNight, // scattered clouds (night)
  "04n": borkenCloudsNight, // broken clouds (night)
  "09n": ShowerRain, // shower rain (night)
  "10n": HeavyRain, // rain (night)
  "11n": ThunderStorm, // thunderstorm (night)
  "13n": Snow, // snow (night)
  "50n": mist, // mist (night)
};

export default weatherCodes;
