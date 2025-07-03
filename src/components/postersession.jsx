import React, { useState, useEffect, useRef } from 'react';
import HoverOrTouchHandler from './hoverortouchhandler';
import scientistImage from '../assets/images/scientist.png'
import amberImage from '../assets/presenters/amber.png'
import danImage from '../assets/presenters/dan.png'
import dorothyImage from '../assets/presenters/dorothy.png'
import fedeImage from '../assets/presenters/fede.png'
import gracewhImage from '../assets/presenters/gracewh.png'
import phoenixImage from '../assets/presenters/phoenix.png'
import { useSchedule } from '../components/schedulecontext';


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


const ScheduleTitle = React.forwardRef(({ title, subtitle }, ref) => {
  return (
    <div ref={ref} className="w-full flex flex-col items-center my-8 px-6">
      {/* Top Line */}
      <div className="w-full max-w-xl h-px bg-black mb-4"></div>

      {/* Title */}
      <h2 className="text-2xl md:text-4xl font-semibold text-black text-center">
        {title}
      </h2>

      {/* Optional Subtitle */}
      {subtitle && (
        <p className="text-md md:text-lg font-medium text-[#00B050] text-center mt-2">
          {subtitle}
        </p>
      )}

      {/* Bottom Line */}
      <div className="w-full max-w-xl h-px bg-black mt-4"></div>
    </div>
  );
});

ScheduleTitle.displayName = 'ScheduleTitle';

export default function PosterSession() {
  const { triggerScrollToTop, setTriggerScrollToTop } = useSchedule();

  const posterHeaderRef = useRef();
  console.log("✅ Schedule context:", { triggerScrollToTop, setTriggerScrollToTop });

  useEffect(() => {
      console.log('triggerScrollToTop', triggerScrollToTop);
      console.log('posterHeaderRef', posterHeaderRef.current);
    if (triggerScrollToTop && posterHeaderRef.current) {
      setTimeout(() => {
        posterHeaderRef.current.scrollIntoView({ behavior: 'smooth' });
        setTriggerScrollToTop(false);
      }, 50); // Short delay ensures DOM is mounted
    }
  }, [triggerScrollToTop]);
  const posters = [
    {
      imgSrc: gracewhImage,
      presentationTitle: 'Social Facilitation in Eastern and Asian Box Turtles (Terrapene carolina carolina and Cuora mccordi)',
      hoverSpeaker: { firstName: 'Grace', lastName: 'Wayman-Heller', institution: 'Georgia State University' },
      abstractTitle: 'Social Facilitation in Eastern and Asian Box Turtles (Terrapene carolina carolina and Cuora mccordi)',
      authors: [
        { name: 'Grace Waymen-Heller', affiliationNumber: 1 },
        { name: 'Sierra M.V. Simmons', affiliationNumber: '2, 3' },
        { name: 'Joseph Mendelson III', affiliationNumber: 1 },
        { name: 'Sarah F. Brosnan', affiliationNumber: 1 },
      ],
      institutions: [
        { number: 1, name: 'Department of Psychology, Georgia State University' },
        { number: 2, name: 'Zoo Atlanta' },
        { number: 3, name: 'Georgia Institute of Technology' },
    ],
      abstractText: 'Social facilitation, a social learning strategy, refers to an increase in the frequency of a behavior in the presence of conspecifics performing the same behavior simultaneously. Understanding the extent of social facilitation across a diversity of taxa can provide insights into the evolution of social learning mechanisms and their adaptive significance across species. While well-documented in mammals and birds, its generality across other taxa remains understudied. To address this gap, we investigated whether social facilitation influenced feeding behaviors in 10 eastern box turtles (Terrapene carolina carolina) and 9 Asian box turtles (Cuora mccordi), all housed at Zoo Atlanta. Using a modified methodology of Visalberghi and Fragaszy (1999), we assessed whether turtles consumed novel (color-dyed) food faster when observing conspecifics eating familiar (the same noncolor-dyed) food or when in the presence of non-feeding individuals. We hypothesized that the turtles would more readily inspect and consume food when visible conspecifics were eating, indicating social facilitation. However, linear mixed models revealed no significant effect of condition on feeding behavior in either species. Friedman paired ANOVAs indicated that session number significantly influenced several aspects of feeding behavior, including latency to inspect and eat, duration of food inspection and consumption, and the latency between inspection and eating (eastern box turtles: X² range = 54.43–82.51, df = 2, p < 0.001; Asian box turtles: X² range = 20.61–72.78, df = 2, p < 0.001). These findings suggest that turtles’ feeding behavior was not driven by social facilitation within this experimental context. However, limitations such as degree of food novelty or potential social dynamics, like competition, may have influenced the results. These factors should be addressed in future studies to further determine whether these species possess the evolutionary precursors to more complex forms of social learning like those observed in other vertebrate groups.',
    },
    {
      imgSrc: amberImage,
      presentationTitle: 'Causes of Mortality in Wild Chimpanzees: A Comparative Analysis Across Four Field Sites',
      hoverSpeaker: { firstName: 'Amber', lastName: 'Shaw', institution: 'Emory University' },
      abstractTitle: 'Causes of Mortality in Wild Chimpanzees: A Comparative Analysis Across Four Field Sites',
      authors: [
        { name: 'Amber Shaw'},
        { name: 'Elizabeth V. Lonsdorf'}
        ],
      institutions: [{name: 'Department of Anthropology, Emory University' }],
      abstractText: 'Comparative data on wild chimpanzee mortality causes are lacking, due to high levels of animal disappearance and varying attribution of causes, making it difficult to compare trends across sites and life history stages. To address this, we standardized attributed causes of death and age classifications using published data from four long-term field sites: Gombe (Tanzania), Kanyawara (Uganda), Mahale (Tanzania), and Tai (Ivory Coast). Illness is the leading cause of death among wild chimpanzees at Gombe, Kanyawara and Mahale, while predation dominates at Tai. Conspecific aggression is the second leading cause of death at Gombe and Mahale but is rare at Kanyawara and Tai. Predation, a major cause of death at both Tai and Mahale, is virtually absent at Gombe and Kanyawara. Human-caused mortality, such as poaching and  snares, is more frequent at Tai and Kanyawara but less so at Gombe and Mahale. We also examined death due to respiratory illness in more depth. At Mahale and Tai, infants are the  post affected age group. Infants are also disproportionally affected at Kanyawara and Gombe, but individuals of old age (30+) are most affected. Juveniles (5-10) are relatively less affected at all sites. At Kanyawara and Mahale, this reduced risk extends into adolescence (~10–15), with mortality rising again in early adulthood (~15). In contrast, at Gombe and Tai, adolescents frequently die due to respiratory illness. Differences in life expectancy reflect patterns of site-specific mortality. Chimpanzees at Gombe and Kanyawara tend to live longer than those at Mahale and Tai, likely due to higher historical rates of predation, poaching, and infant mortality at the latter sites.',
    },
    {
      imgSrc: dorothyImage,
      presentationTitle: 'Assessing Vigilance Behavior in Wild Bearded Capuchin Monkeys (Sapajus Libidinosus)',
      hoverSpeaker: { firstName: 'Dorothy', lastName: 'Fragaszy ', institution: 'University of Georgia' },
      abstractTitle: 'Assessing Vigilance Behavior in Wild Bearded Capuchin Monkeys (Sapajus Libidinosus)',
      authors: [
        { name: 'Dorothy. M. Fragaszy'},
        { name: 'Emily S. Garner'},
        ],
      abstractText: 'We used a fixed water source to study vigilance during drinking in wild bearded capuchin monkeys. We recorded individual monkeys (N = 27) drinking water from a bowl attached to a platform mounted in a tree. The monkeys had to lower their eyes below the rim of the bowl to drink. The set-up permitted clear operational definitions for looking away from the bowl, into the bowl, and drinking. The method can support experimental probing of vigilance across conditions and populations. We present normative descriptions of looking behavior by the monkeys in this situation. Our findings largely replicate those of another study of capuchin monkeys using a similar design.',
    },
    {
      imgSrc: fedeImage,
      presentationTitle: 'AI Gone Wild: The Present and Future of Machine Learning Methods to Study Primate Cognition and Behavior in the Field',
      hoverSpeaker: { firstName: 'Federico ', lastName: 'Sánchez Vargas', institution: 'Emory University' },
      abstractTitle: 'AI Gone Wild: The Present and Future of Machine Learning Methods to Study Primate Cognition and Behavior in the Field',
      authors: [
        { name: 'Federico Sánchez Vargas', affiliationNumber: 1 },
        { name: 'Sai Rakshith Potluri', affiliationNumber: 2 },
        { name: 'Dora Biro', affiliationNumber: 2 },
        { name: 'Marcela Benítez', affiliationNumber: 1 },
        ],
      institutions: [
        { number: 1, name: 'Department of Anthropology, Emory University' },
        { number: 2, name: 'Department of Computer Science, Georgia Institute of Technology' },
        { number: 3, name: 'Department of Biology, University of Rochester' }
        ],
      abstractText: 'Lab experimentation has rendered great insights into primates’ cognitive abilities, yet falls short of demonstrating how these highly intelligent animals perceive, understand, and choose to act in the environments they evolved in. The key challenge thus far is that while behavior is directly observable, the cognitive abilities and operations behind it are not. Up until now, technical limitations have prevented us from directly testing for cognitive abilities in the wild — but emerging machine vision (AI) models now promise to allow us to investigate, for the very first time, how primates’ minds work in their natural settings. How might such technology be leveraged to advance the study of cognition in the wild? Here, I will present on various ways in which machine learning can be and already is being used to automate or facilitate processes such as behavior coding, body pose estimation, and image classification, among others. I will specifically focus on two ongoing projects: 1) the use of DeepLabCut, a user-friendly and rapidly trainable model for marker-less pose estimation, and Anipose to track the gaze of multiple common marmoset monkeys (Callithrix jacchus) in a 3-dimensional space participating in unconstrained, naturalistic foraging; and 2) the development of a novel facial recognition model to be implemented at cognitive touchscreen testing platforms in a wild population of wild-face capuchins (Cebus imitator) that will allow for the collection of multi-timepoint data on cognitive performance across various individuals from multiple groups. Crucially, this data can be collected even in the absence of a researcher, as the model will automate monkey ID, individualized testing administration, and reward dispensation. Finally, I will discuss crucial future directions for machine learning research into wild primate cognition, highlighting its promise for more effective and standardized protocols for interspecific comparative work.',
    },
    {
      imgSrc: phoenixImage,
      presentationTitle: 'Hati-hati, Monyet: Designing a Primate Conservation Education Program for Elementary School Students in Sulawesi, Indonesia',
      hoverSpeaker: { firstName: 'Phoenix ', lastName: 'Rosso', institution: 'Gergia State Univserity - Perimeter' },
      abstractTitle: 'Hati-hati, Monyet: Designing a Primate Conservation Education Program for Elementary School Students in Sulawesi, Indonesia',
      authors: [
        { name: 'Phoenix Rosso'},
        { name: 'Marijahma Aset El-Holloway'},
        { name: 'Santiago Balbin'},
        { name: 'Agung D. Putra'},
        { name: 'Esya A.A. Umarah'},
        { name: 'Amanda L. Ellwanger'},
        ],
      abstractText: 'It is important to introduce children to wildlife conservation topics to foster an appreciation of ecological and biological diversity while gaining awareness of threats endangered species face. We report on the development of a primate conservation education program (PCEP), highlighting methods used to engage children in environmental education, and emphasize the importance of international collaboration. Our program, “Hati-Hati, Monyet” (Bahasa Indonesia for “Be careful, monkey”), aims to increase awareness of local primates and highlight safe human-wildlife interactions for elementary students in Sulawesi, Indonesia. We focus on two threatened, endemic primate species: the moor macaque (Macaca maura) and the Makassar tarsier (Tarsius fuscus). Our PCEP incorporates age-appropriate movement games, arts and crafts activities, and take-home resources that appeal to visual and kinesthetic learners. Our team includes faculty and students from Georgia State University, USA in collaboration with students from Hasanuddin University, Indonesia, who provided intercultural fluency and local stakeholder input. Although the long-term evaluation of our efforts are unmeasured, the immediate short-term impact assessment was positive from both students and teachers alike, indicating that it is a successful outreach exercise with the potential to inspire the next generation to learn about, conserve, and protect local endemic species. Critically, by developing the program collaboratively, our Indonesian team has continued to facilitate “Hati-Hati, Monyet” in schools after the USA team returned home, demonstrating long-term feasibility. Our team gained experience communicating across language barriers, adapting concepts for cross-cultural contexts, motivating and engaging school-aged children in educational outreach, and organizing information for various audiences.',
    },
    {
      imgSrc: danImage,
      presentationTitle: 'An Eye and a Half for an Eye: Cognitive Approaches to the Selection of Punishment Types and Amounts',
      hoverSpeaker: { firstName: 'Daniel', lastName: 'Brady', institution: 'Georgia State University' },
      abstractTitle: 'An Eye and a Half for an Eye: Cognitive Approaches to the Selection of Punishment Types and Amounts',
      authors: [
        { name: 'Daniel J. Brady,'},
        { name: 'Caelan Alexander'},
        { name: 'Daniel Sznycer'},
        { name: 'Eyal Aharoni'},
        ],
      institutions: [{name: 'Georgia State University' }],
      abstractText: 'In a vignette-based survey, we tested our “eye for an eye” hypotheses. Namely, in the absence of modern punishment modalities (e.g., prison and fines), humans prefer punishments to be proportional to offenses in type (H1) and amount (H2; although more serious offenses may receive punishment amounts that exceed offense amounts). Undergraduates (N = 320) read 8 brief descriptions of offenses (hunting bow stealing, forced labor, beating, confinement, shaming,  rape, killing, and eye-gouging) that “occurred in a traditional community in a remote part of the world.” For each offense, participants selected which of 10 punishment types (including 8 actions identical to the described offenses plus cutting off ears and gouging out eyes) would most satisfy the participant. Participants then selected how much of the punishment the offender should receive (“0” to “8 or more” except for cutting off ears or gouging out eyes [0-2], cutting off fingers [0-10], and killing). For all offenses other than rape, participants selected punishments of the same type (e.g. beating the offender who beat their victim) significantly more often than all other options combined (M = 70.4%). For all offenses, when “type-matching,” participants on average selected punishment amounts significantly exceeding offense amounts (e.g. an eye and a half for an eye). Exploratory analyses suggested that participants’ self-reported satisfaction with (M = 4.57) and perceived fairness of (M = 4.97; reported on 1-7 scales ) their punishments was moderately high. Lastly, general punishment orientation (Punishment Orientation Questionnaire; Yamamoto, 2019) did not strongly or consistently predict “type-matching” and punishment amount. Our hypotheses were largely supported as participants on average favored punishments of the same type but in amounts exceeding the offense amounts. Implications for existing punishment theories such as “just deserts” and “optimal deterrence” will be discussed." ',
    },
  ];

    return (
    <div className="w-full flex flex-col items-center px-4 py-12 bg-[#F0F0F0]">
        <ScheduleTitle title="Poster Session" subtitle="12:30 – 1:30" ref={posterHeaderRef} />


        {Array.from({ length: 3 }).map((_, i) => (
        <div
            key={i}
            className="w-full flex flex-col lg:flex-row justify-between items-stretch mb-12 gap-6"
        >
            {/* Divider BEFORE first tile, but only for rows 2 and 3 */}
            {i !== 0 && (
            <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4 self-center"></div>
            )}

            <div className="lg:w-1/2">
            <SpeakerTile {...posters[i * 2]} align="left" />
            </div>

            {/* Divider BETWEEN the two tiles (mobile only) */}
            <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4 self-center"></div>

            <div className="lg:w-1/2">
            <SpeakerTile {...posters[i * 2 + 1]} align="right" />
            </div>
        </div>
        ))}
    </div>
    );

}