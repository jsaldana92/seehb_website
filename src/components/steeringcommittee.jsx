// src/components/steeringcommittee.jsx
import React from 'react';

import brosnan from '../assets/images/brosnan.png';
import benitez from '../assets/images/benitez.png';
import frye from '../assets/images/frye.png';
import gnanadesikan from '../assets/images/gnanadesikan.png';
import reilly from '../assets/images/reilly.png';
import saldana from '../assets/images/saldana.png';
import mistry from '../assets/images/mistry.png';

import gsu_logo from '../assets/logos/gsu_logo.png';
import emory_logo from '../assets/logos/emory_logo.png';
import eh_logo from '../assets/logos/eh_logo.png';
import harvard_logo from '../assets/logos/harvard_logo.png';

const committee = [
  { img: brosnan, first: 'Sarah', last: 'Brosnan', logo: gsu_logo, institution: 'Georgia State University' },
  { img: benitez, first: 'Marcela', last: 'Benitez', logo: emory_logo, institution: 'Emory University' },
  { img: frye, first: 'Brett', last: 'Frye', logo: eh_logo, institution: 'Emory & Henry College' },
  { img: gnanadesikan, first: 'Gita', last: 'Gnanadesikan', logo: emory_logo, institution: 'Emory University' },
  { img: reilly, first: 'Olivia', last: 'Reilly', logo: harvard_logo, institution: 'Harvard University' },
  { img: saldana, first: 'Jhonatan', last: 'Saldana', logo: gsu_logo, institution: 'Georgia State University' },
  { img: mistry, first: 'Arianna', last: 'Mistry', logo: emory_logo, institution: 'Emory University' },
];

export default function SteeringCommittee() {
  return (
    <section className="bg-[#F6BB17] py-20 w-full flex flex-col items-center">
      <div className="w-full pl-4 pr-4 md:pl-4 md:pr-8 text-right">
        <h2 className="text-2xl md:text-3xl custom-shadow-sm font-bold text-black text-center md:text-right">
          This year's conference is organized by our dedicated steering committee
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-center">
        {committee.map((person, idx) => (
          <div key={idx} className="relative w-40 aspect-square group overflow-hidden rounded shadow-lg">
            <img
              src={person.img}
              alt={`${person.first} ${person.last}`}
              className="w-full h-full object-cover transition duration-300 ease-in-out"
            />

            {/* Full-logo background and institution name on hover */}
            {person.logo && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                <img src={person.logo} alt="logo" className="w-full h-full object-cover brightness-40 blur-[0.2px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white custom-shadow font-bold text-center text-sm px-2">
                    {person.institution}
                  </div>
                </div>
              </div>
            )}

            {/* Name label (hidden on hover) */}
            <div className="absolute bottom-2 right-2 text-md custom-shadow text-white text-right transition-opacity duration-300 ease-in-out group-hover:opacity-0">
              <div className="font-semibold leading-none">{person.first}</div>
              <div className="font-semibold leading-none">{person.last}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
