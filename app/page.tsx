"use client"

import { useState, useEffect , useMemo} from "react";
import { Particles } from "@/components/ui/particles";
import { ShineBorder } from "@/components/ui/shine-border";
export default function Home() {
  // ===== CODING ROUND END TIME =====
  const CODING_HOURS = 6; // Changed to number
  const CODING_MINUTES = 30; // Changed to number
  const CODING_AM_PM: "AM" | "PM" = "PM"; // Explicitly typed
  const CODING_MONTH = 10;
  const CODING_DAY = 28;
  const CODING_YEAR = 2025;
  
  // ===== MENTORING ROUND START TIME =====
  const MENTORING_HOURS = 7; // Changed to number
  const MENTORING_MINUTES = 0; // Changed to number
  const MENTORING_AM_PM: "AM" | "PM" = "PM"; // Explicitly typed
  const MENTORING_MONTH = 10;
  const MENTORING_DAY = 28;
  const MENTORING_YEAR = 2025;
  
  // ===== TOGGLE NOTES SECTION =====
  const showNotes = true; // Set to false to hide notes and center timers
  // ===================================
  
  const convertTo24HourFormat = (hours: number, period: "AM" | "PM"): number => {
    if (period === "PM" && hours !== 12) return hours + 12;
    if (period === "AM" && hours === 12) return 0;
    return hours;
  };

  const codingEndTime = new Date(
    CODING_YEAR,
    CODING_MONTH - 1,
    CODING_DAY,
    convertTo24HourFormat(+CODING_HOURS, CODING_AM_PM),
    +CODING_MINUTES,
    0
  ).getTime();

  const mentoringStartTime = new Date(
    MENTORING_YEAR,
    MENTORING_MONTH - 1,
    MENTORING_DAY,
    convertTo24HourFormat(+MENTORING_HOURS, MENTORING_AM_PM),
    +MENTORING_MINUTES,
    0
  ).getTime();
  
  
  const [codingTime, setCodingTime] = useState({ hours: 0, minutes: 0, seconds: 0, isExpired: false });
  const [mentoringTime, setMentoringTime] = useState({ hours: 0, minutes: 0, seconds: 0, isExpired: false });
  
  // ===== NOTES CONFIGURATION =====
  const notes = [
    { id: 1, title: "SSID - 605-1", content: "Bruteforce@605-1" },
    { id: 2, title: "SSID - 605-2", content: "Bruteforce@605-2" },
  ];
  // ==============================

  useEffect(() => {
    const calculateTimeLeft = (targetTime: number, setTime: (time: { hours: number; minutes: number; seconds: number; isExpired: boolean }) => void) => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTime({ hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTime({ hours, minutes, seconds, isExpired: false });
    };

    const updateTimers = () => {
      calculateTimeLeft(codingEndTime, setCodingTime);
      calculateTimeLeft(mentoringStartTime, setMentoringTime);
    };

    updateTimers();
    const timer = setInterval(updateTimers, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black font-sans overflow-hidden">
      <Particles 
        className="absolute inset-0"
        quantity={500}
        staticity={50}
        ease={50}
        color="#ac9ef9"
        refresh={true} 
        vx={0.1}
        vy={0.9} 
      />
      
      <div className={`relative z-10 w-full h-screen p-8 flex items-center justify-center ${showNotes ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'flex items-center justify-center'}`}>
        {/* Timers Section */}
        <div className="flex flex-col gap-4 justify-center">
          {/* Top - Coding Round Timer */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl md:text-4xl font-bold text-white mb-4 text-center">
              CODING ROUND ENDS IN
            </div>
            {codingTime.isExpired ? (
              <div className="text-white text-4xl md:text-6xl font-bold">Time's Up!</div>
            ) : (
              <div>
                <div className="flex items-center justify-center gap-2">
                  <div className="text-6xl md:text-8xl font-bold text-[#ac9ef9] tabular-nums">
                    {formatTime(codingTime.hours)}
                  </div>
                  <div className="text-6xl md:text-8xl font-bold text-[#ac9ef9]">:</div>
                  <div className="text-6xl md:text-8xl font-bold text-[#ac9ef9] tabular-nums">
                    {formatTime(codingTime.minutes)}
                  </div>
                  <div className="text-6xl md:text-8xl font-bold text-[#ac9ef9]">:</div>
                  <div className="text-6xl md:text-8xl font-bold text-[#ac9ef9] tabular-nums">
                    {formatTime(codingTime.seconds)}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 mt-2 px-2">
                  <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                    HOURS
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                    MINUTES
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                    SECONDS
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Bottom - Mentoring Round Timer */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl md:text-4xl font-bold text-white mb-4 text-center mt-30">
              MENTORING ROUND 1 STARTS IN
            </div>
            {mentoringTime.isExpired ? (
              <div className="text-white text-4xl md:text-6xl font-bold">Started!</div>
            ) : (
              <div>
                <div className="flex items-center justify-center gap-2">
                  <div className="text-6xl md:text-8xl font-bold text-[#ac9ef9] tabular-nums">
                    {formatTime(mentoringTime.hours)}
                  </div>
                  <div className="text-6xl md:text-8xl font-bold text-[#ac9ef9]">:</div>
                  <div className="text-6xl md:text-8xl font-bold text-[#ac9ef9] tabular-nums">
                    {formatTime(mentoringTime.minutes)}
                  </div>
                  <div className="text-6xl md:text-8xl font-bold text-[#ac9ef9]">:</div>
                  <div className="text-6xl md:text-8xl font-bold text-[#ac9ef9] tabular-nums">
                    {formatTime(mentoringTime.seconds)}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 mt-2 px-2">
                  <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                    HOURS
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                    MINUTES
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                    SECONDS
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column - Notes Section */}
        {showNotes && (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="text-2xl md:text-4xl font-bold text-white mb-6">
              NOTES
            </div>
            <div className="flex flex-col gap-5">
              {notes.map((note) => (
                <div 
                  key={note.id} 
                  className="relative overflow-hidden bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-800 min-w-[280px]" // {/* <== ADD "overflow-hidden" HERE */}
                >
                 <ShineBorder
                 />
                  <h3 className="text-xl md:text-2xl font-bold text-[#ac9ef9] mb-3">
                    {note.title}
                  </h3>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}