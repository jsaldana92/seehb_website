import React, { useState } from 'react';
import HoverOrTouchHandler from '../hoverortouchhandler';

import hetch from '../../assets/2018media/hetch.jpg';
import crowd from '../../assets/2018media/crowd.jpg';
import crowd2 from '../../assets/2018media/crowd2.jpg';
import group from '../../assets/2018media/group.jpg';
import presenter1 from '../../assets/2018media/presenter1.jpg';
import presenter2 from '../../assets/2018media/presenter2.jpg';
import presenter3 from '../../assets/2018media/presenter3.jpg';
import presenter4 from '../../assets/2018media/presenter4.jpg';
import silly from '../../assets/2018media/silly.jpg';
import beran from '../../assets/2018media/beran.jpg';

const ImageCard = ({ src, onClick }) => (
  <HoverOrTouchHandler className="relative w-full h-full overflow-hidden rounded-md border border-gray-200 cursor-pointer">
    {(isHovered) => (
      <div onClick={onClick} className="w-full h-full">
        <img
          src={src}
          alt="SEEHB 2018"
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-105' : ''
          }`}
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

export default function Media2018() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="bg-[#F0F0F0] w-full px-6 py-10 flex flex-col items-center justify-center space-y-6">
      {/* Top row */}
      <div className="w-full max-w-6xl flex flex-col space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <ImageCard src={hetch} onClick={() => setSelectedImage(hetch)} />
          <ImageCard src={group} onClick={() => setSelectedImage(group)} />
        </div>

        <div className="grid [grid-template-columns:3fr_2fr] gap-2">
          <ImageCard src={beran} onClick={() => setSelectedImage(beran)} />
          <div className="flex flex-col gap-2 h-full">
            <ImageCard src={crowd} onClick={() => setSelectedImage(crowd)} />
            <ImageCard src={presenter1} onClick={() => setSelectedImage(presenter1)} />
          </div>
        </div>

        <div className="grid [grid-template-columns:2fr_3fr] gap-2">
          <div className="flex flex-col gap-2 h-full">
            <ImageCard src={presenter3} onClick={() => setSelectedImage(presenter3)} />
            <ImageCard src={presenter4} onClick={() => setSelectedImage(presenter4)} />
          </div>
          <ImageCard src={presenter2} onClick={() => setSelectedImage(presenter2)} />
        </div>

        <div className="w-full max-w-6xl flex flex-col space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <ImageCard src={silly} onClick={() => setSelectedImage(silly)} />
            <ImageCard src={crowd2} onClick={() => setSelectedImage(crowd2)} />
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full px-4">
            <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-6 z-10 w-10 h-10 flex items-start justify-center text-white text-3xl font-bold rounded-full bg-black/60 shadow-lg backdrop-blur-sm hover:bg-black/80 transition"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="enlarged"
              className="w-full h-auto rounded-lg shadow-lg"
              onContextMenu={(e) => e.preventDefault()} //prevents right clicking
            />
          </div>
        </div>
      )}
    </section>
  );
}
