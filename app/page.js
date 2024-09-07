"use client";
import Weather from "@/app/_components/weather";
import Navbar from "./_components/navbar";
import { createContext, useState } from "react";

export const ThemeContext = createContext();
export default function Home() {
  const [isDayTime, setIsDayTime] = useState(false);
  return (
    <ThemeContext.Provider value={{ isDayTime, setIsDayTime }}>
      <div className="w-full h-full">
        <Navbar />
        <Weather />
      </div>
    </ThemeContext.Provider>
  );
}
