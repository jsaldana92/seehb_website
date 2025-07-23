import React, { useState } from 'react';
import HoverOrTouchHandler from '../hoverortouchhandler';

import allie from '../../assets/2022media/allie.jpg';
import allie2 from '../../assets/2022media/allie2.jpg';
import babb from '../../assets/2022media/babb.jpg';
import babb2 from '../../assets/2022media/babb2.jpg';
import brett from '../../assets/2022media/brett.jpg';
import brett2 from '../../assets/2022media/brett2.jpg';
import brosnan from '../../assets/2022media/brosnan.jpg';
import elo from '../../assets/2022media/elo.jpg';
import elo2 from '../../assets/2022media/elo2.jpg';
import elo3 from '../../assets/2022media/elo3.jpg';
import group from '../../assets/2022media/group.jpg';
import marianamatos from '../../assets/2022media/marianamatos.jpg';
import marianamatos2 from '../../assets/2022media/marianamatos2.jpg';
import mayte from '../../assets/2022media/mayte.jpg';
import mayte2 from '../../assets/2022media/mayte2.jpg';
import mayte3 from '../../assets/2022media/mayte3.jpg';
import olivia from '../../assets/2022media/olivia.jpg';
import schultz from '../../assets/2022media/schultz.jpg';
import schultz2 from '../../assets/2022media/schultz2.jpg';
import talbot from '../../assets/2022media/talbot.jpg';
import talbot2 from '../../assets/2022media/talbot2.jpg';


const ImageCard = ({ src, onClick }) => (
  <HoverOrTouchHandler className="relative w-full h-full overflow-hidden rounded-md border border-gray-200 cursor-pointer">
    {(isHovered) => (
      <div onClick={onClick} className="w-full h-full">
        <img
          src={src}
          alt="SEEHB 2019"
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-105' : ''
          }`}
          onContextMenu={(e) => e.preventDefault()}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-white text-2xl font-bold"></span>
        </div>
      </div>
    )}
  </HoverOrTouchHandler>
);

const BentoTripleSideBySide = ({ left, middle, right, setSelectedImage }) => (
  <div className="grid grid-cols-3 gap-2">
    <ImageCard src={left} onClick={() => setSelectedImage(left)} />
    <ImageCard src={middle} onClick={() => setSelectedImage(middle)} />
    <ImageCard src={right} onClick={() => setSelectedImage(right)} />
  </div>
);

const BentoLeftLargeRightStacked = ({ large, top, bottom, setSelectedImage }) => (
  <div className="grid [grid-template-columns:3fr_2fr] gap-2">
    <ImageCard src={large} onClick={() => setSelectedImage(large)} />
    <div className="flex flex-col gap-2 h-full">
      <ImageCard src={top} onClick={() => setSelectedImage(top)} />
      <ImageCard src={bottom} onClick={() => setSelectedImage(bottom)} />
    </div>
  </div>
);

const BentoLeftStackedRightLarge = ({ top, bottom, large, setSelectedImage }) => (
  <div className="grid [grid-template-columns:2fr_3fr] gap-2">
    <div className="flex flex-col gap-2 h-full">
      <ImageCard src={top} onClick={() => setSelectedImage(top)} />
      <ImageCard src={bottom} onClick={() => setSelectedImage(bottom)} />
    </div>
    <ImageCard src={large} onClick={() => setSelectedImage(large)} />
  </div>
);

const BentoSideBySide = ({ left, right, setSelectedImage }) => (
  <div className="grid grid-cols-2 gap-2">
    <ImageCard src={left} onClick={() => setSelectedImage(left)} />
    <ImageCard src={right} onClick={() => setSelectedImage(right)} />
  </div>
);

export default function Media2022() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="bg-[#F0F0F0] w-full px-6 py-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col space-y-2 px-2 sm:px-4 md:px-6">
        <BentoSideBySide left={elo3} right={group} setSelectedImage={setSelectedImage} />
        <BentoLeftLargeRightStacked large={brosnan} top={mayte3} bottom={talbot} setSelectedImage={setSelectedImage} />
        <BentoLeftStackedRightLarge top={allie2} bottom={brett} large={babb} setSelectedImage={setSelectedImage} />
        <BentoSideBySide left={schultz} right={elo} setSelectedImage={setSelectedImage} />
        <BentoLeftLargeRightStacked large={marianamatos2} top={olivia} bottom={talbot2} setSelectedImage={setSelectedImage} />
        <BentoSideBySide left={babb2} right={allie} setSelectedImage={setSelectedImage} />
        <BentoTripleSideBySide left={mayte2} middle={brett2} right={schultz2} setSelectedImage={setSelectedImage} />
        <BentoLeftStackedRightLarge top={marianamatos} bottom={mayte} large={elo2} setSelectedImage={setSelectedImage} />
    
      </div>


      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full px-4">
            <button
              onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-6 z-10 w-10 h-10 flex items-top justify-center text-white text-3xl font-bold rounded-full bg-black/60 shadow-lg backdrop-blur-sm hover:bg-black/80 transition"
                >
              &times;
            </button>
            <img
            src={selectedImage}
            alt="enlarged"
            className="w-full max-w-full h-auto max-h-screen object-contain rounded-lg shadow-lg"
            onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
