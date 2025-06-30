import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import leftFoot from '../assets/images/left_foot.png';
import rightFoot from '../assets/images/right_foot.png';

gsap.registerPlugin(ScrollTrigger);

export default function DiagonalFootsteps() {
  const footstepsRefs = useRef([]);
  const sectionRef = useRef();

  useEffect(() => {
    footstepsRefs.current.forEach((el, idx) => {
      if (!el) return;

      // Trigger per element by adding a small vertical offset per footstep
      gsap.fromTo(
        el,
        { opacity: 0, x: -20, y: -20 },
        {
            opacity: 1,
            x: 0,
            y: 0,
            scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${idx * 200} center`,
            end: `top+=${idx * 200 + 100} center`,
            scrub: true,
            },
        }
      );


      // Fade out later
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: `top+=${idx * 200 + 150} center`,
        end: `top+=${idx * 200 + 300} center`,
        scrub: true,
        animation: gsap.to(el, { opacity: 0 }),
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="absolute inset-0 z-10 pointer-events-none"
    >
      {[
        leftFoot,
        rightFoot,
        leftFoot,
        rightFoot,
        leftFoot,
        rightFoot,
        leftFoot,
        rightFoot,
      ].map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt="Footstep"
          className="w-10 h-auto absolute opacity-0 rotate-130"
          ref={(el) => (footstepsRefs.current[idx] = el)}
          style={{
            top: `${200 + idx * 100}px`,
            left: `${200 + idx * 50}px`,
          }}
        />
      ))}
    </section>
  );
}
