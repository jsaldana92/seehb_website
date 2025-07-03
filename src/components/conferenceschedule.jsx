import React, { useState, useCallback } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { useSchedule } from '../components/schedulecontext';

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
  const { setSelectedDay } = useSchedule();

  const handleClick = () => {
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

export default function ConferenceSchedule({ setSelectedDay }) {
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
        presentationTitle="Metacognitive Awareness of Abstract Rules in Rhesus Macaques: Monkeys Learn Abstract Rules, and They Know It"
        time="10:00 - 10:15"
        hoverSpeaker={{
            firstName: 'Rohini',
            lastName: 'Murugan',
            institution: 'Emory University',
        }}
        abstractTitle="Metacognitive Awareness of Abstract Rules in Rhesus Macaques: Monkeys Learn Abstract Rules, and They Know It"
        authors={[
            { name: 'Rohini Murugan', affiliationNumber: '1, 2' },
            { name: 'Angelle Antoun', affiliationNumber: '1, 2' },
            { name: 'Kathleen J. Bostick', affiliationNumber: 2 },
            { name: 'Tristan S. Correa', affiliationNumber: 2 },
            { name: 'Benjamin Wilson', affiliationNumber: '1, 2' },
        ]}
        institutions={[
            { number: 1, name: 'Department of Psychology, Emory University' },
            { number: 2, name: 'Emory National Primate Research Center' },
        ]}
        abstractText="Humans readily apply abstract rules in areas as diverse as language, music, mathematics and logic. Nonhuman animals have also been shown to learn abstract rules. However, questions remain about how these rules are represented in the minds of animals. Here we ask whether rhesus macaques acquire implicit or explicit knowledge of abstract rules by testing if they are metacognitive when applying these rules. Monkeys were trained on a waiting time paradigm, in which they had to maintain a response (a touch on a touchscreen computer) for a variable waiting time (5-12 seconds) to receive a reward. This was then combined with a three-alternative forced-choice abstract rule task, which they had previously learned. If monkeys are metacognitive in applying these abstract rules and know when they respond correctly, they should wait longer on trials when they make a correct decision, and pre-emptively abort trials when they are incorrect. Our data support this prediction, demonstrating metacognition, and therefore explicit knowledge, of macaques’ decisions based on abstract rules. "
      />
      <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4"></div>
      <SpeakerTile
        align="right"
        imgSrc={angelleImage}
        presentationTitle="Can Monkeys Process Multiple Stimulus Pairs Compositionally?"
        time="10:15 - 10:30"
        hoverSpeaker={{
            firstName: 'Angelle',
            lastName: 'Antoun',
            institution: 'Emory University',
        }}
        abstractTitle="Can Monkeys Process Multiple Stimulus Pairs Compositionally?"
        authors={[
            { name: 'Angelle Antoun', affiliationNumber: '1, 2' },
            { name: 'Rohini Murugan', affiliationNumber: '1, 2' },
            { name: 'Tristan S. Correa', affiliationNumber: 2 },
            { name: 'Benjamin Wilson', affiliationNumber: '1, 2' },
        ]}
        institutions={[
            { number: 1, name: 'Department of Psychology, Emory University' },
            { number: 2, name: 'Emory National Primate Research Center' },
        ]}
        abstractText="A central feature of human language is compositionality, the ability to combine discrete meaningful elements into higher-order cognitive representations, combining words into phrases, and phrases into sentences. We previously demonstrated compositional processing in rhesus macaques, training them to respond based on the combined ‘meaning’ of two stimuli. Here, we asked whether macaques could go beyond a single compositional operation, and process multiple stimulus combinations simultaneously. We first demonstrated that monkeys could integrate two iconic representations of individual stimulus features (color and shape), to select an appropriate composite image (a colored shape). We then presented the monkeys with two ‘phrases’, each consisting of a color and a shape, where the target was the set of two appropriately combined colored shapes. All monkeys learned to reliably select the target over foils in which all the stimulus features were present, but mis-combined. These results indicate that the macaques appropriately combined stimulus features, demonstrating a capacity for compositional processing. However, they often incorrectly selected foil stimuli that contained only one correct color-shape combination. This pattern of errors suggests that monkeys have difficulty processing multiple combinations simultaneously, hinting that improved capacity for composition might have played an integral role in the evolution of human language."
      />
      <ScheduleItem title="Coffee Break" time="10:30 - 10:45 " blockSide="left" />
      <ScheduleTitle title="Cognition & Social Behavior Cont." />
      <SpeakerTile
        align="left"
        imgSrc={darbyImage}
        presentationTitle="Fission-Fusion Housing Decreases Aggression and Increases Affiliation in Zoo-Living Spider Monkeys (Ateles geoffroyi)"
        time="10:45 - 11:00"
        hoverSpeaker={{
            firstName: 'Darby',
            lastName: 'Proctor',
            institution: 'Florida Insitute of Technology',
        }}
        abstractTitle="Fission-Fusion Housing Decreases Aggression and Increases Affiliation in Zoo-Living Spider Monkeys (Ateles geoffroyi)"
        authors={[
            { name: 'Darby Proctor',},
            { name: 'Catherine F. Talbot', },
            { name: 'Abigail A. Stevens',},
        ]}
        institutions={[
            { name: 'Collete of Psychology and Liberal Arts, Florida Institute of Technology' },
        ]}
        abstractText="Zoos strive to provide environments for their animals where they can engage in species-typical behaviors. For species that live in fission-fusion societies, where the group subdivides and regroups throughout the day, providing appropriate habitats is challenging. Here, we report on an innovative, animal-managed fission-fusion habitat complex for spider monkeys at Brevard Zoo, consisting of three separate habitats interconnected by a series of bridges. The monkeys have access to the entire complex (other than during cleaning) allowing them to form subgroups and regroup without human intervention. To determine the impact of the new housing complex on social behavior, we conducted observations before and after the complex was constructed. As one reason for fissioning is to reduce aggression, we predicted aggression would decrease in the new complex. As predicted, the monkeys were significantly less aggressive in the new complex (M = .01, SD = .03) than in their old habitat (M = .09, SD = .1), one-tailed t(4) = 2.22, p = .045, d = 0.992. They were also significantly more affiliative in the new complex (M = .99, SD = .03; old habitat: M = .81, SD = .07), two-tailed t(4) = -5.92, p = .004, d = -2.65. This suggests that providing spider monkeys with an environment where they can fission and fuse increases their welfare in zoos by decreasing aggression and increasing affiliation."
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
        abstractTitle="Lack of Association Between Community Social Cohesion and Distribution of Social Capital"
        authors={[
            { name: 'Ansley Warnock'},
            { name: 'Bram Tucker'},
        ]}
        institutions={[
            { name: 'Department of Anthropology, University of Georgia' },
        ]}
        abstractText="In response to recent trends in increasing atomization and isolation worldwide, there has been a revitalization of interest in how social support affects individual health, perhaps best exemplified by the recent creation of the World Health Organization’s Commission for Human Connection. Alongside this, interest in how social cohesion affects community health has also made a resurgence, particularly regarding its effect on community resilience during the COVID-19 pandemic and the subsequent recovery efforts. It’s been found that many of the mechanisms that lend both elements of sociality their benefit to health overlap. Among these include access to information from trusted sources and, in turn, trust in the authorities implementing health interventions. Still, there exists a gap in the literature about the relationship between community social metrics and the distribution of social support within communities, leaving many questions unanswered about how the mechanisms that benefit health interact. Using a set of questionnaire data from NSF-funded research project BCS 1733917, PI Tucker from the southwestern region of Madagascar, I regressed social cohesion against a metric of social support inequality, expecting to find that higher community cohesion would be correlated with a more equal distribution of social support, given social cohesion’s theoretical basis in inter-group connectedness. Instead, I found no association. These results introduce the possibility of communities with high social cohesion that have a couple of cliques but many outside of these cliques falling through the gaps. Many questions about the nature of isolation are raised accordingly, particularly regarding the spillover effects that social cohesion as an institution has on those who are isolated. Further research into these questions could have important implications for public health interventions for outcomes requiring high compliance as well as implications for solutions to the question of social isolation point blank."
      />
      <ScheduleItem title="Poster Teasers" time="11:15 - 11:30" blockSide="right" />
      <ScheduleItem title="Lunch & Photos" time="11:30 - 12:30" blockSide="left" />
      <SpecialTile
        setSelectedDay={setSelectedDay}
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
        hoverSpeaker={{
            firstName: 'Minwoo',
            lastName: 'Lee',
            institution: 'Cornell University',
        }}
        abstractTitle="Grandmaternal Caregiving is Associated with Distinct Multi-Voxel Neural Representation of Grandchildren in the Parental Motivation Circuit"
        authors={[
            { name: 'Mimwoo Lee', affiliationNumber: 1 },
            { name: 'Amber Gonzalez', affiliationNumber: 2 },
            { name: 'James K. Riling', affiliationNumber: '3-7' },
        ]}
        institutions={[
            { number: 1, name: 'Department of Psychology, College of Human Ecology, Cornell University' },
            { number: 2, name: 'Department of Anthropology, Emory University' },
            { number: 3, name: 'Department of Psychology, Emory University' },
            { number: 4, name: 'Department of Psychiatry and Behavioral Sciences, Emory University' },
            { number: 5, name: 'Emory National Primate Research Center, Emory University' },
            { number: 6, name: 'Center for Translational and Social Neuroscience, Emory University' },
            { number: 7, name: 'Center for Behavioral Neuroscience, Emory University' },
        ]}
        abstractText="Grandmothers enhance grandchild survival and maternal health through caregiving. Comparative evidence suggests that human grandmotherhood reflects a unique life history strategy promoting the inclusive fitness of post-reproductive females. Despite its evolutionary importance, the proximate neural mechanisms supporting grandmaternal caregiving remain unclear. This study uses functional magnetic resonance imaging (fMRI) and multivariate approaches to investigate how grandmaternal brains encode information about grandchildren and translate it into caregiving. Forty-seven grandmothers (Age = 59.1±7) completed an fMRI task viewing photos of a grandchild, the grandchild's parent, unfamiliar individuals, and non-human objects. Multi-voxel activation patterns associated with these stimuli were analyzed using representational similarity analysis, focusing on the hypothalamic and mesolimbic regions critical for mammalian parenting. Results reveal that viewing grandchild photos elicits distinct neural patterns within this circuitry, best explained by a model reflecting grandmothers' neural sensitivity to kinship. This representational structure was observed regardless of the grandmother's lineage or genetic relatedness to the grandchild's parent. Indeed, greater neural dissimilarity between the grandchild and other social categories correlated with higher self-reported affection and supportive behaviors towards grandchildren, particularly in paternal grandmothers. Our findings provide novel insights into how grandmaternal brain promotes caregiving that enhances inclusive fitness."
      />
      <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4"></div>
      <SpeakerTile
        align="right"
        imgSrc={mistryImage}
        presentationTitle="Reproductive Senescence in Tufted Capuchin Monkeys (Sapajus apella): Analyzing the Relationship between Estradiol, Aging, and Behavioral Estrus in a Captive Population"
        time="1:45 - 2:00"
        hoverSpeaker={{
            firstName: 'Arianna',
            lastName: 'Mistry',
            institution: 'Emory University',
        }}
        abstractTitle="Reproductive Senescence in Tufted Capuchin Monkeys (Sapajus apella): Analyzing the Relationship between Estradiol, Aging, and Behavioral Estrus in a Captive Population"
        authors={[
            { name: 'Arianna Mistry', affiliationNumber: 1 },
            { name: 'Elizabeth Whiteside', affiliationNumber: 2 },
            { name: 'Gita Gnanadesikan', affiliationNumber: 1 },
            { name: 'Sarah Brosnan', affiliationNumber: 3 },
            { name: 'Marcela Benítez', affiliationNumber: 1 },
        ]}
        institutions={[
            { number: 1, name: 'Department of Anthropology, Emory University' },
            { number: 2, name: 'Baylor College of Medicine' },
            { number: 3, name: 'Department of Psychology, Georgia State University' },
        ]}
        abstractText="Menopause–the end of reproductive function–is a critical transition in a human female’s life. Humans can live up to a third of their lives in a post-reproductive stage, which is highly unusual among primates. As research on menopause expands, evidence of a post-reproductive period has recently been observed in wild chimpanzees and estimated in captive populations of chimpanzees, gorillas, orangutans, and macaques. However, hormonal evidence remains limited, and whether other long-lived primate species exhibit similar declines in reproductive hormones and fertility is still unknown.In this study, we examined age-related effects on fecal estradiol concentrations in 22 captive female tufted capuchin monkeys (Sapajus apella) at the Georgia State University Language Research Center from 2017 to 2024 to provide evidence for the occurrence of menopause in the oldest members of a captive population. In addition to age-related hormonal changes, we investigated how aging affects the frequency of sexual soliciting, or estrus, behaviors in individuals over the age of 30 to further explore the occurrence of menopause in tufted capuchins. Comparing adult (<30 years old) and old-age (>30 years old) individuals, we found that both fecal estradiol concentrations and frequencies of estrus behaviors decline with age. Our results were further supported by a biological validation with a female who had undergone an ovariectomy. This individual showed a significant difference in preoperative versus postoperative estradiol concentration and estrus behaviors, but no significant difference between the ovariectomized condition and the old-age individuals. Our findings suggest the occurrence of menopause in old-age, captive tufted capuchins and have implications for the use of estradiol to explore menopause in other captively housed, long-lived primates. In addition to improving our understanding of capuchin reproduction, this work informs theories regarding the adaptive significance of post-reproductive lifespans and the socioecological influences on female life history patterns."
      />
      <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4"></div>
      <SpeakerTile
        align="left"
        imgSrc={graceImage}
        presentationTitle="Early Life Adversity in Chimpanzees: The Role of Disease Exposure"
        time="2:00 - 2:15"
        hoverSpeaker={{
            firstName: 'Grace',
            lastName: 'Cayless',
            institution: 'Emory University',
        }}
        abstractTitle="Early Life Adversity in Chimpanzees: The Role of Disease Exposure"
        authors={[
            { name: 'Grace Cayless'},
            { name: 'Elizabeth V. Lonsdorf'},
        ]}
        institutions={[
            { name: 'Department of Anthropology, Emory University' },
        ]}
        abstractText="Early-life adversity (ELA) has been linked to poor behavioral and health outcomes in many long-lived social mammals, including humans. Currently, the long-term effects of cumulative adversity have only been studied in two primate species, with conflicting results—in female baboons, cumulative ELA predicted a shortened lifespan, while the experience of 3+ sources of ELA was correlated with a 70% reduction in later-life mortality risk for gorillas. Chimpanzees, like humans, exhibit lengthy, defined stages of development, during which they face various adversities while forming complex relationships with conspecifics. This makes them quality models for investigating how ELA influences health and survival outcomes, which will provide insights into human child development and resilience. Health adversity has not been addressed in previous primate studies of ELA, but respiratory outbreaks are known to impact energetic stress levels in wild chimpanzees. Therefore, exposure to respiratory disease during development is a potentially significant source of early life adversity. To explore this further, this project focuses on individual and maternal experiences of respiratory disease outbreak, utilizing long-term field data collected on wild chimpanzees at Gombe National Park, Tanzania. Preliminary research using this data indicates that in-utero disease exposure may significantly reduce lifespan, while limited disease exposure in the first 10 years of life may benefit longevity. Specifically, experiencing more than three outbreaks during development reduces lifespan, but two or fewer exposures do not have this effect. This work will contribute to a deeper understanding of the ways early-life adversity impacts individual mortality risk and shapes adult populations, and shed light on the connections between early life adversity, long-term health, and survival."
      />
      <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4"></div>
      <SpeakerTile
        align="right"
        imgSrc={giulianaImage}
        presentationTitle="Diverse pathways through maternal loss for wild orphan chimpanzees (Pan troglodytes schweinfurthii) at Gombe National Park, Tanzania"
        time="2:15 - 2:30"
        hoverSpeaker={{
            firstName: 'Giuliana',
            lastName: 'Centofanti',
            institution: 'Emory University',
        }}
        abstractTitle="Diverse pathways through maternal loss for wild orphan chimpanzees (Pan troglodytes schweinfurthii) at Gombe National Park, Tanzania"
        authors={[
            { name: 'Giuliana M. Centofanti', affiliationNumber: 1 },
            { name: 'Joseph T. Feldblum', affiliationNumber: 2 },
            { name: 'Elizabeth V. Lonsdorf', affiliationNumber: 1 },
        ]}
        institutions={[
            { number: 1, name: 'Department of Anthropology, Emory University' },
            { number: 2, name: 'Evolutionary Anthropology, Duke University' },
        ]}
        abstractText="Previous research on wild orphaned chimpanzees has focused on survival, lifespan, and adoption by group members, often emphasizing maternal siblings as the primary caregiver. In addition, previous reports have examined relatively short time periods encompassing the first few months post-orphaning. Less is known about longer-term patterns of association and/or association with non-sibling caregivers. We identified 49 cases of orphaning at Gombe National Park, Tanzania. Data on dyadic association with group members were available for 21 individuals: 9 belonged to the age class in which non-orphans are permanently associated with their mothers (<6 years old) and 12 belonged to the age class in which individuals are typically weaned and have more independence from their mothers (6-12 years old). We categorized individuals depending on the type of care provided by others in the first 18 months after maternal death: adoption - permanent association; variable care - non-permanent association and caregiving provided by >1 individual; or no care - no consistent primary association partner. Among individuals <6 years of age, 6 (67%) were adopted, 2 (22%) received variable care, and 1 (11%) received no care. Among individuals >6 years of age, 4 (33%) were adopted, 1 (8%) received variable care, and 7 (58%) received no care, aligning with non-orphaned individuals of this age who typically spend less time with their mother and become more socially fluid. In the variable care category, different patterns of association emerged. Of the two individuals <6 years of age who received variable care, one was found to have consistent but alternating levels of affiliation with their top 2 affiliates, while the other was found to have frequent changes in their top 3 affiliates. These results highlight diverse pathways through maternal loss for young chimpanzees."
      />
      <ScheduleItem title="Coffee Break" time="2:30 - 3:30" blockSide="right" />
      <ScheduleTitle title="Keynote" />
      <KeynoteTile
        imgSrc={amandaImage}
        presentationTitle="Friendly Foes & Shared Spaces: How primates and people negotiate the risks and rewards of rapidly changing landscapes"
        time="3:00 - 4:00"
        hoverSpeaker={{
            firstName: 'Amanda',
            lastName: 'Ellwanger',
            institution: 'Georgia State University',
        }}
        abstractTitle="Friendly Foes & Shared Spaces: How primates and people negotiate the risks and rewards of rapidly changing landscapes"
        authors={[
            { name: 'Amanda Ellwanger'},
            //{ name: 'Jane Doe', affiliationNumber: 2 },
        ]}
        institutions={[
            { name: 'Department of Anthropology, Georgia State University' },
            //{ number: 2, name: 'Department of Ecology, Georgia Tech' },
        ]}
        abstractText="Humans are prolific niche constructors—we not only shape our habitats but also influence the selective pressures acting on other species. Behaviorally flexible primates that can successfully exploit the rural-urban edge or adapt to changing climatic conditions may be particularly important for our understanding of the effects of human niche construction. In these coupled social and ecological landscapes, people and primates must negotiate the risks and rewards of rapidly changing landscapes and shared spaces. In this talk, I will focus on several major interrelated themes that define my research including the landscape of fear, conflict and coexistence, and resilience. I will share examples from research with chacma baboons (Papio ursinus) in South Africa and moor macaques (Macaca maura) in Sulawesi, while highlighting the integrative and collaborative research methodologies that I use to investigate the primate-human interface."
      />

      <ScheduleItem title="Discussion and Clean-Up" time="4:00- 4:30" blockSide="left" />

    </div>
  );
}
