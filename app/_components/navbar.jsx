"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import microsoft from "@/public/microsoft.png"
import search from "@/public/search.svg"
import { IoIosSearch } from "react-icons/io";
import { CiMobile3 } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { PiShootingStarThin } from "react-icons/pi";
const navbar = () => {
    const [dots,setDots]=useState(false);
    const [activeIndex,setActiveIndex]=useState(2);
    
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
        "Fire Information"
      ];

      
  return (
    <nav className='bg-white h-[114px] w-full'>
      <div className="container mx-auto flex justify-between pt-4 ">
        <div className='flex items-center gap-1'>
        <Image 
        src={microsoft}
        alt='LOGO'
        width={22}
        height={22}
        />
        <h1 className='text-lg text-gray-500 font-medium'>Microsoft Start</h1>
        </div>
        <div className='flex items-center w-[60%] shadow-md shadow-gray-400 
         rounded-2xl py-2 px-3'>
            <IoIosSearch className='text-3xl text-gray-500 cursor-pointer'/>
            <input type="text" className='w-full outline-none px-1' 
            placeholder='search the web'/>
            <div><Image
            src={search}
            alt='LOGO'
            width={30}
            height={30}
            /></div>
        </div>
        <div className=' flex justify-end items-center  gap-3'>
            <div>
            <CiMobile3 className='text-3xl cursor-pointer'/>
            </div>
            <div>
            <IoNotificationsOutline className='text-3xl cursor-pointer'/>
            </div>
            <div>
            <IoSettingsOutline className='text-3xl cursor-pointer'/>
            </div>
            <div>
                <button className='py-2 px-3 border border-gray-400 rounded-lg'>Sign In</button>
            </div>
        </div>
      </div>
      <div className='container mx-auto flex items-center justify-between px-2 pt-3'>
        <div className="w-[100%] flex gap-8 ">
            <div>
                <FaBars className='text-md cursor-pointer'/>
            </div>
            {Discover.map((x,i)=>{
                return(
                    <div key={i}>
                    <h1 className={`${activeIndex === i ? "font-bold" : ""} text-sm cursor-pointer`}
                    onClick={()=>setActiveIndex(i)}>
                        {x}
                    </h1>
                </div>
                )
            }) }
        </div>
        <div className='flex items-center gap-4 '>
            <div>
                <div className="relative">
                <BsThreeDots onClick={()=>setDots((value)=>!value)} className='cursor-pointer'/>
                <div className={`${dots ? "block" : "none"} absolute top-5 right-0 shadow-md shadow-gray-500
                px-3 py-2`}>
                    <ul>
                        <li>EarthQuakes</li>
                        <li>Air Quality</li>
                        <li>3D Maps</li>
                    </ul>
                </div>
                </div>
            </div>
            <div className=' flex items-center  h-full'>
                <div className='flex items-center gap-2 border border-black rounded-s-full rounded-e-full
                py-2 px-4  '>
               <PiShootingStarThin className='text-xl'/>
                    <h1 className='text-sm'>Personalize</h1>
                </div>
            </div>
        </div>
      </div>
    </nav>
  )
}

export default navbar
