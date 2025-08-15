import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Schedule from "./pages/schedule";
import Media from "./pages/media";
import { ScheduleProvider } from "./components/schedulecontext";
import { ConferenceScrollProvider } from "./components/conferencescrollcontext";

// Normalize paths so '/' and '/#/' are the same
const normalizePath = (rawPath) => {
  if (rawPath === "/#" || rawPath === "/#/") return "/";
  if (rawPath.startsWith("/#/")) return rawPath.replace("/#", "");
  return rawPath;
};

// Optional: route -> title mapping for GA
const titleFor = (path) => {
  const map = {
    "/": "SEEHB | Home",
    "/schedule": "SEEHB | Schedule",
    "/media": "SEEHB | Media",
  };
  return map[path] || `SEEHB | ${path}`;
};

const sendPageView = (normalizedPath) => {
  if (!window.gtag) return;

  const page_title = titleFor(normalizedPath);
  const page_location = `https://www.seehb.org${normalizedPath}`; // canonical (no hash)

  window.gtag("event", "page_view", {
    page_title,
    page_location,
    page_path: normalizedPath,
  });

  // Keep GA internal state aligned (helps with session attribution)
  window.gtag("config", "G-6873JN8D0J", {
    page_path: normalizedPath,
    page_title,
  });
};

function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    const { pathname, search, hash } = window.location;
    const rawPath = `${pathname}${search}${hash || ""}`;
    const normalized = normalizePath(rawPath);
    sendPageView(normalized);
  }, [location.pathname, location.search, location.hash]);
  return null;
}

function App() {
  return (
    <ConferenceScrollProvider>
      <ScheduleProvider>
        <Router>
          <PageTracker />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/media" element={<Media />} />
          </Routes>
        </Router>
      </ScheduleProvider>
    </ConferenceScrollProvider>
  );
}

export default App;
