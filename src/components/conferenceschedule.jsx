import React from 'react';
import HoverOrTouchHandler from './hoverortouchhandler';
import rohiniImage from '../assets/presenters/rohini.png';
import angelleImage from '../assets/presenters/angelle.png';
import scientistImage from '../assets/images/scientist.png'
import darbyImage from '../assets/presenters/darby.png'
import ansleyImage from '../assets/presenters/ansley.png'
import femalePoster from '../assets/images/poster_female2.png'
import minwooImage from '../assets/presenters/minwoo.png'
import mistryImage from '../assets/presenters/mistry.png'
import graceImage from '../assets/presenters/grace.png'
import giulianaImage from '../assets/presenters/giuliana.png'
import amandaImage from '../assets/presenters/amanda.png'

function KeynoteTile({
  imgSrc = scientistImage,
  imgAlt = 'Presenter',
  presentationTitle,
  time,
  speaker = { firstName: '', lastName: '', institution: '' },
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center my-8 gap-4 px-4">
      {/* Image with hover overlay */}
      <HoverOrTouchHandler>
        {(isHovered) => (
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 drop-shadow-xl">
            <img
              src={imgSrc}
              alt={imgAlt}
              className={`w-full h-full object-cover rounded-lg transition duration-300 ${
                isHovered ? 'brightness-25' : 'brightness-100'
              }`}
            />
            {isHovered && (
              <div className="absolute bottom-2 left-2 text-white text-md font-semibold px-1 py-1">
                <p className="mb-0">{speaker.firstName}</p>
                <p className="mb-0">{speaker.lastName}</p>
                <p className="text-xs mt-1">{speaker.institution}</p>
              </div>
            )}
          </div>
        )}
      </HoverOrTouchHandler>

      {/* Presentation Info Box */}
      <div className="bg-white rounded-[25px] p-4 shadow-md text-black text-center w-[260px] sm:w-[300px] md:w-[360px] lg:w-[1020px]">
        <h3 className="text-lg font-bold leading-snug">{presentationTitle}</h3>
        <p className="text-md font-semibold text-[#00B050] mt-2">{time}</p>
      </div>
    </div>
  );
}

function SpecialTile({
  imgSrc = scientistImage,
  imgAlt = 'Presenter',
  presentationTitle,
  time,
  speaker = { firstName: '', lastName: '', institution: '' },
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center my-8 gap-4 px-4">
      {/* Image with hover overlay */}
      <HoverOrTouchHandler>
        {(isHovered) => (
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 drop-shadow-xl">
            <img
              src={imgSrc}
              alt={imgAlt}
              className={`w-full h-full object-cover rounded-lg transition duration-300 ${
                isHovered ? 'brightness-25' : 'brightness-100'
              }`}
            />
            {isHovered && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-outline-black text-white text-md font-semibold px-1 py-1 text-center">
                <p className="mb-0">{speaker.firstName}</p>
                <p className="mb-0">{speaker.lastName}</p>
                <p className="text-xs mt-1">{speaker.institution}</p>
              </div>
            )}
          </div>
        )}
      </HoverOrTouchHandler>

      {/* Presentation Info Box */}
      <div className="bg-white rounded-[25px] p-4 shadow-md text-black text-center w-[260px] sm:w-[300px] md:w-[360px] lg:w-[1020px]">
        <h3 className="text-lg font-bold leading-snug">{presentationTitle}</h3>
        <p className="text-md font-semibold text-[#00B050] mt-2">{time}</p>
      </div>
    </div>
  );
}


function SpeakerTile({
  imgSrc = scientistImage,
  imgAlt = 'Presenter',
  align = 'left',
  presentationTitle,
  time,
  speaker = { firstName: '', lastName: '', institution: '' },
}) {
  const isLeft = align === 'left';

  return (
    <div
      className={`w-full flex flex-col md:flex-row ${
        isLeft ? '' : 'md:flex-row-reverse'
      } items-center justify-center my-8 gap-6 px-4`}
    >
      {/* Image with hover overlay */}
      <HoverOrTouchHandler>
        {(isHovered) => (
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-50 lg:h-50 drop-shadow-xl">
            <img
              src={imgSrc}
              alt={imgAlt}
              className={`w-full h-full object-cover rounded-lg transition duration-300 ${
                isHovered ? 'brightness-25' : 'brightness-100'
              }`}
            />
            {isHovered && (
              <div
                className={`absolute bottom-2 ${
                    isLeft ? 'left-2 text-left' : 'right-2 text-right'
                } text-white text-md font-semibold space-y-1 px-1 py-1`}
                >
                <p className="mb-0">{speaker.firstName}</p>
                <p className="mb-0">{speaker.lastName}</p>
                <p className="text-xs mt-1">{speaker.institution}</p>
              </div>
            )}
          </div>
        )}
      </HoverOrTouchHandler>

      {/* Presentation Info Box */}
      <div
        className={`bg-white rounded-[25px] p-4 shadow-md text-black text-center ${
          isLeft ? 'sm:text-left' : 'sm:text-right'
        } w-[260px] sm:w-[300px] md:w-[360px] lg:w-[1020px]`}
      >
        <h3 className="text-lg font-bold leading-snug">
          {presentationTitle}
        </h3>
        <p className="text-md font-semibold text-[#00B050] mt-2">{time}</p>
      </div>
    </div>
  );
}

function ScheduleItem({ title, time, blockSide = 'left' }) {
  const isLeft = blockSide === 'left';
  const flexDirection = isLeft ? 'flex-row' : 'flex-row-reverse';
  const alignTime = isLeft ? 'text-left' : 'text-right';

  return (
    <div className="w-full flex justify-center my-6 px-6">
      <div className={`flex ${flexDirection} items-start`}>
        {/* Gray block */}
        <div className="w-3 h-full bg-[#636363]"></div>

        {/* Text block directly hugging the gray block */}
        <div className={`ml-2 mr-2`}>
          <h2 className="text-2xl font-semibold text-black">{title}</h2>
          <p className={`text-md font-semibold text-[#00B050] mt-1 ${alignTime}`}>
            {time}
          </p>
        </div>
      </div>
    </div>
  );
}


function ScheduleTitle({ title }) {
  return (
    <div className="w-full flex flex-col items-center my-8 px-6">
      {/* Top Line */}
      <div className="w-full max-w-xl h-px bg-black mb-4"></div>

      {/* Title */}
      <h2 className="text-2xl md:text-4xl font-semibold text-black text-center">
        {title}
      </h2>

      {/* Bottom Line */}
      <div className="w-full max-w-xl h-px bg-black mt-4"></div>
    </div>
  );
}

export default function ConferenceSchedule() {
  return (
    <div className="w-full bg-[#F0F0F0] py-12 flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-4 px-4">
        <h1 className="text-black text-3xl font-bold inline-block px-4 py-2">
          Indian Creek Lodge
        </h1>
        <p className="text-[#626262] font-semibold mt-0 text-lg">
          900 S Indian Creek Dr, Stone Mountain, GA 30083
        </p>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-black opacity-75 w-1/2 mb-10"></div>

      {/* Schedule Items */}
      <ScheduleItem title="Arrival Breakfast" time="8:30 - 9:00" blockSide="left" />
      <ScheduleItem title="Opening Remarks" time="9:00 - 9:30" blockSide="right" />
      <ScheduleTitle title="Cognition & Social Behavior" />
      <SpeakerTile
        align="left"
        imgSrc={rohiniImage}
        presentationTitle="Metacognitive awareness of abstract rules in rhesus macaques: Monkeys learn abstract rules, and they know it"
        time="10:00 - 10:15"
        speaker={{
            firstName: 'Rohini',
            lastName: 'Murugan',
            institution: 'Emory University',
        }}
      />
      <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4"></div>
      <SpeakerTile
        align="right"
        imgSrc={angelleImage}
        presentationTitle="Can monkeys process multiple stimulus pairs compositionally?"
        time="10:15 - 10:30"
        speaker={{
            firstName: 'Angelle',
            lastName: 'Antoun',
            institution: 'Emory University',
        }}
      />
      <ScheduleItem title="Coffee Break" time="10:30 - 10:45 " blockSide="left" />
      <ScheduleTitle title="Cognition & Social Behavior Cont." />
      <SpeakerTile
        align="left"
        imgSrc={darbyImage}
        presentationTitle="Fission-fusion housing decreases aggression and increases affiliation in zoo-living spider monkeys (Ateles geoffroyi)"
        time="10:45 - 11:00"
        speaker={{
            firstName: 'Darby',
            lastName: 'Proctor',
            institution: 'Florida Insitute of Technology',
        }}
      />
      <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4"></div>
      <SpeakerTile
        align="right"
        imgSrc={ansleyImage}
        presentationTitle="Lack of Association Between Community Social Cohesion and Distribution of Social Capital"
        time="11:15 - 11:30"
        speaker={{
            firstName: 'Ansley',
            lastName: 'Warnock',
            institution: 'University of Georgia',
        }}
      />
      <ScheduleItem title="Poster Teasers" time="11:15 - 11:30" blockSide="right" />
      <ScheduleItem title="Lunch & Photos" time="11:30 - 12:30" blockSide="left" />
      <SpecialTile
        imgSrc={femalePoster}
        presentationTitle="Poster Session"
        time="12:30 - 1:30"
        speaker={{
            firstName: 'See Poster Abstracts',
            //lastName: 'Warnock',
            //institution: 'University of Georgia',
        }}
      />
      <ScheduleTitle title="Development & Ageing" />
      <SpeakerTile
        align="left"
        imgSrc={minwooImage}
        presentationTitle="Grandmaternal Caregiving is Associated with Distinct Multi-Voxel Neural Representation of Grandchildren in the Parental Motivation Circuit"
        time="1:30 - 1:45"
        speaker={{
            firstName: 'Minwoo',
            lastName: 'Lee',
            institution: 'Cornell University',
        }}
      />
      <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4"></div>
      <SpeakerTile
        align="right"
        imgSrc={mistryImage}
        presentationTitle="Grandmaternal Caregiving is Associated with Distinct Multi-Voxel Neural Representation of Grandchildren in the Parental Motivation Circuit"
        time="1:45 - 2:00"
        speaker={{
            firstName: 'Arianna',
            lastName: 'Mistry',
            institution: 'Emory University',
        }}
      />
      <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4"></div>
      <SpeakerTile
        align="left"
        imgSrc={graceImage}
        presentationTitle="Grandmaternal Caregiving is Associated with Distinct Multi-Voxel Neural Representation of Grandchildren in the Parental Motivation Circuit"
        time="2:00 - 2:15"
        speaker={{
            firstName: 'Grace',
            lastName: 'Cayless',
            institution: 'Emory University',
        }}
      />
      <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4"></div>
      <SpeakerTile
        align="right"
        imgSrc={giulianaImage}
        presentationTitle="Diverse pathways through maternal loss for wild orphan chimpanzees (Pan troglodytes schweinfurthii) at Gombe National Park, Tanzania"
        time="2:15 - 2:30"
        speaker={{
            firstName: 'Giuliana',
            lastName: 'Centofanti',
            institution: 'Emory University',
        }}
      />
      <ScheduleItem title="Coffee Break" time="2:30 - 3:30" blockSide="right" />
      <KeynoteTile
        imgSrc={amandaImage}
        presentationTitle="Friendly Foes & Shared Spaces: How primates and people negotiate the risks and rewards of rapidly changing landscapes "
        time="3:00 - 4:00"
        speaker={{
            firstName: 'Amanda',
            lastName: 'Ellwanger',
            institution: 'Georgia State University',
        }}
      />
      <ScheduleItem title="Discussion and Clean-Up" time="4:00- 4:30" blockSide="left" />

    </div>
  );
}
