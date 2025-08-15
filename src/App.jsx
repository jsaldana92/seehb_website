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

const sendPageView = (normalizedPath) => {
  if (!window.gtag) return;

  // Send GA4 page_view event manually
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: normalizedPath,
  });

  // Also update GA’s config to keep session tracking correct
  window.gtag("config", "G-6873JN8D0J", {
    page_path: normalizedPath,
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
          <PageTracker /> {/* Tracks page views */}
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
