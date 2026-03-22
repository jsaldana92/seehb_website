import React, { useState, useCallback } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { useSchedule } from '../components/schedulecontext';
import { useRef, useEffect } from 'react';
import { useConferenceScroll } from './conferencescrollcontext';


import HoverOrTouchHandler from './hoverortouchhandler';
import scientistImage from '../assets/images/scientist.png'
import femalePoster from '../assets/images/poster_female2.png'
import minwooImage from '../assets/presenters/minwoo.png'
import graceImage from '../assets/presenters/grace.png'
import sophiaImage from '../assets/presenters/sophia.png'
import marianaImage from '../assets/presenters/mariana.png'
import vieiraImage from '../assets/presenters/vieira.png'
import mattImage from '../assets/presenters/post-doc matt.png'
import lauraImage from '../assets/presenters/laura.jpg'



function KeynoteTile({
  imgSrc = scientistImage,
  imgAlt = 'Presenter',
  presentationTitle,
  time,
  hoverSpeaker = { firstName: '', lastName: '', institution: '' },
  abstractTitle = '',
  authors = [],
  institutions = [],
  abstractText = '',
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center my-8 gap-4 px-4">
      {/* Speaker image with hover */}
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
                <p className="mb-0">{hoverSpeaker.firstName}</p>
                <p className="mb-0">{hoverSpeaker.lastName}</p>
                <p className="text-xs mt-1">{hoverSpeaker.institution}</p>
              </div>
            )}
          </div>
        )}
      </HoverOrTouchHandler>

      {/* Presentation Info Box */}
      {!showDetails ? (
        <div
          className="bg-white rounded-[25px] p-4 shadow-md text-black text-center w-[260px] sm:w-[300px] md:w-[360px] lg:w-[1020px] cursor-pointer"
          onClick={() => setShowDetails(true)}
        >
          <h3 className="text-lg font-bold leading-snug">{presentationTitle}</h3>
          <p className="text-md font-semibold text-[#00B050] mt-2">{time}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 w-full max-w-4xl mt-4">
          <h2 className="text-2xl font-bold text-center mb-2">{abstractTitle}</h2>

          {/* Authors */}
          <p className="text-md text-gray-800 font-semibold text-center">
            {authors.map((author, i) => (
              <span key={i}>
                {author.name}
                <sup>{author.affiliationNumber}</sup>
                {i < authors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>

          {/* Institutions */}
          <p className="text-sm text-gray-600 italic text-center mt-2 mb-4">
            {institutions.map((inst, i) => (
              <span key={i}>
                <sup>{inst.number}</sup> {inst.name}
                {i < institutions.length - 1 ? '; ' : ''}
              </span>
            ))}
          </p>

          {/* Abstract Text */}
          <p className="text-md text-black mt-2 text-center">{abstractText}</p>

          <button
            onClick={() => setShowDetails(false)}
            className="mt-6 px-4 py-2 bg-[#F6BB17] text-black font-bold rounded-full hover:bg-yellow-400"
          >
            Close Abstract
          </button>
        </div>
      )}
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
    const { setSelectedDay, setTriggerScrollToTop, setPosterRedirected } = useSchedule();

    const handleClick = () => {
    setPosterRedirected(true);         
    setTriggerScrollToTop(true);
    setSelectedDay('poster');
    };

  return (
    <div
      className="w-full flex flex-col items-center justify-center my-8 gap-4 px-4 cursor-pointer"
      onClick={handleClick}
    >
      {/* Image */}
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

      {/* Presentation Info */}
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
  hoverSpeaker = { firstName: '', lastName: '', institution: '' },
  abstractTitle = '',
  authors = [],
  institutions = [],
  abstractText = '',
}) {
  const [showDetails, setShowDetails] = useState(false);
  const isLeft = align === 'left';

  if (showDetails) {
    return (
        <div
        className={`w-full flex flex-col md:flex-row ${
            isLeft ? '' : 'md:flex-row-reverse'
        } items-center justify-center my-8 gap-6 px-4`}
        >
        {/* Hoverable Speaker Image with Overlay */}
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
                <div
                    className={`absolute bottom-2 ${
                    isLeft ? 'left-2 text-left' : 'right-2 text-right'
                    } text-white text-md font-semibold space-y-1 px-1 py-1`}
                >
                    <p>{hoverSpeaker.firstName}</p>
                    <p>{hoverSpeaker.lastName}</p>
                    <p className="text-xs">{hoverSpeaker.institution}</p>
                </div>
                )}
            </div>
            )}
        </HoverOrTouchHandler>

        {/* Abstract Content */}
        <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
            <h2 className="text-2xl font-bold text-center mb-2">{abstractTitle}</h2>

            <p className="text-md text-gray-800 font-semibold text-center">
            {authors.map((author, i) => (
                <span key={i}>
                {author.name}
                <sup>{author.affiliationNumber}</sup>
                {i < authors.length - 1 ? ', ' : ''}
                </span>
            ))}
            </p>

            <p className="text-sm text-gray-600 italic text-center mt-2 mb-4">
            {institutions.map((inst, i) => (
                <span key={i}>
                <sup>{inst.number}</sup> {inst.name}
                {i < institutions.length - 1 ? '; ' : ''}
                </span>
            ))}
            </p>

            <p className="text-md text-black mt-2 text-center">{abstractText}</p>

            <button
            onClick={() => setShowDetails(false)}
            className="mt-6 px-4 py-2 bg-[#F6BB17] text-black font-bold rounded-full hover:bg-yellow-400"
            >
            Close Abstract
            </button>
        </div>
        </div>
    );
  }



  return (
    <div
      className={`w-full flex flex-col md:flex-row ${
        isLeft ? '' : 'md:flex-row-reverse'
      } items-center justify-center my-8 gap-6 px-4`}
    >
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
              <div
                className={`absolute bottom-2 ${
                  isLeft ? 'left-2 text-left' : 'right-2 text-right'
                } text-white text-md font-semibold space-y-1 px-1 py-1`}
              >
                <p>{hoverSpeaker.firstName}</p>
                <p>{hoverSpeaker.lastName}</p>
                <p className="text-xs">{hoverSpeaker.institution}</p>
              </div>
            )}
          </div>
        )}
      </HoverOrTouchHandler>

      {/* White square box */}
      <div
        className={`cursor-pointer bg-white rounded-[25px] p-4 shadow-md text-black text-center ${
          isLeft ? 'sm:text-left' : 'sm:text-right'
        } w-[260px] sm:w-[300px] md:w-[360px] lg:w-[1020px]`}
        onClick={() => setShowDetails(true)}
      >
        <h3 className="text-lg font-bold leading-snug">{presentationTitle}</h3>
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

  const conferenceHeaderRef = useRef();
    const {
    triggerConferenceScroll,
    setTriggerConferenceScroll,
    conferenceRedirected,
    setConferenceRedirected,
    selectedDay,
  } = useConferenceScroll();

  useEffect(() => {
    if (
      selectedDay === 'conference' &&
      triggerConferenceScroll &&
      conferenceRedirected &&
      conferenceHeaderRef.current
    ) {
      let lastTop = -1;
      let stableCount = 0;
      const maxStableChecks = 5; // how many consistent readings = "stable"
      const interval = 50;       // ms between checks

      const intervalId = setInterval(() => {
        const top = conferenceHeaderRef.current.getBoundingClientRect().top;

        if (top === lastTop) {
          stableCount++;
        } else {
          stableCount = 0;
          lastTop = top;
        }

        if (stableCount >= maxStableChecks) {
          clearInterval(intervalId);
          conferenceHeaderRef.current.scrollIntoView({ behavior: 'smooth' });
          setTriggerConferenceScroll(false);
          setConferenceRedirected(false);
        }
      }, interval);

      return () => clearInterval(intervalId); // cleanup
    }
}, [triggerConferenceScroll, conferenceRedirected, selectedDay]);

  
  return (
    <div className="w-full bg-[#F0F0F0] py-12 flex flex-col items-center">
      {/* Title */}
      <div ref={conferenceHeaderRef} className=" text-center mb-4 px-4">
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
      <ScheduleItem title="Arrival/Breakfast" time="8:30 - 9:15" blockSide="left" />
      <ScheduleItem title="Intro/Opening Remarks" time="9:15 - 9:30" blockSide="right" />
      <ScheduleItem title="Lightning Slides" time="9:30 - 10:00" blockSide="left" />

      <ScheduleTitle title="Morning Session" />
      <SpeakerTile
        align="left"
        imgSrc={minwooImage}
        presentationTitle="Helping Is Associated With a Younger Brain Age"
        time="10:00 - 10:15"
        hoverSpeaker={{
            firstName: 'Minwoo',
            lastName: 'Lee',
            institution: 'Georgetown University',
        }}
        abstractTitle="Helping Is Associated With a Younger Brain Age"
        authors={[
            { name: 'Minwoo Lee', affiliationNumber: 1 },
            { name: 'Casey K. Brown', affiliationNumber: 1 },
        ]}
        institutions={[
            { number: 1, name: 'Department of Psychology, Georgetown University' },
        ]}
        abstractText="Traditional evolutionary models often frame prosocial behavior as a costly trade-off between individual resources and inclusive fitness. However, in obligately interdependent species like humans, sustained investment in others may promote the provider’s own longevity by downregulating stress-related pathways and enhancing somatic maintenance. We tested this hypothesis by investigating whether social support provision prospectively predicts BrainAGE, a machine-learning-derived biomarker of neurobiological senescence, in mid-to-late adulthood. Using a nationally representative sample from the Midlife in the United States (MIDUS) study (N = 194; mean age 55.9 ± 13 years), we estimated the gap between predicted brain age (derived from T1-weighted MRI scans of gray and white matter) and chronological age. Hierarchical regression and bootstrapping analyses revealed that greater hours spent providing social support predicted a significantly 'younger' brain age gap. Crucially, this association remained robust after controlling for demographic factors, health status, lifestyle, and even the amount of social support received from others. Exploratory analysis further revealed that emotional support provision was a stronger and more reliable predictor of younger brain age than instrumental assistance, suggesting that the neurobiological benefits of prosociality may be specifically tied to socio-affective engagement among close others. These findings suggest that helping others may act as a behavioral pathway for neurobiological resilience, offering an evolutionary perspective on prosociality not as a net cost, but as a mechanism for extending the functional lifespan of the brain in social species."
      />
      <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4"></div>

      <SpeakerTile
        align="right"
        imgSrc={graceImage}
        presentationTitle="Fur Rubbing as a Potential Resilience Protective Factor in Tufted Capuchin Monkeys (Sapajus spp.)"
        time="10:15 - 10:30"
        hoverSpeaker={{
            firstName: 'Grace',
            lastName: 'Weyman-Heller',
            institution: 'Georgia State University',
        }}
        abstractTitle="Fur Rubbing as a Potential Resilience Protective Factor in Tufted Capuchin Monkeys (Sapajus spp.)"
        authors={[
            { name: 'Grace Weyman-Heller', affiliationNumber: '1, 2' },
            { name: 'Sarah F. Brosnan', affiliationNumber: '1, 2, 3, 4' },
        ]}
        institutions={[
            { number: 1, name: 'Department of Psychology, Georgia State University, Atlanta, GA, U.S.A.' },
            { number: 2, name: 'Language Research Center, Georgia State University, Atlanta, GA, U.S.A.' },
            { number: 3, name: 'Neuroscience Institute, Georgia State University, Atlanta, GA, U.S.A.' },
            { number: 4, name: 'Center for Behavioral Neuroscience, Georgia State University, Atlanta, GA, U.S.A.' },
        ]}
        abstractText="Resilience, the ability to maintain or regain stability following adversity, offers a promising direction for animal welfare by emphasizing animals’ natural capacity to cope with stressors. Central to resilience are protective factors that prepare individuals for negative events or facilitate efficient recovery. Identifying such factors in animals may allow them greater autonomy over their affective states during unavoidable stress. In the present study, we investigated fur rubbing as a potential protective factor in 13 captive tufted capuchin monkeys (Sapajus spp.) using both cognitive and behavioral measures. We predicted that fur rubbing would improve working memory performance, particularly under higher task difficulty, and increase tolerance to a mild behavioral stressor. Contrary to predictions, fur rubbing did not significantly affect cognitive performance (b = –0.03, SE = 0.07, z = –0.47, p = .64) or stressor tolerance (b = 0.06, SE = 0.13, z = 0.43, p = .67). However, tolerance increased across sessions regardless of condition, consistent with habituation (b = 0.10, SE = 0.02, z = 4.00, p < .001). Future research should parse apart the biological, affective, and social components of fur rubbing to better evaluate its potential as a protective factor. More broadly, this work provides a framework for leveraging species-typical behaviors to support resilience and welfare, rather than relying solely on externally imposed enrichment. By linking behavior to its potential adaptive and evolutionary significance, intrinsic coping strategies can be identified and used directly to inform welfare practices in captive primates."
      />

      <ScheduleItem title="Coffee Break" time="10:30 - 11:00" blockSide="left" />

      <ScheduleTitle title="Morning Session Cont." />
      <SpeakerTile
        align="left"
        imgSrc={sophiaImage}
        presentationTitle="Audience-Dependent Suppression of High-Arm Grooming in Wild Adult Chimpanzees"
        time="11:00 - 11:15"
        hoverSpeaker={{
            firstName: 'Sophia',
            lastName: 'Kurilla',
            institution: 'Emory University',
        }}
        abstractTitle="Audience-Dependent Suppression of High-Arm Grooming in Wild Adult Chimpanzees"
        authors={[
            { name: 'Sophie E. Kurilla' },
            { name: 'Claudia Wilke' },
            { name: 'Matthew J. Lem' },
            { name: 'Zarin P. Machanda' },
            { name: 'Melissa Emery Thompson' },
            { name: 'Martin N. Muller' },
            { name: 'Richard W. Wrangham' },
            { name: 'Katie Slocombe' },
        ]}
        institutions={[]}
        abstractText="High-arm grooming (HAG) is a distinctive social grooming posture in chimpanzees (Pan troglodytes) whose variable occurrence across communities has raised questions about the functions it may serve. Here, we use 15 years of observational data (N = 16,044 grooming bouts) on wild adult chimpanzees in the Kanyawara community, where HAG is a common, near-daily behavior, to test whether HAG functions as an advertising signal. We tested if HAG, as a visually salient form of grooming, advertises social relationships to third-party observers, drawing attention to grooming with high-value partners. We found no support for this social advertising function: HAG was significantly less likely to occur during grooming when an adult audience was present (Binomial GLMM (logit): β = −0.52, p < 0.001), particularly when high-ranking adult males were in the audience (β = −0.25, p < 0.001), and its occurrence significantly declined with increasing party size (β = −0.22, p < 0.001). When an audience was present, HAG was significantly less likely during intersex grooming when the female partner was in estrus (β = −1.28, p < 0.001). Together, our findings suggest an audience-dependent suppression of HAG and that instead of using HAG to draw social attention to grooming events, chimpanzees may be sensitive to the social risk of grooming interruption or aggression."
      />
      <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4"></div>

      <SpeakerTile
        align="right"
        imgSrc={marianaImage}
        presentationTitle="Rise of the Ape Knappers: Experimental Stone Flaking in Chimpanzees"
        time="11:15 - 11:30"
        hoverSpeaker={{
            firstName: 'Mariana',
            lastName: 'Bicalho Maia Correia',
            institution: 'Emory University',
        }}
        abstractTitle="Rise of the Ape Knappers: Experimental Stone Flaking in Chimpanzees"
        authors={[
            { name: 'Mariana B. M. Correia' },
        ]}
        institutions={[
            { name: 'Emory University' },
        ]}
        abstractText="Understanding the emergence of stone tool technology is limited by our inability to directly study extinct toolmakers, making comparative data from modern humans and our closest living relatives essential for insights into early technological capacities. Published attempts to train great apes to knap have largely failed (chimpanzees, gorillas, Bandini & Tennie, 2023), with minimal success in orangutans (3 flakes, Motes-Rodrigo et al., 2022) and only one substantial sample from bonobos (2 individuals, 321 pieces, Toth et al., 2006). This is the first study to successfully train chimpanzees to flake basalt nodules for reward and the largest number of successfully trained apes of any species, with five individuals producing >1,000 detached pieces to date from an initial cohort of 21. The most productive individual (58 sessions, ~29 hours) showed increasing detached pieces (R=0.6, p<0.0001) and whole flakes (R = 0.53, p<0.001). When compared to published archaeological and experimental data (Režek et al., 2018; Stout et al., 2019), chimpanzees produced a greater number of whole flakes than Oldowan and adult novices, but with minimal core reduction. Flakes were significantly smaller and thinner, and platform angles were increased rather than optimized (R=0.17, p<0.05), with no evidence of strategic angle selection. These morphometric differences enabled 99.5% classification accuracy between chimpanzee and Oldowan assemblages, confirming distinct technological signatures. Like human children (Kilgore et al., 2025), chimpanzees show weaker blows and limited core affordance perception despite available strength. This substantial sample now enables further investigating cognitive, behavioral, and neural basis in stone tool technology."
      />

      <ScheduleItem title="Photos" time="11:30 - 11:45" blockSide="right" />
      <ScheduleItem title="Lunch" time="11:45 - 12:30" blockSide="left" />

      <SpecialTile
       //setSelectedDay={setSelectedDay}
        imgSrc={femalePoster}
        presentationTitle="Poster Session"
        time="12:30 - 2:00"
        speaker={{
            firstName: 'See Poster Abstracts',
        }}
      />
            <ScheduleTitle title="Afternoon Session" />
      <SpeakerTile
        align="left"
        imgSrc={vieiraImage}
        presentationTitle="Development of Explorative Search and Risk Tolerance in BaYaka, Bandongo, and German Children"
        time="2:00 - 2:15"
        hoverSpeaker={{
            firstName: 'Wilson',
            lastName: 'Vieira',
            institution: 'Georgia State University',
        }}
        abstractTitle="Development of Explorative Search and Risk Tolerance in BaYaka, Bandongo, and German Children"
        authors={[
            { name: 'Wilson Vieira', affiliationNumber: '1, 3' },
            { name: 'Luke Maurits', affiliationNumber: 1 },
            { name: 'Ardain Dzabatou', affiliationNumber: 2 },
            { name: 'Daniel Haun', affiliationNumber: 1 },
            { name: 'Sarah Pope-Caldwell', affiliationNumber: '3, 4' },
        ]}
        institutions={[
            { number: 1, name: 'Department of Comparative Cultural Psychology, Max Planck Institute for Evolutionary Anthropology, Leipzig, Germany' },
            { number: 2, name: 'Université Marien Ngouabi' },
            { number: 3, name: 'Department of Psychology, Georgia State University, Atlanta, Georgia' },
            { number: 4, name: 'Language Research Center, Georgia State University, Atlanta, Georgia' },
        ]}
        abstractText="Human adaptability relies on our ability to balance between safer and riskier behaviors according to environmental demands. Learning to avoid unnecessary or immoderate risks is indispensable for human decision-making. However, risky scenarios may also present opportunities to obtain valuable rewards. To properly exploit these opportunities when they emerge, humans need to be willing to: 1) explore their environments to find such opportunities (e.g., experimenting with new strategies), and 2) take risks and implement novel, and often unknown strategies. To investigate how these mechanisms influence human adaptive decision-making and how they develop, the present study investigates the development of explorative tendencies and risk preferences in children (ages 4 to 14) from three cultural contexts: urban Germans, hunter-gatherer BaYaka from the Republic of the Congo (ROC), and fisher-horticulturalist Bandongo from the ROC. These three communities present distinct subsistence-dependent food security levels, which has been shown to impact human willingness to explore and take risks. Additionally, we expected to observe a decrease in exploration and risk taking with age. Our data show higher exploration rates in German children than in Congolese children, corroborating results from previous research between communities with different levels of market integration. Additionally, while Congolese children become more risk-prone with age, German children become less so. These results highlight the multifaceted nature of risk preference. Interestingly, children across all three cultures and all ages become more risk-prone once they accumulate rewards, indicating a broader underlying mechanism of human risk-taking. This latter result points toward the idea that human risk-taking behaviors may generally be guided by our ability to build and use safety nets which promotes risk preference."
      />
      <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4"></div>

      <SpeakerTile
        align="right"
        imgSrc={mattImage}
        presentationTitle="Female, but not Male, Capuchins Demonstrate Transitive Inference and the Symbolic Distance Effect in Transitive Inference List Task"
        time="2:15 - 2:30"
        hoverSpeaker={{
            firstName: 'Matthew',
            lastName: 'Babb',
            institution: 'Georgia State University',
        }}
        abstractTitle="Female, but not Male, Capuchins Demonstrate Transitive Inference and the Symbolic Distance Effect in Transitive Inference List Task"
        authors={[
            { name: 'Matthew H. Babb', affiliationNumber: '1, 2' },
            { name: 'Olga Lazareva', affiliationNumber: 3 },
            { name: 'Sarah F. Brosnan', affiliationNumber: '1, 2, 4, 5' },
        ]}
        institutions={[
            { number: 1, name: 'Department of Psychology, Georgia State University, Atlanta, GA, U.S.A.' },
            { number: 2, name: 'Language Research Center, Georgia State University, Atlanta, GA, U.S.A.' },
            { number: 3, name: 'Department of Psychology and Neuroscience, Drake University, Des Moines, IA, U.S.A.' },
            { number: 4, name: 'Neuroscience Institute, Georgia State University, Atlanta, GA, U.S.A.' },
            { number: 5, name: 'Center for Behavioral Neuroscience, Georgia State University, Atlanta, GA, U.S.A.' },
        ]}
        abstractText="Deductive reasoning enables both human and non-human animals to draw novel conclusions from existing information, and one well-studied form of this ability is transitive inference (TI). TI allows individuals to infer relationships that are never explicitly observed, a capacity that may be especially advantageous in navigating the complexities of social hierarchies. While this capacity has been demonstrated in some primates, many tests cannot rule out simpler associative explanations. Here we tested whether capuchin monkeys (Sapajus spp.) would use TI to correctly infer the position of items within a 7-item sequence using a recently developed methodology that accounts for alternative associative explanations while also providing a stringent test for the symbolic distance effect, in which subjects perform better on pairs of items that are further apart on the list. Subjects were trained on the seven items in three overlapping sequences (ABC, CDE, EFG). During testing, they then had to sequence every possible pair from the seven items, which included both within-list (e.g., AB, BC, AC) and between-list pairs (e.g., AE, DF, CG). Our critical test was the pairs with the middle position items (BD, DF, DF) because they can only be solved by integrating training sequences into a single unified list. Females, but not males, correctly sequenced these critical pairs during testing, suggesting integration. Furthermore, females exhibited a symbolic distance effect, showing higher accuracy on the BF pair than on the BD or DF pairs, while male performance did not differ across the pair types. Our results suggest that at least some capuchins do have the ability to make transitive inferences, but the degree to which they employ this ability may differ based on sex. This provides support for the hypothesis that deductive reasoning may differ based on context."
      />

      <ScheduleItem title="Coffee Break" time="2:30 - 2:45" blockSide="left" />

      <ScheduleTitle title="Keynote" />
      <KeynoteTile
        imgSrc={lauraImage}
        presentationTitle="TBD Title"
        time="2:45 - 3:45"
        hoverSpeaker={{
            firstName: 'Laura',
            lastName: 'van Holstein',
            institution: 'Emory University',
        }}
        abstractTitle="TBD Title"
        authors={[
            { name: 'Laura van Holstein' },
        ]}
        institutions={[
          { number: '', name: 'Emory University' },
        ]}
        abstractText="TBD Abstract"
      />

      <ScheduleItem title="Closing & Awards" time="3:45 - 4:00" blockSide="right" />
      <ScheduleItem title="Clean-Up" time="4:00 - 4:30" blockSide="left" />

    </div>
  );
}
