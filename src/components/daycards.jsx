import React from "react";
import { useNavigate } from "react-router-dom";
import dinnerImg from "../assets/images/dinner.png";
import hunterImg from "../assets/images/hunter.png";
import conferenceImg from "../assets/images/conference.png";
import chimpanzeeImg from "../assets/images/chimpanzee.png";
import HoverOrTouchHandler from "./hoverortouchhandler";
import { useSchedule } from "../components/schedulecontext";
import { useConferenceScroll } from "./conferencescrollcontext";

const Card = ({ baseImg, hoverImg, title, date, onClick }) => (
  <div onClick={onClick} className="cursor-pointer">
    <HoverOrTouchHandler
      className="relative w-78 h-78 overflow-hidden rounded-lg shadow-lg shadow-black/40 cursor-pointer"
      onClick={onClick}
    >
      {(isHovered) => (
        <>
          <img
            src={baseImg}
            alt={title}
            className={`w-full h-full object-cover transition duration-300 ease-in-out ${
              isHovered ? "brightness-25 blur-[1px]" : "brightness-100"
            }`}
          />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-outline-black text-white text-center text-xl md:text-[20px] font-bold drop-shadow-lg">
            {title}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center text-lg md:text-xl">
            {date}
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center z-10 transition duration-300 ease-in-out ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={hoverImg}
              alt="hover"
              className="w-60 h-60 object-contain"
            />
          </div>
        </>
      )}
    </HoverOrTouchHandler>
  </div>
);

export default function DayCards() {
  const navigate = useNavigate();
  const { setSelectedDay } = useSchedule();
  const {
    setTriggerConferenceScroll,
    setConferenceRedirected,
    setSelectedDay: setConfDay,
  } = useConferenceScroll();

  const goToDay = (day) => {
    setSelectedDay(day);
    if (day === "conference") {
      setConfDay(day);
      setTriggerConferenceScroll(true);
      setConferenceRedirected(true);
    }
    navigate("/schedule");
  };

  return (
    <section className="bg-[#F6BB17] w-full py-20 flex flex-col items-center justify-center">
      {/* Title block */}
      <div className="w-full max-w-3xl px-6 text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-black custom-shadow">
          SEEHB 2025 Schedule
        </h2>
        {/* Optional subtitle — remove if you don't want it */}
        {/* <p className="text-black/80 mt-1">SEEH 2025 recap</p> */}
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-30">
        <Card
          baseImg={dinnerImg}
          hoverImg={hunterImg}
          title="Opening Dinner"
          date="February 7th"
          onClick={() => goToDay("dinner")}
        />
        <Card
          baseImg={conferenceImg}
          hoverImg={chimpanzeeImg}
          title="Conference"
          date="February 8th"
          onClick={() => goToDay("conference")}
        />
      </div>
    </section>
  );
}
