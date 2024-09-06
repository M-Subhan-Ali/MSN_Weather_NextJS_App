"use client";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../page";   //usecontext provider
import axios from "axios";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import cloudy from "@/public/cloudy.svg";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import SemiHome from "@/public/homeseminav.svg";
import { CiMobile3 } from "react-icons/ci";
import entryDevice from "@/public/entry-device.gif";
import { IoClose } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { CiCircleInfo } from "react-icons/ci";
import { IoMdArrowDropleft } from "react-icons/io";
import { FaArrowDown } from "react-icons/fa";

const Weather_ForeCast = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(false);
  const [activeindexclose, setActiveIndexClose] = useState(false);
  const currentTime = weather?.current?.dt;
  const sunriseTime = weather?.current?.sunrise;
  const sunsetTime = weather?.current?.sunset;

  const {isDayTime,setIsDayTime}=useContext(ThemeContext);
  // const isDayTime = false
  // const isDayTime = currentTime >= sunriseTime && currentTime <= sunsetTime;

  const today = new Date();
  const day1 = new Date(today);
  const day2 = new Date(today);
  const day3 = new Date(today);
  const day4 = new Date(today);
  const day5 = new Date(today);

  day2.setDate(today.getDate() + 1);
  day3.setDate(today.getDate() + 2);
  day4.setDate(today.getDate() + 3);
  day5.setDate(today.getDate() + 4);
 
  let time_of_API = null;
  let percentageOfSunlightRemaining = null
  if(weather && weather.current){
 time_of_API=weather.current.dt*1000;

 const { sunrise, sunset, dt } = weather.current;

  // Convert to milliseconds
  const sunriseTime = sunrise * 1000;
  const sunsetTime = sunset * 1000;
  const currentTime = dt * 1000;

  // Calculate total daylight duration and elapsed time
  const totalDaylightDuration = sunsetTime - sunriseTime;
  const elapsedDaylight = currentTime - sunriseTime;

  // Calculate remaining daylight time
  const remainingDaylight = totalDaylightDuration - elapsedDaylight;

  // Calculate the percentage of sunlight remaining
  percentageOfSunlightRemaining = (remainingDaylight / totalDaylightDuration) * 100;
}

const formattedTime = time_of_API ? new Date(time_of_API).toLocaleString('en-US', { timeZone: weather.timezone }) : "Loading...";

  const information = [
    "Air quality",
    "Wind",
    "Humidity",
    "Visibility",
    "Pressure",
    "Dew point",
  ];
  const details_information = [
    {
      info: weather?.current?.clouds ?? "no data available",
    },
    {
      info:
        weather?.current?.wind_speed !== undefined &&
        weather.current.wind_speed !== null
          ? Math.ceil(weather.current.wind_speed) + " mph"
          : "no data available",
    },
    {
      info: weather?.current?.humidity + "%" ?? "no data available",
    },
    {
      info: weather?.current?.visibility
        ? (weather.current.visibility * 0.00062137).toFixed(1) + " mi"
        : "no data available",
    },
    {
      info: weather?.current?.pressure
        ? (weather.current.pressure / 33.864).toFixed(2) + " in"
        : "no data available",
    },
    {
      info: weather?.current?.dew_point
        ? weather.current.dew_point.toFixed(0) + "°"
        : "no data available",
    },
  ];

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY_PRIVATE;
  const GEO_BASE_URL = "https://api.openweathermap.org/geo/1.0/direct";
  const WEATHER_BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

  const City_Coordinates = async () => {
    try {
      const response = await axios.get(GEO_BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          limit: 1,
        },
      });

      if (response.data && response.data.length > 0) {
        const { lat, lon, name } = response.data[0];
        return { lat, lon, name };
      } else {
        throw new Error("Coordinates Not Found Latitude & Longitude ");
      }
    } catch (error) {
      setError("Failed on Fetching Coordinates");
      return null;
    }
  };

  const fetch_Weather = async (lat, lon, name) => {
    try {
      const response = await axios.get(WEATHER_BASE_URL, {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
          exclude: "minutely,hourly",
        },
      });
      return response.data;
    } catch (error) {
      setError("Error on Fetch Weather");
      return null;
    }
  };

  const Handle_Fetch_Weather = async () => {
    try {
      const coordinates = await City_Coordinates();
      if (coordinates) {
        const data = await fetch_Weather(
          coordinates.lat,
          coordinates.lon,
          coordinates.name
        );
        setWeather(data);
        setError(null);
        console.log(data.name);
      } else {
        setError("No data found for the specified city.");
        setWeather(null);
      }
    } catch (error) {
      setError("Failed to fetch weather data.");
      setWeather(null);
    }
  };

  const Handler_Submit = (e) => {
    e.preventDefault();
    Handle_Fetch_Weather();
  };
  console.log(weather);

  return (
    <main
      className={`${
        isDayTime
          ? "bg-gradient-to-b from-[#C4DCFF] via-[rgba(167,213,255,0.1)] to-transparent"
          : "bg-custom-gradient flex items-center justify-center"
      }  `}
    >
      <div className="container sub-main mx-auto ">
        <div className="h-[72px]  py-4 ">
          <div className="flex gap-4 ">
            <form onSubmit={Handler_Submit}>
              <div
                className={`${
                  isDayTime
                    ? " bg-white "
                    : " text-white backdrop-blur-3xl border border-gray-500 hover:border-gray-300"
                } flex items-center px-2 rounded-xl`}
              >
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Search For Location"
                  className={`${
                    isDayTime ? "text-gray-800" : "bg-transparent"
                  } outline-none py-2 px-3 rounded-xl`}
                />
                <button type="submit">
                  <IoIosSearch
                    className={`${
                      isDayTime
                        ? "text-2xl text-gray-500 font-medium cursor-pointer"
                        : "text-white"
                    }`}
                  />
                </button>
              </div>
            </form>

            <div
              className={`flex items-center gap-4 py-2 px-3 rounded-2xl ${
                isDayTime
                  ? " bg-white"
                  : "text-white backdrop-blur-3xl border border-gray-500 hover:border-gray-300 "
              } `}
            >
              <h1 className="text-sm ">{city}</h1>
              <Image
                src={cloudy}
                width={20}
                height={20}
                alt="weather clouds image"
              />
              <div className="relative text-sm">
                <span>
                  {weather && (weather.current.temp - 273.15).toFixed(2)}
                </span>
                <div className="absolute -top-1 -right-2 ">
                  <p>∘</p>
                </div>
              </div>
              <div className="relative">
                <BsThreeDots
                  onClick={() => setActiveIndex((value) => !value)}
                  className="rotate-90 cursor-pointer"
                />
                <div
                  className={`${activeIndex ? "block" : "none"} ${
                    isDayTime ? "bg-white " : "bg-gray-700"
                  }  absolute -left-[1170%] -bottom-14 flex items-center justify-center  py-2 px-3 
    text-base w-[200px] rounded-lg`}
                >
                  <MdOutlineDeleteOutline className="text-2xl cursor-pointer" />
                  <div>
                    <h1 onClick={()=>{setWeather(null),setCity(""),setActiveIndex(false)}}
                     className="text-sm cursor-pointer">Remove Location</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <div className={`flex items-center gap-3 ${isDayTime ? "text-black" : "text-white"}`}>
            {weather && weather.timezone}
            <IoIosArrowDown  />
            <div
              className={`${isDayTime ? " bg-black rounded-full" : "bg-gray-600 "} rounded-full`}
            >
              <Image
                src={SemiHome}
                width={30}
                height={30}
                alt="current home"
                className="p-1"
              />
            </div>
          </div>

          <div
            className={`${isDayTime ? "bg-white" : "bg-transparent border  border-gray-500 hover:border-gray-300"}  relative flex items-center gap-2 
            rounded-s-full rounded-e-full
                py-2 px-4  `}
          >
            <div
              onMouseEnter={() => {
                setActiveIndexClose((value) => !value);
              }}
              className={`flex gap-3 ${isDayTime ? "bg-white text-black" :"text-white  bg-transparent  "} `}
            
            >
              <CiMobile3 className="text-xl" />
              <h1 className="text-sm font-semibold">Live Weather on Mobile</h1>
            </div>
            <div
              className={`${
                activeindexclose ? "block" : "none"
              } absolute z-50 -left-[140%] -bottom-[1050%] py-5 px-5 flex items-center
                     bg-white `}
            >
              <div>
                <Image
                  src={entryDevice}
                  width={222}
                  height={222}
                  alt="gif entry mobile device "
                />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-semibold">Scan the QR code</h1>
                <p className="text-base text-center">
                  Enjoy real-time, hyperlocal and the most accurate forecast on
                  mobile
                </p>
                <Image src="/qr.png" width={190} height={190} alt="qr Code" />
              </div>
              <div className="absolute top-4 right-4">
                <IoClose
                  onClick={() => {
                    setActiveIndexClose((value) => !value);
                  }}
                  className="text-3xl cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 pt-10 ">
          <div className={`px-5 py-3 rounded-2xl ${isDayTime ? "bg-white" : "bg-transparent border  border-gray-500 hover:border-gray-300 text-white "} `}>
            <div className="flex justify-between py-3 ">
              <div>
                <h1 className="font-bold text-sm">Current Weather</h1>
                <p className="text-sm">{formattedTime}</p>
              </div>
              <div
                className={`flex items-center gap-3 py-2 px-3 rounded-s-full rounded-e-full
          text-blue-400 text-sm ${isDayTime ? "bg-gray-300 " : "bg-transparent border border-gray-300"} cursor-pointer`}
              >
                <FaMessage />
                <span>Seeing Differnt weather?</span>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <div className="flex gap-2">
                <Image
                  src={isDayTime ? "/mostlyclear.svg" : "/night.svg"}
                  width={72}
                  height={72}
                  alt="clouds with current weather"
                />
                <div className="relative  text-7xl">
                  {weather &&
                    (weather.current.temp -  273.15).toFixed(0)}
                  <div className="absolute -top-2 -right-3 ">
                    <p className="text-3xl">∘</p>
                  </div>
                  <div className="absolute top-1 -right-8 ">
                    <p className="text-4xl">C</p>
                  </div>
                </div>
              </div>
              <div className="text-lg font-bold">
                <h1>{weather && weather.current.weather[0].main}</h1>
                <div className="flex gap-5">
                  <div className="font-medium">
                    <p>Feels Like</p>
                  </div>
                  <div className="relative">
                    <p>88</p>
                    <div className="absolute -top-3 left-5 ">
                      <p className="text-lg font-medium">∘</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg font-normal py-5">
                {weather ? "" : "The skies will be mostly clear."}{" "}
                {weather && weather.current.weather[0].description}{" "}
                {weather && weather.current.temp.toFixed(0)}° on this day.
              </p>
            </div>
            <div className="grid grid-cols-6">
              {information.map((x, index) => {
                return (
                  <div key={index}>
                    <div className="flex items-center gap-1">
                      <h1 className="text-sm hover:underline cursor-pointer ">
                        {x}
                      </h1>
                      <div>
                        <CiCircleInfo />
                      </div>
                    </div>
                    <div>
                      {details_information[index]?.info ? (
                        <div className="flex items-center gap-1">
                          {index === 0 && (
                            <div>
                              <Image
                                src="/fullsun.svg"
                                width={10}
                                height={10}
                                alt="fullsun_image"
                              />
                            </div>
                          )}
                          {details_information[index].info}
                          {index === 1 && (
                            <div>
                              <IoMdArrowDropleft />
                            </div>
                          )}
                        </div>
                      ) : (
                        "no data available"
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d64851140.25901139!2d-61.87783357081126!3d7.218073109762744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46ed8886cfadda85%3A0x72ef99e6b3fcf079!2sEurope!5e0!3m2!1sen!2s!4v1725534144894!5m2!1sen!2s"
                style={{
                  position: "",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
                className="rounded-2xl"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57173176.00670384!2d99.99999999999999!3d29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3663f18a24cbe857%3A0xa9416bfcd3a0f459!2sAsia!5e0!3m2!1sen!2s!4v1725534256722!5m2!1sen!2s"
                style={{ width: "100%", height: "100%" }}
                className="rounded-2xl invert"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div
          className={`flex justify-between items-center w-[75%] text-base font-semibold
        py-8 ${isDayTime ? "text-black" : "text-white"}`}
        >
          <div>
            <h1>4 Days Forecast</h1>
          </div>
          <div className={`flex items-center gap-1 ${isDayTime ?  "text-gray-600" : "text-gray-200 border border-gray-300 py-2 px-4 rounded-e-full rounded-s-full"}`}>
            <h1>see Monthly</h1>
            <FaArrowDown />
          </div>
        </div>
        <div className="w-[75%]">
          <div className="flex gap-3">
            <div className={`w-[320px] ${isDayTime ? "bg-white" : "bg-transparent border border-gray-300 rounded-2xl text-white"}`}>
              <div className="grid grid-cols-2 justify-between items-center py-2 px-3 rounded-2xl">
                <div className="text-base font-semibold">
                  <div>
                    <h1>{isDayTime ? "Today" : "Tonight"}</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <Image
                        src={isDayTime ? "/mostlyclear.svg" : "/cloudy.svg"}
                        height={40}
                        width={40}
                        alt="weather "
                      />
                    </div>
                    <div className="grid gap-2">
                      <div>
                        <h1>
                          {" "}
                          {weather &&
                            (
                              ((weather.current.temp - 273.15) * 9) / 5 +
                              32
                            ).toFixed(0)}
                          °
                        </h1>
                      </div>
                      <div>
                        <h1 className="font-medium">
                          {weather &&
                            (
                              ((weather.current.dew_point - 273.15) * 9) / 5 +
                              32
                            ).toFixed(0)}{" "}
                          °
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="font-light grid gap-2">
                  <h1>{weather ? weather.current.weather[0].description : "Mostly sunny"}</h1>
                  <h1>{weather ? (percentageOfSunlightRemaining).toFixed(0) + "%" : "Loading"}</h1>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-4 gap-3 ">
              <div
                className={`grid justify-center items-center  
            px-3 py-1 rounded-2xl ${isDayTime ? "bg-white" : "bg-transparent border border-gray-300 rounded-2xl text-white"}`}
              >
                <div className="text-xs">
                  <h1>
                    {day2.toLocaleDateString("en-US", { weekday: "short" })}{" "}
                    {day2.getDate()}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <Image
                      src="/mostlyclear.svg"
                      height={40}
                      width={40}
                      alt="weather "
                    />
                  </div>
                  <div className="grid gap-2">
                    <div>
                      <h1>
                        {" "}
                        {weather &&
                          (
                            ((weather.current.temp - 273.15) * 9) / 5 +
                            32 +
                            1
                          ).toFixed(0)}
                        °
                      </h1>
                    </div>
                    <div>
                      <h1 className="font-medium">
                        {weather &&
                          (
                            ((weather.current.dew_point - 273.15) * 9) / 5 +
                            32 +
                            1
                          ).toFixed(0)}{" "}
                        °
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`grid justify-center items-center  
            px-3 py-1 rounded-2xl  ${isDayTime ? "bg-white" : "bg-transparent border border-gray-300 rounded-2xl text-white"}`}
              >
                <div className="text-xs">
                  <h1>
                    {day3.toLocaleDateString("en-US", { weekday: "short" })}{" "}
                    {day3.getDate()}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <Image
                      src="/cloudy.svg"
                      height={40}
                      width={40}
                      alt="weather "
                    />
                  </div>
                  <div className="grid gap-2">
                    <div>
                      <h1>
                        {" "}
                        {weather &&
                          (
                            ((weather.current.temp - 273.15) * 9) / 5 +
                            32 +
                            2
                          ).toFixed(0)}
                        °
                      </h1>
                    </div>
                    <div>
                      <h1 className="font-medium">
                        {weather &&
                          (
                            ((weather.current.dew_point - 273.15) * 9) / 5 +
                            32 +
                            2
                          ).toFixed(0)}{" "}
                        °
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`grid justify-center items-center 
            px-3 py-1 rounded-2xl ${isDayTime ? "bg-white": "bg-transparent border border-gray-300 rounded-2xl text-white"}`}
              >
                <div className="text-xs">
                  <h1>
                    {day4.toLocaleDateString("en-US", { weekday: "short" })}{" "}
                    {day4.getDate()}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <Image
                      src="/fullsun.svg"
                      height={40}
                      width={40}
                      alt="weather "
                    />
                  </div>
                  <div className="grid gap-2">
                    <div>
                      <h1>
                        {" "}
                        {weather &&
                          (
                            ((weather.current.temp - 273.15) * 9) / 5 +
                            32 +
                            3
                          ).toFixed(0)}
                        °
                      </h1>
                    </div>
                    <div>
                      <h1 className="font-medium">
                        {weather &&
                          (
                            ((weather.current.dew_point - 273.15) * 9) / 5 +
                            32 +
                            3
                          ).toFixed(0)}{" "}
                        °
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`grid justify-center items-center  
            px-3 py-1 rounded-2xl ${isDayTime ? "bg-white" : "bg-transparent border border-gray-300 rounded-2xl text-white"}`}
              >
                <div className="text-xs">
                  <h1>
                    {day5.toLocaleDateString("en-US", { weekday: "short" })}{" "}
                    {day5.getDate()}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <Image
                      src="/mostlyclear.svg"
                      height={40}
                      width={40}
                      alt="weather "
                    />
                  </div>
                  <div className="grid gap-2">
                    <div>
                      <h1>
                        {" "}
                        {weather &&
                          (
                            ((weather.current.temp - 273.15) * 9) / 5 +
                            32 +
                            4
                          ).toFixed(0)}
                        °
                      </h1>
                    </div>
                    <div>
                      <h1 className="font-medium">
                        {weather &&
                          (
                            ((weather.current.dew_point - 273.15) * 9) / 5 +
                            32 +
                            4
                          ).toFixed(0)}{" "}
                        °
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Weather_ForeCast;
