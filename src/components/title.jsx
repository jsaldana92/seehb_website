import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import seehbLogo from '../assets/logos/seehb_logo.png';
import topRightBranch from '../assets/images/top_right.png';
import topLeftBranch from '../assets/images/top_left.png';
import bottomLeftBranch from '../assets/images/bottom_left.png';
import bottomRightBranch from '../assets/images/bottom_right.png';

gsap.registerPlugin(ScrollTrigger);

export default function Title() {
  const branchRef = useRef();
  const branchLeftRef = useRef();
  const branchBottomLeftRef = useRef();
  const branchBottomRightRef = useRef();
  const sectionRef = useRef();

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
      setupBranchAnimation(branchRef, {
        mobile: {
          set: { position: 'absolute', top: '-500px', right: '-900px', zIndex: 10, scale: 1.5 },
          to: { top: '0px', right: '0px', scale: 3 },
        },
        medium: {
          set: { position: 'absolute', top: '-1200px', right: '-1400px', zIndex: 10, scale: 1.7 },
          to: { top: '0px', right: '0px', scale: 2.3 },
        },
        desktop: {
          set: { position: 'absolute', top: '-1000px', right: '-2000px', zIndex: 10, scale: 2 },
          to: { top: '0px', right: '0px', scale: 4 },
        },
      }),
    []
  );

  useEffect(
    () =>
      setupBranchAnimation(branchLeftRef, {
        mobile: {
          set: { position: 'absolute', top: '-500px', left: '-600px', zIndex: 10, scale: 1.5 },
          to: { top: '0px', left: '0px', scale: 2.5 },
        },
        medium: {
          set: { position: 'absolute', top: '-1000px', left: '-1200px', zIndex: 10, scale: 2 },
          to: { top: '0px', left: '0px', scale: 2.5 },
        },
        desktop: {
          set: { position: 'absolute', top: '-1000px', left: '-1100px', zIndex: 10, scale: 1.5 },
          to: { top: '0px', left: '0px', scale: 3 },
        },
      }),
    []
  );

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
          set: { position: 'absolute', bottom: '-1000px', right: '-2000px', zIndex: 10, scale: 1.5 },
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
          set: { position: 'absolute', bottom: '-1000px', left: '-1200px', zIndex: 10, scale: 2 },
          to: { bottom: '0px', left: '0px', scale: 2.5 },
        },
        desktop: {
          set: { position: 'absolute', bottom: '-1000px', left: '-1600px', zIndex: 10, scale: 1.5 },
          to: { bottom: '0px', left: '0px', scale: 3.5 },
        },
      }),
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F6BB17] w-full min-h-[60vh] px-6 py-40 flex flex-col md:flex-row items-center md:items-stretch justify-center md:justify-between space-y-6 md:space-y-0 md:space-x-10 pointer-events-none"
    >
      <img
        ref={branchRef}
        src={topRightBranch}
        alt="Branch top right"
        className="w-40 md:w-56 object-contain z-5"
      />
      <img
        ref={branchLeftRef}
        src={topLeftBranch}
        alt="Branch top left"
        className="w-40 md:w-56 object-contain z-5"
      />
      <img
        ref={branchBottomRightRef}
        src={bottomRightBranch}
        alt="Branch bottom right"
        className="w-40 md:w-56 object-contain z-5 rotate-330"
      />
      <img
        ref={branchBottomLeftRef}
        src={bottomLeftBranch}
        alt="Branch bottom left"
        className="w-40 md:w-56 object-contain z-5 rotate-10"
      />

      <div className="flex-1 flex items-center justify-center z-2">
        <div className="w-full max-w-[450px] md:max-w-[650px] aspect-[3/2]">
          <img
            src={seehbLogo}
            alt="SEEH Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center z-10">
        <div className="flex flex-col items-center space-y-4 text-center pointer-events-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black custom-shadow">
            Join us Feb 7th to 8th, 2025
          </h1>
          <h2 className="text-xl md:text-2xl text-white drop-shadow-2xl custom-shadow">
            at Indian Creek Lodge, Georgia State University
          </h2>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScdv5FYKN7_3Un1v6NNrW4kHo5JV90EYUeBYahvrSJUGuAP8A/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black font-semibold px-6 py-2 rounded shadow-md hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            RSVP
          </a>
        </div>
      </div>
    </section>
  );
}
