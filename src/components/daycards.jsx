import React from 'react';
import dinnerImg from '../assets/images/dinner.png';
import hunterImg from '../assets/images/hunter.png';
import conferenceImg from '../assets/images/conference.png';
import chimpanzeeImg from '../assets/images/chimpanzee.png';

const Card = ({ baseImg, hoverImg, title, date }) => {
  return (
    <div className="relative w-78 h-78 overflow-hidden group rounded-lg shadow-lg shadow-black/40 drop">
      <img
        src={baseImg}
        alt={title}
        className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:brightness-25 group-hover:blur-[1px]"
      />

      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-outline-black text-white text-center text-xl md:text-[20px] font-bold drop-shadow-lg">
        {title}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center text-lg md:text-xl">
        {date}
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
        <img
            src={hoverImg}
            alt="hover"
            className="w-60 h-60 object-contain"
        />
      </div>
    </div>
  );
};

export default function DayCards() {
  return (
    <section className="bg-[#F6BB17] w-full py-20 flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-30">
        <Card
          baseImg={dinnerImg}
          hoverImg={hunterImg}
          title="Opening Dinner"
          date="February 7th"
        />
        <Card
          baseImg={conferenceImg}
          hoverImg={chimpanzeeImg}
          title="Conference"
          date="February 8th"
        />
      </div>
    </section>
  );
}