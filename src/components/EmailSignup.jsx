// src/components/EmailSignup.jsx
import React, { useState } from "react";

// =====================
// Backend config (Google Apps Script)
// =====================
const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyrghtwduUvUfmAt20eBkJURnUuskqRgdBKAJm6EuUZiHHxBOvjLY-EM4JdhPWwncPE/exec";
const APP_TOKEN =
  "kbhkjb-92nujbnjiuyb05/kjbkjhb/05-beo/354lkjbhdifd23-w/5454kljabscikuhjb-ulf/334";

export default function EmailSignup({
  heading = "Stay updated on future SEEHB events!",
  headingClassName = "text-2xl font-bold text-black custom-shadow-sm",
  wrapperClassName = "mt-6",
  size = "normal", // "normal" | "compact"
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ state: "idle", message: "" }); // idle | loading | success | error
  const [honey, setHoney] = useState(""); // honeypot (bots fill this, humans don't)

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
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({ email: email.toLowerCase(), token: APP_TOKEN }),
      });

      setStatus({ state: "success", message: "Thanks! You’re on the list." });
      setEmail("");
    } catch (err) {
      setStatus({
        state: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  }

    const inputClasses =
        size === "compact"
            ? "px-3 py-2 text-sm"
            : "px-4 py-3";

    const buttonClasses =
        size === "compact"
            ? "px-4 py-2 text-sm"
            : "px-6 py-3";
    const formWidthClass =
        size === "compact"
            ? "max-w-sm"
            : "max-w-md";



  return (
    <div className={wrapperClassName}>
      <div className="flex flex-col items-center space-y-4 text-center pointer-events-auto w-full">
        <h2 className={headingClassName}>{heading}</h2>

        <form
          onSubmit={handleSubmit}
          className={`w-full ${formWidthClass} flex flex-col sm:flex-row gap-3 items-center justify-center mx-auto`}
        >
          {/* Honeypot (hidden to humans) */}
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex="-1"
            className="hidden"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
          />

          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            placeholder="please enter your email..."
            className={`w-full sm:flex-1 ${inputClasses} rounded-md border bg-[#fcfcfc] border-black/20 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/30`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={status.state === "error" ? "true" : "false"}
          />

          <button
            type="submit"
            disabled={status.state === "loading"}
            className={`bg-white text-black font-semibold ${buttonClasses} rounded shadow-md hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:hover:scale-100`}
          >
            {status.state === "loading" ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {status.state === "success" && (
          <p className="text-green-900 text-sm">{status.message}</p>
        )}
        {status.state === "error" && (
          <p className="text-red-900 text-sm">{status.message}</p>
        )}

        <p className="text-sm text-black/70 mt-1">
          We’ll only use your email to contact you about SEEHB events. You can
          unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
