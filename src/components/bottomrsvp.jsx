// src/components/bottomrsvp.jsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import bottomLeftBranch from '../assets/images/bottom_left.png';
import bottomRightBranch from '../assets/images/bottom_right.png';

gsap.registerPlugin(ScrollTrigger);

export default function BottomRSVP() {
  const sectionRef = useRef();
  const branchBottomLeftRef = useRef();
  const branchBottomRightRef = useRef();

  const setupBranchAnimation = (ref, positions) => {
    let ctx;
    const runAnimation = () => {
      ctx = gsap.context(() => {
        const triggerElement = sectionRef.current;
        const el = ref.current;
        if (!triggerElement || !el) return;

        const mm = gsap.matchMedia();

        mm.add(
          {
            isMobile: '(max-width: 767px)',
            isMedium: '(min-width: 768px) and (max-width: 1023px)',
            isDesktop: '(min-width: 1024px)',
          },
          (context) => {
            const setting = context.conditions.isMobile
              ? positions.mobile
              : context.conditions.isMedium
              ? positions.medium
              : positions.desktop;

            gsap.set(el, setting.set);
            gsap.to(el, {
              ...setting.to,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: triggerElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                markers: false,
              },
            });
          }
        );

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 200);
      }, sectionRef);
    };

    if (document.readyState === 'complete') {
      setTimeout(runAnimation, 100);
    } else {
      window.addEventListener('load', () => {
        setTimeout(runAnimation, 100);
      });
    }

    return () => {
      ctx?.revert();
      window.removeEventListener('load', runAnimation);
    };
  };

  useEffect(
    () =>
      setupBranchAnimation(branchBottomRightRef, {
        mobile: {
          set: { position: 'absolute', bottom: '-500px', right: '-900px', zIndex: 10, scale: 1.5 },
          to: { bottom: '0px', right: '0px', scale: 2.5 },
        },
        medium: {
          set: { position: 'absolute', bottom: '-1000px', right: '-1400px', zIndex: 10, scale: 2 },
          to: { bottom: '0px', right: '0px', scale: 2.5 },
        },
        desktop: {
          set: { position: 'absolute', bottom: '-100px', right: '-200px', zIndex: 40, scale: 1.5 },
          to: { bottom: '0px', right: '0px', scale: 3.7 },
        },
      }),
    []
  );

  useEffect(
    () =>
      setupBranchAnimation(branchBottomLeftRef, {
        mobile: {
          set: { position: 'absolute', bottom: '-500px', left: '-900px', zIndex: 10, scale: 1.5 },
          to: { bottom: '0px', left: '0px', scale: 2.5 },
        },
        medium: {
          set: { position: 'absolute', bottom: '-1000px', left: '-1200px', zIndex: 30, scale: 2 },
          to: { bottom: '0px', left: '0px', scale: 2.5 },
        },
        desktop: {
          set: { position: 'absolute', bottom: '-100px', left: '-160px', zIndex: 100, scale: 1.5 },
          to: { bottom: '0px', left: '0px', scale: 3.5 },
        },
      }),
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F6BB17] py-20 w-full flex flex-col items-center overflow-hidden pointer-events-none"
    >
      <img
        ref={branchBottomRightRef}
        src={bottomRightBranch}
        alt="Branch bottom right"
        className="w-40 md:w-56 object-contain z-5 absolute bottom-0 right-0"
      />
      <img
        ref={branchBottomLeftRef}
        src={bottomLeftBranch}
        alt="Branch bottom left"
        className="w-40 md:w-56 object-contain z-5 absolute bottom-0 left-0"
      />
      <h2 className="text-2xl md:text-3xl font-bold custom-shadow text-black text-center mb-6 z-10">
        Let us know if you'll be attending!
      </h2>
      <button className="bg-white text-black font-semibold px-6 py-2 rounded shadow-md hover:bg-gray-200 transition z-10">
        RSVP
      </button>
    </section>
  );
}
