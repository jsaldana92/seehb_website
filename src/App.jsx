import React from 'react';
import { HashRouter  as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Schedule from './pages/schedule';
import Media from './pages/media';
import { ScheduleProvider } from './components/schedulecontext';

function App() {
  return (
    <ScheduleProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </Router>
    </ScheduleProvider>

  );
}

export default App;
