import React, { useState } from 'react';
import HoverOrTouchHandler from '../hoverortouchhandler';

import seehb2019 from '../../assets/2019media/seehb2019.png';
import engelberg from '../../assets/2019media/engelberg.jpg';
import benitez from '../../assets/2019media/benitez.jpg';
import stout from '../../assets/2019media/stout.jpg';
import group from '../../assets/2019media/group.jpg';
import presenter from '../../assets/2019media/presenter.jpg';
import newbold from '../../assets/2019media/newbold.jpg';
import chandlerenglish from '../../assets/2019media/chandlerenglish.jpg';
import poster from '../../assets/2019media/poster.jpg';
import brosnan from '../../assets/2019media/brosnan.jpg';
import martin from '../../assets/2019media/martin.jpg';
import carolinejones from '../../assets/2019media/carolinejones.jpg';
import jessie from '../../assets/2019media/jessie.jpg';


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

export default function Media2019() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="bg-[#F0F0F0] w-full px-6 py-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col space-y-2 px-2 sm:px-4 md:px-6">
        <BentoSideBySide left={seehb2019} right={group} setSelectedImage={setSelectedImage} />
        <BentoLeftLargeRightStacked large={stout} top={engelberg} bottom={benitez} setSelectedImage={setSelectedImage} />
        <BentoLeftStackedRightLarge top={brosnan} bottom={carolinejones} large={chandlerenglish} setSelectedImage={setSelectedImage} />
        <BentoSideBySide left={newbold} right={presenter} setSelectedImage={setSelectedImage} />
        <BentoLeftLargeRightStacked large={jessie} top={poster} bottom={martin} setSelectedImage={setSelectedImage} />
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
