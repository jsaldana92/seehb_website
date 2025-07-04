import React from 'react';
import seehbLogo from '../assets/logos/seehb_logo.png';
import xLogo from '../assets/images/x_logo.png';

export default function BottomBorder() {
  return (
    <footer className="w-full bg-[#F6BB17] py-4 px-6 flex justify-between items-center">
      {/* SEEHB Logo on the left */}
      <div className="flex items-center">
        <img src={seehbLogo} alt="SEEHB Logo" className="h-20 w-auto" />
      </div>

      {/* Social media links on the right */}
      <div className="flex items-center gap-4">
        <a
          href="https://x.com/SouthEasternEHB"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={xLogo} alt="X Logo" className="h-8 w-8 hover:opacity-80 transition" />
        </a>

        {/* Add more icons here in the future */}
      </div>
    </footer>
  );
}
