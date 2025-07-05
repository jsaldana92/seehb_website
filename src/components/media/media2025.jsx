import React, { useState } from 'react';
import HoverOrTouchHandler from '../hoverortouchhandler';


import amandaH from '../../assets/2025media/amandaH.jpg';
import amandaH2 from '../../assets/2025media/amandaH2.jpg';
import amberH from '../../assets/2025media/amberH.jpg';
import amberH2 from '../../assets/2025media/amberH2.jpg';
import amberV from '../../assets/2025media/amberV.jpg';
import angelleH from '../../assets/2025media/angelleH.jpg';
import ansleyV from '../../assets/2025media/ansleyV.jpg';
import apeH from '../../assets/2025media/apeH.jpg';
import apeH2 from '../../assets/2025media/apeH2.jpg';
import ariH from '../../assets/2025media/ariH.jpg';
import ariV from '../../assets/2025media/ariV.jpg';
import caylessH from '../../assets/2025media/caylessH.jpg';
import cebus from '../../assets/2025media/cebus.jpg';
import darbyV from '../../assets/2025media/darbyV.jpg';
import dorothyH from '../../assets/2025media/dorothyH.jpg';
import fedeH from '../../assets/2025media/fedeH.jpg';
import fedeV from '../../assets/2025media/fedeV.jpg';
import fedeH2 from '../../assets/2025media/fedeH2.jpg';
import giulianaH from '../../assets/2025media/giulianaH.jpg';
import graceV from '../../assets/2025media/graceV.jpg';
import graceV2 from '../../assets/2025media/graceV2.jpg';
import minwooH from '../../assets/2025media/minwooH.jpg';
import nicoleV from '../../assets/2025media/nicoleV.jpg';
import posterawardH from '../../assets/2025media/posterawardH.jpg';
import posterawardH2 from '../../assets/2025media/posterawardH2.jpg';
import rohiniH from '../../assets/2025media/rohiniH.jpg';
import seehbgroup from '../../assets/2025media/seehbgroup.jpg';
import seehbillustration from '../../assets/2025media/seehbillustration.png';
import silly from '../../assets/2025media/silly.jpg';



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

export default function Media2025() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="bg-[#F0F0F0] w-full px-6 py-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col space-y-2 px-2 sm:px-4 md:px-6">
        <BentoSideBySide left={seehbgroup} right={seehbillustration} setSelectedImage={setSelectedImage} />
        <BentoLeftLargeRightStacked large={posterawardH2} top={cebus} bottom={apeH} setSelectedImage={setSelectedImage} />
        <BentoTripleSideBySide left={nicoleV} middle={amberV} right={graceV} setSelectedImage={setSelectedImage} />
        <BentoSideBySide left={amandaH2} right={ariH} setSelectedImage={setSelectedImage} />        
        <BentoLeftLargeRightStacked large={darbyV} top={minwooH} bottom={rohiniH} setSelectedImage={setSelectedImage} />
        <BentoLeftStackedRightLarge top={ansleyV} bottom={caylessH} large={dorothyH} setSelectedImage={setSelectedImage} />
        <BentoLeftLargeRightStacked large={ariV} top={angelleH} bottom={giulianaH} setSelectedImage={setSelectedImage} />
        <BentoTripleSideBySide left={amberH} middle={posterawardH} right={amandaH} setSelectedImage={setSelectedImage} />
        <BentoSideBySide left={apeH2} right={silly} setSelectedImage={setSelectedImage} />
        <BentoLeftStackedRightLarge top={fedeH} bottom={amberH2} large={graceV2} setSelectedImage={setSelectedImage} />
        <BentoSideBySide left={fedeV} right={fedeH2} setSelectedImage={setSelectedImage} />
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
