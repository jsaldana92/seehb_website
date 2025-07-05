import React, { useState } from 'react';
import HoverOrTouchHandler from '../hoverortouchhandler';


import angelleH from '../../assets/2023media/angelleH.jpg';
import angelleV from '../../assets/2023media/angelleV.jpg';
import bestPoster from '../../assets/2023media/bestposter.jpg';
import brettnasiri from '../../assets/2023media/brettnasiri.jpg';
import brettnasiri3 from '../../assets/2023media/brettnasiri3.jpg';
import buskellH2 from '../../assets/2023media/buskellH2.jpg';
import buskellHV from '../../assets/2023media/buskellV.jpg';
import deereV from '../../assets/2023media/deereV.jpg';
import deereV2 from '../../assets/2023media/deereV2.jpg';
import evanH from '../../assets/2023media/evanH.jpg';
import evanV from '../../assets/2023media/evanV.jpg';
import gitaH from '../../assets/2023media/gitaH.jpg';
import gitaV from '../../assets/2023media/gitaV.jpg';
import graceH from '../../assets/2023media/graceH.jpg';
import graceH3 from '../../assets/2023media/graceH3.jpg';
import mishaH from '../../assets/2023media/mishaH.jpg';
import mishaH2 from '../../assets/2023media/mishaH2.jpg';
import mishaV from '../../assets/2023media/mishaV.jpg';
import nasiriH from '../../assets/2023media/nasiriH.jpg';
import nasiriH3 from '../../assets/2023media/nasiriH3.jpg';
import nasiriV from '../../assets/2023media/nasiriV.jpg';
import nicoleH2 from '../../assets/2023media/nicoleH2.jpg';
import nicoleH3 from '../../assets/2023media/nicoleH3.jpg';
import postergroup from '../../assets/2023media/postergroup.jpg';
import posterH from '../../assets/2023media/posterH.jpg';
import posterH2 from '../../assets/2023media/posterH2.jpg';
import posterH3 from '../../assets/2023media/posterH3.jpg';
import posterH4 from '../../assets/2023media/posterH4.jpg';
import posterV from '../../assets/2023media/posterV.jpg';
import robertaH2 from '../../assets/2023media/robertaH2.jpg';
import robertaH3 from '../../assets/2023media/robertaH3.jpg';
import robertaV from '../../assets/2023media/robertaV.jpg';
import robH from '../../assets/2023media/robH.jpg';
import robH2 from '../../assets/2023media/robH2.jpg';
import seehb2023 from '../../assets/2023media/seehb2023.jpg';
import seehbgroup2023 from '../../assets/2023media/seehbgroup2023.jpg';
import sierragroup from '../../assets/2023media/sierragroup.jpg';
import tverskoiH1 from '../../assets/2023media/tverskoiH1.jpg';
import tverskoiH2 from '../../assets/2023media/tverskoiH2.jpg';



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

export default function Media2023() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="bg-[#F0F0F0] w-full px-6 py-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col space-y-2 px-2 sm:px-4 md:px-6">
        <BentoSideBySide left={seehbgroup2023} right={robertaH3} setSelectedImage={setSelectedImage} />
        <BentoTripleSideBySide left={bestPoster} middle={gitaV} right={seehb2023} setSelectedImage={setSelectedImage} />
        <BentoSideBySide left={nicoleH2} right={sierragroup} setSelectedImage={setSelectedImage} />        
        <BentoLeftLargeRightStacked large={buskellHV} top={angelleH} bottom={brettnasiri} setSelectedImage={setSelectedImage} />
        <BentoLeftStackedRightLarge top={robH2} bottom={tverskoiH1} large={nasiriH3} setSelectedImage={setSelectedImage} />
        <BentoLeftLargeRightStacked large={gitaH} top={mishaH} bottom={tverskoiH2} setSelectedImage={setSelectedImage} />
        <BentoTripleSideBySide left={graceH3} middle={posterH} right={posterH2} setSelectedImage={setSelectedImage} />
        <BentoSideBySide left={evanV} right={mishaV} setSelectedImage={setSelectedImage} />
        <BentoLeftStackedRightLarge top={postergroup} bottom={brettnasiri3} large={posterV} setSelectedImage={setSelectedImage} />
        <BentoTripleSideBySide left={angelleV} middle={robertaV} right={deereV2} setSelectedImage={setSelectedImage} />
        <BentoLeftStackedRightLarge top={nicoleH3} bottom={robH} large={nasiriV} setSelectedImage={setSelectedImage} />
        <BentoSideBySide left={tverskoiH2} right={graceH} setSelectedImage={setSelectedImage} />
        <BentoLeftStackedRightLarge top={buskellH2} bottom={robertaH2} large={mishaH2} setSelectedImage={setSelectedImage} />
        <BentoTripleSideBySide left={evanH} middle={graceH} right={nasiriH} setSelectedImage={setSelectedImage} />
        <BentoLeftLargeRightStacked large={deereV} top={posterH4} bottom={posterH3} setSelectedImage={setSelectedImage} />
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
