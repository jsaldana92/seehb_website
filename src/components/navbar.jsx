import React, { useState } from 'react';
import seehbLogo from '../assets/logos/seehb_logo.png';

const navItems = ['Home', 'Schedule', 'Media', 'Archive'];

export default function Navbar() {
  const [active, setActive] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#F6BB17]/80 w-full px-6 py-4 shadow-md z-50 relative">
      <div className="flex items-center justify-between relative">
        {/* Logo */}
        <img src={seehbLogo} alt="SEEH Logo" className="h-10" />

        {/* Burger Button (Mobile) */}
        <button
          className={`md:hidden flex flex-col space-y-1 p-2 rounded ${
            isOpen ? 'bg-gray-200' : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>

        {/* Nav Items (Desktop) */}
        <ul className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() => setActive(item)}
              className={`text-lg cursor-pointer text-white drop-shadow-md transition-opacity duration-200 ${
                active === item ? 'opacity-100' : 'opacity-60'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Nav Items (Mobile Dropdown) */}
        {isOpen && (
          <ul className="absolute top-14 right-0 bg-[#737373]/70 rounded shadow-lg py-2 px-4 space-y-2 w-40 md:hidden z-10">
            {navItems.map((item) => (
              <li
                key={item}
                onClick={() => {
                  setActive(item);
                  setIsOpen(false);
                }}
                className={`text-base cursor-pointer text-white drop-shadow-md transition-opacity duration-200 ${
                  active === item ? 'opacity-100' : 'opacity-60'
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
