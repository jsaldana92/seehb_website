import React from 'react';
import Title from '../components/title';
import About from '../components/about';
import DayCards from '../components/daycards';
import Directions from '../components/directions';
import Directions2 from '../components/directions2';
import Institutions from '../components/institutions';
import SteeringCommittee from '../components/steeringcommittee';
import BottomRSVP from '../components/bottomrsvp';
import SteeringCommittee_rsvp from '../components/steeringcommittee_rsvp';


export default function Home() {
  return (
    <div>
      <Title />
      <About />
      <DayCards />
      <Directions2 />
      <Institutions />
      <SteeringCommittee_rsvp />
      {/*<SteeringCommittee />
      <BottomRSVP />*/}
      
      {/* More sections will go here */}
      
    </div>
  );
}
