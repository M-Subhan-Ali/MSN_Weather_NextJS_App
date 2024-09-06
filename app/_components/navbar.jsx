"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import microsoft from "@/public/microsoft.png";
import search from "@/public/search.svg";
import { IoIosSearch } from "react-icons/io";
import { CiMobile3 } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { PiShootingStarThin } from "react-icons/pi";
import { ThemeContext } from "../page"; //use Context Hook Provider Use here
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";

const Navbar = () => {
  const [dots, setDots] = useState(false);
  const [activeIndex, setActiveIndex] = useState(2);
  const { isDayTime, setIsDayTime } = useContext(ThemeContext);

  const Discover = [
    "Discover",
    "Following",
    "Weather",
    "Maps",
    "Hourly",
    "Monthly",
    "Trends",
    "Severe Weather",
    "Hurricanes",
    "Pollen",
    "Fire Information",
  ];

  return (
    <nav className="bg-white h-[120px] mx-auto w-full ">
      <div className="px-2 lg:px-5 md:px-3 xl:px-10 2xl:px-20 mx-auto flex justify-between items-center pt-4 ">
        <div className="flex items-center gap-1">
          <Image src={microsoft} alt="LOGO" width={22} height={22} />
          <h1 className="text-lg text-gray-500 font-medium">Microsoft Start</h1>
        </div>

        <div className="hidden md:flex justify-center  lg:w-[50%] xl:w-[60%] ">
          <div
            className="flex items-center w-full  h-auto shadow-md shadow-gray-400 
          rounded-2xl py-2 px-3"
          >
            <IoIosSearch className="text-3xl text-gray-500 cursor-pointer" />
            <input
              type="text"
              className="w-full outline-none px-1"
              placeholder="search the web"
            />
            <div>
              <Image src={search} alt="LOGO" width={30} height={30} />
            </div>
          </div>
        </div>
        <div className=" flex justify-end items-center  gap-3">
          <div className="text-xl  md:text-3xl cursor-pointer">
            {isDayTime ? (
              <MdOutlineWbSunny
                className={`  text-black rounded-full
             `}
                onClick={() => setIsDayTime((value) => !value)}
              />
            ) : (
              <MdOutlineDarkMode
                className={` bg-black text-white rounded-full
             `}
                onClick={() => setIsDayTime((value) => !value)}
              />
            )}
          </div>
          <div>
            <CiMobile3 className="text-xl  md:text-3xl  cursor-pointer" />
          </div>
          <div>
            <IoNotificationsOutline className="text-xl  md:text-3xl  cursor-pointer" />
          </div>
          <div>
            <IoSettingsOutline className="text-xl  md:text-3xl  cursor-pointer" />
          </div>
          <div>
            <button className="py-2 px-3 border text-sm  md:text-base  border-gray-400 rounded-lg">
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto hidden lg:flex items-center justify-between pt-3">
        <div className="w-[100%] px-5 flex lg:gap-2 xl:gap-8 ">
          <div>
            <FaBars className="text-md cursor-pointer" />
          </div>
          {Discover.map((x, i) => {
            return (
              <div key={i}>
                <h1
                  className={`${
                    activeIndex === i ? "font-bold" : ""
                  } text-xs lg:text-sm cursor-pointer`}
                  onClick={() => setActiveIndex(i)}
                >
                  {x}
                </h1>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 ">
          <div>
            <div className="relative">
              <BsThreeDots
                onClick={() => setDots((value) => !value)}
                className="cursor-pointer"
              />
              <div
                className={`${dots ? "block" : "none"} ${
                  isDayTime ? "text-black" : "text-white"
                } absolute top-5 right-0 shadow-md shadow-gray-500
                px-3 py-2`}
              >
                <ul>
                  <li>EarthQuakes</li>
                  <li>Air Quality</li>
                  <li>3D Maps</li>
                </ul>
              </div>
            </div>
          </div>
          <div className=" flex items-center  h-full">
            <div
              className="flex items-center gap-2 border border-black rounded-s-full rounded-e-full
                py-2 px-4  "
            >
              <PiShootingStarThin className="text-xl" />
              <h1 className="text-sm">Personalize</h1>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
