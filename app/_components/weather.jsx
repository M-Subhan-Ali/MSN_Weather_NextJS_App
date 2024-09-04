"use client";
import React, { useState } from "react";
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


const Weather_ForeCast = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(false);
  const [activeindexclose, setActiveIndexClose] = useState(false);
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
  console.log(weather)

  return (
    <main
      className="bg-gradient-to-b from-[#C4DCFF] via-[rgba(167,213,255,0.4)] to-transparent
    h-[100vh]"
    >
      <div className="container sub-main mx-auto ">
        <div className="h-[72px] flex py-4">
          <div className="flex gap-4 ">
            <form onSubmit={Handler_Submit}>
              <div className="flex items-center px-2 bg-white rounded-xl">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Search For Location"
                  className="outline-none py-2 px-3 rounded-xl text-gray-800"
                />
                <button type="submit">
                  <IoIosSearch className="text-2xl text-gray-500 font-medium cursor-pointer" />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-4 py-2 px-3 rounded-2xl bg-white">
              <h1 className="text-sm text-gray-700">{city}</h1>
              <Image src={cloudy} width={20} height={20} alt="weather clouds image" />
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
                  className={`${
                    activeIndex ? "block" : "none"
                  } absolute -left-[1170%] -bottom-14 flex items-center justify-center bg-white py-2 px-3 
    text-base w-[200px] rounded-lg`}
                >
                  <MdOutlineDeleteOutline className="text-2xl cursor-pointer" />
                  <div>
                    <h1 className="text-sm">Remove Location</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3">
            {weather && weather.timezone}
            <IoIosArrowDown />
            <div className=" bg-black rounded-full">
              <Image src={SemiHome} width={30} height={30} alt="current home" className="p-1" />
            </div>
          </div>

          <div
            className="relative flex items-center gap-2 bg-white 
            rounded-s-full rounded-e-full
                py-2 px-4  "
          >
            <div
              onMouseEnter={() => {
                setActiveIndexClose((value) => !value);
              }}
              className="flex gap-3"
            >
              <CiMobile3 className="text-xl" />
              <h1 className="text-sm font-semibold">Live Weather on Mobile</h1>
            </div>
            <div
              className={`${
                activeindexclose ? "block" : "none"
              } absolute -left-[140%] -bottom-[1050%] py-5 px-5 flex items-center
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
        <div className='grid grid-cols-2 pt-10 '> 
      <div className='px-5 py-3 rounded-2xl border border-gray-400'>
       <div className="flex justify-between py-3 ">
        <div>
            <h1 className='font-bold text-sm'>Current Weather</h1>
            <p className='text-sm'>6:48 PM</p>
        </div>
        <div className='flex items-center gap-3 py-2 px-3 rounded-s-full rounded-e-full
         bg-gray-300  text-blue-400 text-sm'>
            <FaMessage/> 
            <span>Seeing Differnt weather?</span>
        </div>
       </div>
       <div className="flex gap-5">
        <div className="flex gap-2">
        <Image src="/cloudy.svg"
        width={72}
        height={72}
        alt="clouds with current weather"
        />
        <div className="relative  text-7xl">
                  {weather && (weather.current.temp - 273.15).toFixed(0)}
                <div className="absolute -top-5 right-0 ">
                  <p className="text-3xl">∘</p>
                </div>
              </div>
        </div>
        <div className="text-lg font-bold">
          <h1>Smoke</h1>
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
        <p className="text-lg font-normal py-5">The skies will be mostly clear. The low will be 77°.</p>
       {/* {weather.current.map((x,i)=>{
        return(<div>
          {x}
        </div>)
       })} */}
       </div>
      </div>
      <div></div>
    </div>
      </div>
    </main>
  );
};

export default Weather_ForeCast;
