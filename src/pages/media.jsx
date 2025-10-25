import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import monkeyImg from "../assets/images/monkey.png";
import gorillaImg from "../assets/images/gorilla.png";
import centerBranch from "../assets/images/center.png";
import BottomBorder from "../components/bottomborder";
import ImagesSEEHB from "../components/mediabentobox";

gsap.registerPlugin(ScrollTrigger);

export default function Media() {
  const scientistRef = useRef();
  const chimpstumpRef = useRef();
  const centerBranchRef = useRef();
  const sectionRef = useRef();

  // Hide the whole section before paint, reveal after positions are set
  useLayoutEffect(() => {
    gsap.set(sectionRef.current, { autoAlpha: 0 });
    requestAnimationFrame(() => {
      gsap.to(sectionRef.current, { autoAlpha: 1, duration: 0 });
    });
  }, []);

  // Helper that positions & animates a given element with breakpoint settings
  const setupImageAnimation = (ref, positions) => {
    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        const triggerElement = sectionRef.current;
        const el = ref.current;
        if (!triggerElement || !el) return;

        const mm = gsap.matchMedia();
        mm.add(
          {
            isMobile: "(max-width: 767px)",
            isMedium: "(min-width: 768px) and (max-width: 1023px)",
            isDesktop: "(min-width: 1024px)",
          },
          (context) => {
            const setting = context.conditions.isMobile
              ? positions.mobile
              : context.conditions.isMedium
              ? positions.medium
              : positions.desktop;

            // Set initial state BEFORE reveal (no flash)
            gsap.set(el, {
              ...setting.set, // includes corner pin + starting x/y/scale
              willChange: "transform",
            });

            // Reveal this element once positioned
            gsap.set(el, { autoAlpha: 1 });

            // Animate to target (usually x:0, y:0 + final scale)
            gsap.to(el, {
              ...setting.to,
              ease: "power2.out",
              scrollTrigger: {
                trigger: triggerElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                markers: false,
              },
            });
          }
        );

        ScrollTrigger.refresh();
      }, sectionRef);

      return () => ctx.revert();
    }, []);
  };

  // ===== center branch (centered at bottom:200 via left:50%/xPercent:-50)
  // Old code used big "bottom" start values. Convert to transform:
  // y delta = -(startBottom - targetBottom)
  setupImageAnimation(centerBranchRef, {
    mobile: {
      set: {
        position: "absolute",
        bottom: 200,
        left: "50%",
        xPercent: -50,
        x: 0,
        y: -(2750 - 200), // -2550
        zIndex: 10,
        scale: 1.5,
      },
      to: { x: 0, y: 0, scale: 2.7 },
    },
    medium: {
      set: {
        position: "absolute",
        bottom: 200,
        left: "50%",
        xPercent: -50,
        x: 0,
        y: -(3000 - 200), // -2800
        zIndex: 10,
        scale: 2,
      },
      to: { x: 0, y: 0, scale: 2.5 },
    },
    desktop: {
      set: {
        position: "absolute",
        bottom: 200,
        left: "50%",
        xPercent: -50,
        x: 0,
        y: -(4000 - 200), // -3800
        zIndex: 10,
        scale: 1.5,
      },
      to: { x: 0, y: 0, scale: 3 },
    },
  });

  // ===== right image (gorilla) — bottom-right target
  setupImageAnimation(chimpstumpRef, {
    mobile: {
      set: {
        position: "absolute",
        bottom: 0,
        right: 0,
        x: 900, // from right:-900
        y: 500, // from bottom:-500
        zIndex: 10,
        scale: 1.5,
      },
      to: { x: 0, y: 0, scale: 1.5 },
    },
    medium: {
      set: {
        position: "absolute",
        bottom: 0,
        right: -100, // target had right:-100
        x: 1400 + 100, // start right:-1400 vs target -100 → delta +1500
        y: 1000, // bottom:-1000
        zIndex: 10,
        scale: 2,
      },
      to: { x: 0, y: 0, scale: 1.5 },
    },
    desktop: {
      set: {
        position: "absolute",
        bottom: 100, // target had bottom:100
        right: 0,
        x: 2500, // start right:-2500
        y: 1000 - 100, // delta to bottom:100 → +900
        zIndex: 10,
        scale: 1.5,
      },
      to: { x: 0, y: 0, scale: 1.7 },
    },
  });

  // ===== left image (monkey) — bottom-left target
  setupImageAnimation(scientistRef, {
    mobile: {
      set: {
        position: "absolute",
        bottom: 0,
        left: 0,
        x: -900, // left:-900
        y: 500, // bottom:-500
        zIndex: 10,
        scale: 1.5,
      },
      to: { x: 0, y: 0, scale: 1.75 },
    },
    medium: {
      set: {
        position: "absolute",
        bottom: 0,
        left: 0,
        x: -1200, // left:-1200
        y: 1000, // bottom:-1000
        zIndex: 10,
        scale: 2,
      },
      to: { x: 0, y: 0, scale: 1.5 },
    },
    desktop: {
      set: {
        position: "absolute",
        bottom: 100, // target had bottom:100
        left: 0,
        x: -1600, // left:-1600
        y: 1000 - 100, // delta to bottom:100 → +900
        zIndex: 10,
        scale: 1.5,
      },
      to: { x: 0, y: 0, scale: 2.0 },
    },
  });

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-[#F6BB17] w-full min-h-[60vh] px-6 py-40 flex flex-col md:flex-row items-center md:items-stretch justify-center md:justify-between space-y-6 md:space-y-0 md:space-x-10 pointer-events-none opacity-0"
      >
        <img
          ref={centerBranchRef}
          src={centerBranch}
          alt="Branch top center"
          className="w-40 md:w-56 object-contain z-5 rotate-0 absolute invisible"
          loading="eager"
        />
        <img
          ref={chimpstumpRef}
          src={gorillaImg}
          alt="Gorilla bottom right"
          className="w-40 md:w-56 object-contain z-5 rotate-0 absolute invisible"
          loading="lazy"
        />
        <img
          ref={scientistRef}
          src={monkeyImg}
          alt="Monkey bottom left"
          className="w-40 md:w-56 object-contain z-5 rotate-0 absolute invisible"
          loading="lazy"
        />

        <div className="flex-1 flex items-center justify-center z-10">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black custom-shadow">
              Media
            </h1>
            <h2 className="text-xl md:text-2xl text-white drop-shadow-2xl custom-shadow">
              Past Meetings
            </h2>
          </div>
        </div>
      </section>

      <ImagesSEEHB />
      <BottomBorder />
    </>
  );
}
