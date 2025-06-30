import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import leftFoot from '../assets/images/left_foot.png';
import rightFoot from '../assets/images/right_foot.png';

gsap.registerPlugin(ScrollTrigger);

export default function VeritcalFootsteps() {
  const footstepsRefs = useRef([]);
  const sectionRef = useRef();

  useEffect(() => {
    footstepsRefs.current.forEach((el, idx) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${idx * 100} center`,
            end: `top+=${idx * 100 + 100} center`,
            scrub: true,
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.to(el, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top+=${idx * 100 + 150} center`,
          end: `top+=${idx * 100 + 300} center`,
          scrub: true,
        },
      });
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        footstepsRefs.current.forEach((el) => {
          if (!el) return;
          if (self.direction === 1) {
            el.classList.add('rotate-180');
          } else {
            el.classList.remove('rotate-180');
          }
        });
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[800vh] w-full relative bg-transparent"
    >
      <div className="flex flex-col items-center space-y-6 absolute right-1/5 top-10 z-20 pointer-events-none">
        {[leftFoot, rightFoot, leftFoot, rightFoot, leftFoot, rightFoot, leftFoot, rightFoot].map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="Footstep"
            className="w-10 h-auto rotate-180"
            ref={(el) => (footstepsRefs.current[idx] = el)}
          />
        ))}
      </div>
    </section>
  );
}
