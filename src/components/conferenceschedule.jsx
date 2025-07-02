import React from 'react';
import HoverOrTouchHandler from './hoverortouchhandler';
import rohiniImage from '../assets/presenters/rohini.png';
import angelleImage from '../assets/presenters/angelle.png';
import scientistImage from '../assets/images/scientist.png'

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
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-50 lg:h-50">
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
                <p>{speaker.firstName}</p>
                <p>{speaker.lastName}</p>
                <p className="text-sm">{speaker.institution}</p>
              </div>
            )}
          </div>
        )}
      </HoverOrTouchHandler>

      {/* Presentation Info Box */}
      <div
        className={`bg-white rounded-[25px] p-4 shadow-md text-black ${
          isLeft ? 'text-left' : 'text-right'
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
        align="right"
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
        align="left"
        imgSrc={angelleImage}
        presentationTitle="Can monkeys process multiple stimulus pairs compositionally?"
        time="10:15 - 10:30"
        speaker={{
            firstName: 'Angelle',
            lastName: 'Antoun',
            institution: 'Emory University',
        }}
      />
    </div>
  );
}
