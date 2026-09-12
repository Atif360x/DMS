"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {

    setTime(new Date());

    
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);


    
    return () => clearInterval(timer);
  }, []);

  
  if (!time) {
    return <div className="bg-[#050D00] h-[100vh] w-[100vw]" />;
  }

  return (
      <div className="bg-[#050D00] h-[100vh] w-[100vw] text-green-200/80 flex justify-center items-center text-[50px] md:text-[200px]">
        <h1>{time.toLocaleTimeString('en-US', { hour12: false })}</h1> 
      </div>
  );
}
