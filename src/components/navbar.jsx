import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import seehbLogo from '../assets/logos/seehb_logo.png';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'Media', path: '/media' },
  { name: 'Archive', path: 'https://www.sarah-brosnan.com/seehb', external: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-[#F6BB17]/80 w-full px-6 py-4 shadow-md z-50 relative">
      <div className="flex items-center justify-between relative">
        <img src={seehbLogo} alt="SEEH Logo" className="h-10" />

        <button
          className="md:hidden flex flex-col space-y-1 p-2 rounded active:scale-95 active:bg-white/30 transition-all duration-150"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8">
          {navItems.map(({ name, path, external }) => (
            <li key={name}>
              {external ? (
                <a
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg cursor-pointer text-white drop-shadow-md opacity-60 hover:opacity-100 transition-opacity duration-200"
                >
                  {name}
                </a>
              ) : (
                <Link
                  to={path}
                  className={`text-lg cursor-pointer text-white drop-shadow-md transition-opacity duration-200 ${
                    location.pathname === path ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  {name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Nav */}
        {isOpen && (
          <ul className="absolute top-14 right-0 bg-[#737373]/70 rounded shadow-lg py-2 space-y-1 w-40 md:hidden z-10">
            {navItems.map(({ name, path, external }) => (
              <li key={name} className="w-full">
                {external ? (
                  <a
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-4 py-2 text-white text-base opacity-60 hover:opacity-100 active:bg-[#505050]/70 hover:bg-[#505050]/50 active:scale-[0.98] transition-all duration-150"
                  >
                    {name}
                  </a>
                ) : (
                  <Link
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`block w-full text-left px-4 py-2 text-white text-base opacity-60 hover:opacity-100 active:bg-[#505050]/70 hover:bg-[#505050]/50 active:scale-[0.98] transition-all duration-150 ${
                      location.pathname === path ? 'opacity-100' : ''
                    }`}
                  >
                    {name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}

      </div>
    </nav>
  );
}
