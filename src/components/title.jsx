// src/components/Title.jsx
import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import seehbLogo from "../assets/logos/seehb_logo.png";
import topRightBranch from "../assets/images/top_right.png";
import topLeftBranch from "../assets/images/top_left.png";
import bottomLeftBranch from "../assets/images/bottom_left.png";
import bottomRightBranch from "../assets/images/bottom_right.png";

gsap.registerPlugin(ScrollTrigger);

// =====================
// Backend config (Google Apps Script)
// =====================
const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyrghtwduUvUfmAt20eBkJURnUuskqRgdBKAJm6EuUZiHHxBOvjLY-EM4JdhPWwncPE/exec";
const ENDPOINT_TYPE = "apps_script"; // keeping this for clarity/future options
const APP_TOKEN =
  "kbhkjb-92nujbnjiuyb05/kjbkjhb/05-beo/354lkjbhdifd23-w/5454kljabscikuhjb-ulf/334";

export default function Title() {
  const branchRef = useRef();
  const branchLeftRef = useRef();
  const branchBottomLeftRef = useRef();
  const branchBottomRightRef = useRef();
  const sectionRef = useRef();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ state: "idle", message: "" }); // idle | loading | success | error
  const [honey, setHoney] = useState(""); // honeypot (bots fill this, humans don't)

  useLayoutEffect(() => {
    // hide section before paint
    gsap.set(sectionRef.current, { autoAlpha: 0 });
    // reveal once everything is positioned (next frame)
    requestAnimationFrame(() => {
      gsap.to(sectionRef.current, { autoAlpha: 1, duration: 0 });
    });
  }, []);

  const setupBranchAnimation = (ref, positions) => {
    let ctx;
    useLayoutEffect(() => {
      ctx = gsap.context(() => {
        const triggerElement = sectionRef.current;
        const el = ref.current;
        if (!triggerElement || !el) return;

        // Choose settings by breakpoint
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

            // 1) Set initial state BEFORE reveal (avoid flash)
            gsap.set(el, {
              ...setting.set,
              willChange: "transform",
            });

            // reveal this element now that it's positioned
            gsap.set(el, { autoAlpha: 1 });

            // 2) Animate
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

      return () => ctx && ctx.revert();
    }, []); // run once per element
  };

  // Top-right branch
  setupBranchAnimation(branchRef, {
    mobile: {
      set: {
        position: "absolute",
        top: 0,
        right: 0, // <— pin to top-right like before
        x: 900,
        y: -500, // start off-screen
        zIndex: 10,
        scale: 1.5,
      },
      to: { x: 0, y: 0, scale: 3 },
    },
    medium: {
      set: {
        position: "absolute",
        top: 0,
        right: 0,
        x: 1400,
        y: -1200,
        zIndex: 10,
        scale: 1.7,
      },
      to: { x: 0, y: 0, scale: 2.3 },
    },
    desktop: {
      set: {
        position: "absolute",
        top: 0,
        right: 0,
        x: 2000,
        y: -1000,
        zIndex: 10,
        scale: 2,
      },
      to: { x: 0, y: 0, scale: 4 },
    },
  });

  // Top-left branch
  setupBranchAnimation(branchLeftRef, {
    mobile: {
      set: {
        position: "absolute",
        top: 0,
        left: 0, // <— pin to top-left
        x: -600,
        y: -500,
        zIndex: 10,
        scale: 1.5,
      },
      to: { x: 0, y: 0, scale: 2.5 },
    },
    medium: {
      set: {
        position: "absolute",
        top: 0,
        left: 0,
        x: -1200,
        y: -1000,
        zIndex: 10,
        scale: 2,
      },
      to: { x: 0, y: 0, scale: 2.5 },
    },
    desktop: {
      set: {
        position: "absolute",
        top: 0,
        left: 0,
        x: -1100,
        y: -1000,
        zIndex: 10,
        scale: 1.5,
      },
      to: { x: 0, y: 0, scale: 3 },
    },
  });

  // Bottom-right branch
  setupBranchAnimation(branchBottomRightRef, {
    mobile: {
      set: {
        position: "absolute",
        bottom: 0,
        right: 0, // <— pin to bottom-right
        x: 900,
        y: 500,
        zIndex: 10,
        scale: 1.5,
      },
      to: { x: 0, y: 0, scale: 2.5 },
    },
    medium: {
      set: {
        position: "absolute",
        bottom: 0,
        right: 0,
        x: 1400,
        y: 1000,
        zIndex: 10,
        scale: 2,
      },
      to: { x: 0, y: 0, scale: 2.5 },
    },
    desktop: {
      set: {
        position: "absolute",
        bottom: 0,
        right: 0,
        x: 2000,
        y: 1000,
        zIndex: 10,
        scale: 1.5,
      },
      to: { x: 0, y: 0, scale: 3.7 },
    },
  });

  // Bottom-left branch
  setupBranchAnimation(branchBottomLeftRef, {
    mobile: {
      set: {
        position: "absolute",
        bottom: 0,
        left: 0, // <— pin to bottom-left
        x: -900,
        y: 500,
        zIndex: 10,
        scale: 1.5,
      },
      to: { x: 0, y: 0, scale: 2.5 },
    },
    medium: {
      set: {
        position: "absolute",
        bottom: 0,
        left: 0,
        x: -1200,
        y: 1000,
        zIndex: 10,
        scale: 2,
      },
      to: { x: 0, y: 0, scale: 2.5 },
    },
    desktop: {
      set: {
        position: "absolute",
        bottom: 0,
        left: 0,
        x: -1600,
        y: 1000,
        zIndex: 10,
        scale: 1.5,
      },
      to: { x: 0, y: 0, scale: 3.5 },
    },
  });

  const isValidEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val).toLowerCase());

  async function handleSubmit(e) {
    e.preventDefault();

    // Honeypot (if filled, pretend success)
    if (honey.trim().length > 0) {
      setStatus({ state: "success", message: "Thanks! You’re on the list." });
      setEmail("");
      return;
    }

    if (!isValidEmail(email)) {
      setStatus({
        state: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setStatus({ state: "loading", message: "" });

    try {
      await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors", // keeps the request preflight-free
        headers: { "Content-Type": "text/plain;charset=UTF-8" }, // "simple" request
        body: JSON.stringify({ email: email.toLowerCase(), token: APP_TOKEN }),
      });

      // IMPORTANT: with no-cors, the response is opaque; do NOT check res.ok or parse JSON.
      setStatus({ state: "success", message: "Thanks! You’re on the list." });
      setEmail("");
    } catch (err) {
      // Only fires on real network errors (e.g., offline)
      setStatus({
        state: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F6BB17] w-full min-h-[60vh] px-6 py-40 flex flex-col md:flex-row items-center md:items-stretch justify-center md:justify-between space-y-6 md:space-y-0 md:space-x-10 pointer-events-none opacity-0"
    >
      <img
        ref={branchRef}
        src={topRightBranch}
        alt="Branch top right"
        className="w-40 md:w-56 object-contain z-5 absolute invisible"
      />
      <img
        ref={branchLeftRef}
        src={topLeftBranch}
        alt="Branch top left"
        className="w-40 md:w-56 object-contain z-5 absolute invisible"
      />
      <img
        ref={branchBottomRightRef}
        src={bottomRightBranch}
        alt="Branch bottom right"
        className="w-40 md:w-56 object-contain z-5 rotate-330 absolute invisible"
      />
      <img
        ref={branchBottomLeftRef}
        src={bottomLeftBranch}
        alt="Branch bottom left"
        className="w-40 md:w-56 object-contain z-5 rotate-10 absolute invisible"
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
            href="https://forms.gle/QnmLH5cqBcJe4RYU8"
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
