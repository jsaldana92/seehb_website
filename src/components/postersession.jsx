import React, { useState, useEffect, useRef } from 'react';
import HoverOrTouchHandler from './hoverortouchhandler';
import scientistImage from '../assets/images/scientist.png';
import bethImage from '../assets/presenters/beth.jpg';
import chandlerImage from '../assets/presenters/chandler.jpg';
import hadleyImage from '../assets/presenters/hadley.png';
import jhonatanImage from '../assets/presenters/jhonatan.png';
import paigeImage from '../assets/presenters/paige.png';
import rohiniImage from '../assets/presenters/rohini.png';
import spcImage from '../assets/presenters/spc.jpg';
import sierraImage from '../assets/presenters/sierra.jpg';
import skylarImage from '../assets/presenters/skylar.png';
import victoriaImage from '../assets/presenters/victoria.png';
import { useSchedule } from '../components/schedulecontext';

const ScheduleTitle = React.forwardRef(({ title, subtitle }, ref) => (
  <div ref={ref} className="w-full flex flex-col items-center my-8 px-6">
    <div className="w-full max-w-xl h-px bg-black mb-4"></div>
    <h2 className="text-2xl md:text-4xl font-semibold text-black text-center">{title}</h2>
    {subtitle && <p className="text-md md:text-lg font-medium text-[#00B050] text-center mt-2">{subtitle}</p>}
    <div className="w-full max-w-xl h-px bg-black mt-4"></div>
  </div>
));

ScheduleTitle.displayName = 'ScheduleTitle';

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
      <div className={`w-full flex flex-col md:flex-row ${isLeft ? '' : 'md:flex-row-reverse'} items-center justify-center my-8 gap-6 px-4`}>
        <HoverOrTouchHandler>
          {(isHovered) => (
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 drop-shadow-xl">
              <img src={imgSrc} alt={imgAlt} className={`w-full h-full object-cover rounded-lg transition duration-300 ${isHovered ? 'brightness-25' : 'brightness-100'}`} />
              {isHovered && (
                <div className={`absolute bottom-2 ${isLeft ? 'left-2 text-left' : 'right-2 text-right'} text-white text-md font-semibold space-y-1 px-1 py-1`}>
                  <p>{hoverSpeaker.firstName}</p>
                  <p>{hoverSpeaker.lastName}</p>
                  <p className="text-xs">{hoverSpeaker.institution}</p>
                </div>
              )}
            </div>
          )}
        </HoverOrTouchHandler>

        <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-2">{abstractTitle}</h2>
          <p className="text-md text-gray-800 font-semibold text-center">
            {authors.map((author, i) => (
              <span key={i}>{author.name}<sup>{author.affiliationNumber}</sup>{i < authors.length - 1 ? ', ' : ''}</span>
            ))}
          </p>
          <p className="text-sm text-gray-600 italic text-center mt-2 mb-4">
            {institutions.map((inst, i) => (
              <span key={i}><sup>{inst.number}</sup> {inst.name}{i < institutions.length - 1 ? '; ' : ''}</span>
            ))}
          </p>
          <p className="text-md text-black mt-2 text-center">{abstractText}</p>
          <button onClick={() => setShowDetails(false)} className="mt-6 px-4 py-2 bg-[#F6BB17] text-black font-bold rounded-full hover:bg-yellow-400">Close Abstract</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col md:flex-row ${isLeft ? '' : 'md:flex-row-reverse'} items-center justify-center my-8 gap-6 px-4`}>
      <HoverOrTouchHandler>
        {(isHovered) => (
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 drop-shadow-xl">
            <img src={imgSrc} alt={imgAlt} className={`w-full h-full object-cover rounded-lg transition duration-300 ${isHovered ? 'brightness-25' : 'brightness-100'}`} />
            {isHovered && (
              <div className={`absolute bottom-2 ${isLeft ? 'left-2 text-left' : 'right-2 text-right'} text-white text-md font-semibold space-y-1 px-1 py-1`}>
                <p>{hoverSpeaker.firstName}</p>
                <p>{hoverSpeaker.lastName}</p>
                <p className="text-xs">{hoverSpeaker.institution}</p>
              </div>
            )}
          </div>
        )}
      </HoverOrTouchHandler>
      <div className={`cursor-pointer bg-white rounded-[25px] p-4 shadow-md text-black text-center ${isLeft ? 'sm:text-left' : 'sm:text-right'} w-[260px] sm:w-[300px] md:w-[360px] lg:w-[1020px]`} onClick={() => setShowDetails(true)}>
        <h3 className="text-lg font-bold leading-snug">{presentationTitle}</h3>
        <p className="text-md font-semibold text-[#00B050] mt-2">{time}</p>
      </div>
    </div>
  );
}

export default function PosterSession() {
  const {
    triggerScrollToTop,
    setTriggerScrollToTop,
    posterRedirected,
    setPosterRedirected,
  } = useSchedule();

  const posterHeaderRef = useRef();

  useEffect(() => {
    if (triggerScrollToTop && posterRedirected && posterHeaderRef.current) {
      let lastTop = -1;
      let stableCount = 0;
      const maxStableChecks = 5;

      const intervalId = setInterval(() => {
        const top = posterHeaderRef.current.getBoundingClientRect().top;
        if (top === lastTop) {
          stableCount++;
        } else {
          stableCount = 0;
          lastTop = top;
        }

        if (stableCount >= maxStableChecks) {
          clearInterval(intervalId);
          posterHeaderRef.current.scrollIntoView({ behavior: 'smooth' });
          setTriggerScrollToTop(false);
          setPosterRedirected(false);
        }
      }, 50);
    }
  }, [triggerScrollToTop, posterRedirected]);

    const posters = [
    {
      imgSrc: spcImage,
      time: '',
      presentationTitle: 'Flexible Decision-Making in Capuchins, Rhesus Macaques, and Children',
      hoverSpeaker: { firstName: 'Sarah', lastName: 'Pope-Caldwell', institution: 'Georgia State University' },
      abstractTitle: 'Flexible Decision-Making in Capuchins, Rhesus Macaques, and Children',
      authors: [
        { name: 'Sarah Pope-Caldwell', affiliationNumber: '1, 2' },
        { name: 'Matthew Babb', affiliationNumber: '1, 2' },
        { name: 'Yingkang Luo', affiliationNumber: 3 },
        { name: 'Robert Wilson', affiliationNumber: 3 },
      ],
      institutions: [
        { number: 1, name: 'Department of Psychology, Georgia State University, Atlanta, Georgia' },
        { number: 2, name: 'Language Research Center, Georgia State University, Atlanta, Georgia' },
        { number: 3, name: 'School of Psychology, Georgia Institute of Technology, Atlanta, Georgia' },
      ],
      abstractText: `Flexible, adaptive decision-making has long been touted as a key evolutionary driver of humans’ large brains and ‘advanced’ cognitive skillsets. Yet, the extent to which human cognition is uniquely flexible compared to other primates is still unclear. The current study sought to characterize flexible decision-making approaches across capuchin monkeys (Sapajus apella; N = 20, MeanAge= 21.1, SDAge= 6.22), rhesus macaques (Macaca mulatta; N = 9, MeanAge= 14.4, SDAge= 9.72), and human children (Homo Sapiens; N = 5, MeanAge= 4.54, SDAge= 0.52) using a four-armed bandit decision-making task. Using a Bayesian multi-level mixture model, we computed subject-specific parameters measuring elective exploration and learning rate across three reward structure conditions: Stable, Shuffled, and Variable. Preliminary results suggest that children exhibited less flexibility than capuchins and macaques in the stable condition; no other species differences in exploration were observed. We observed faster learning rates in children compared to capuchins and rhesus macaques in both shuffle and variable conditions. We discuss these findings in the context of species differences in risk preferences and ecological drivers of exploratory behavior.`,
    },
    {
      imgSrc: paigeImage,
      time: '',
      presentationTitle: 'Stable Dyad Strategies in an Iterated Prisoner’s Dilemma Game Across Varying Audience Contexts in Capuchins',
      hoverSpeaker: { firstName: 'Paige', lastName: 'Petschl', institution: 'Georgia State University' },
      abstractTitle: 'Stable Dyad Strategies in an Iterated Prisoner’s Dilemma Game Across Varying Audience Contexts in Capuchins',
      authors: [
        { name: 'Paige M. Petschl', affiliationNumber: '1, 2' },
        { name: 'Sarah F. Brosnan', affiliationNumber: '1, 2, 3, 4' },
      ],
      institutions: [
        { number: '1', name: 'Department of Psychology, Georgia State University, Atlanta, GA, U.S.A.' },
        { number: '2', name: 'Language Research Center, Georgia State University, Atlanta, GA, U.S.A.' },
        { number: '3', name: 'Neuroscience Institute, Georgia State University, Atlanta, GA, U.S.A.' },
        { number: '4', name: 'Center for Behavioral Neuroscience, Georgia State University, Atlanta, GA, U.S.A.' },
      ],
      abstractText: `The iterated prisoner’s dilemma (PD) task is widely used to study cooperative decision making, including in capuchin monkeys (Sapajus spp.). The iterated version of the game forces dyads to repeatedly face choices between cooperation and defection, which can reveal patterns of reciprocity and sensitivity to social contexts. In capuchins, cooperation trends higher in the group setting than in the dyadic context. One reason for this difference may be the influence of third party observers. To examine whether an individual’s choice to cooperate or defect was influenced by the presence of an observer, we tested 10 dyads in an iterated PD game, with each dyad experiencing two unique observers. Observer presence did not significantly affect cooperative choice for the subject (β = -0.055 ± 0.209, p = 0.793) or the partner (β = -0.015 ± 0.164, p = 0.927). However, the partner’s identity did significantly influence subject’s decisions (β = 3.957 ± 0.526, p < .05). These findings indicate that cooperative strategies differ across dyads, but are stable across this audience context, highlighting the importance of dyad-level structure in social decision-making.
`,
    },
    {
      imgSrc: rohiniImage,
      time: '',
      presentationTitle: 'Humans, but not Monkeys, form Compressed Representations of Visuospatial Sequences',
      hoverSpeaker: { firstName: 'Rohini', lastName: 'Murugan', institution: 'Emory University' },
      abstractTitle: 'Humans, but not Monkeys, form Compressed Representations of Visuospatial Sequences',
      authors: [
        { name: 'Rohini Murugan', affiliationNumber: '1, 2' },
        { name: 'Fei Xu', affiliationNumber: 1 },
        { name: 'Angelle Antoun', affiliationNumber: '1, 2, 3' },
        { name: 'Logan Brownell', affiliationNumber: '1, 2' },
        { name: 'Tristan S. Correa', affiliationNumber: 2 },
        { name: 'Benjamin Wilson', affiliationNumber: '1, 2' },
      ],
      institutions: [
        { number: 1, name: 'Department of Psychology, Emory University, USA' },
        { number: 2, name: 'Emory National Primate Research Center, USA' },
        { number: 3, name: 'Villanova University' },
      ],
      abstractText: `Humans are extremely sensitive to patterns in the environment. Previous studies suggest that this sensitivity is closely linked to the compressibility of information. For example, the sequence ‘1, 2, 3, 4, …’ can be compressed and encoded as a simple rule, ‘n+1’, while a sequence like ‘5, 2, 6, 8, …’ cannot be similarly compressed. It has recently been argued that while humans spontaneously form these compressed representations, nonhuman animals do not (Dehaene et al., 2022, TICS). Here, we developed a serial reaction time paradigm to assess the ability to compress spatial information in macaques and humans. We presented participants with sequences of visual stimuli that occurred at one of eight spatial locations, corresponding to the principle directions on a compass, which they were required to touch as quickly as possible. These sequences were either regular (appearing clockwise in a circle and were thus compressible) or irregular (random and thus incompressible). Humans responded faster to regular compared to irregular sequences, suggesting that they formed compressed cognitive representations. However, monkeys did not show similar differences in reaction times. These data are in line with prior hypotheses, implying that what makes humans unique is their capacity to form compressed cognitive representations.`,
    },
    {
      imgSrc: bethImage,
      time: '',
      presentationTitle: 'Protect our Forest Friends: Using Education Outreach To Promote Conservation of the Moor Macaque',
      hoverSpeaker: { firstName: 'Beth', lastName: 'Wilson', institution: 'Georgia State University' },
      abstractTitle: 'Protect our Forest Friends: Using Education Outreach To Promote Conservation of the Moor Macaque',
      authors: [
        { name: 'Beth Wilson', affiliationNumber: 1 },
        { name: 'Andonia Alexander-Smith', affiliationNumber: 1 },
        { name: 'Dylan Kyle', affiliationNumber: 1 },
        { name: 'Rizqul Yusuf Nirza', affiliationNumber: 2 },
        { name: 'Raqiah Aqilah Mukarram', affiliationNumber: 2 },
        { name: 'Arsyla Dzikriah Jagong', affiliationNumber: 2 },
        { name: 'Aiman Abdul Jabbar', affiliationNumber: 2 },
        { name: 'Muh. Zulfikri', affiliationNumber: 2 },
        { name: 'Ngakan Putu Oka', affiliationNumber: 2 },
        { name: 'Erin P. Riley', affiliationNumber: 3 },
        { name: 'Amanda L. Ellwanger', affiliationNumber: 1 },
      ],
      institutions: [
        { number: 1, name: 'Georgia State University, Atlanta, Georgia, USA' },
        { number: 2, name: 'Hasanuddin University, Makassar, Indonesia' },
        { number: 3, name: 'San Diego State University, San Diego, California, USA' },
      ],
      abstractText: `Educational outreach is highly effective in positively shifting public perception making it an important tool in conservation. Moor macaques (Macaca maura) are endemic to Sulawesi, Indonesia, and are classified as “Endangered” due to habitat loss and conflict with local people. In Bantimurung Bulusaraung National Park (TNBABUL), people regularly provision macaques along the roadside, which may lead to negative consequences for both macaques and people. Provisioning can create unsafe contexts resulting in roadside accidents, potential for zoonotic disease transmission, and increasing negative attitudes. Our goal was to increase knowledge and raise awareness of the human-macaque interface through an educational outreach poster, as it is an effective choice for dispersed target audiences and can have a wide impact. We worked as a collaborative, international team in Indonesia, participating in an intensive training program to learn methods in primate behavior, tropical forest ecology, and ethnographic techniques. Following the training we actively collaborated on the poster design to ensure that the messaging would translate to the local context and best connect with people who travel through TNBABUL. The poster highlights basic information about macaque behavioral ecology and “Dos and Don’ts” for safe human-macaque interactions such as encouraging passersby to keep a distance of at least 7m to reduce direct contact, and limit provisioned food to promote the macaques natural role as seed dispersers. In the future, a printed version of the poster will be displayed in local shops and restaurants along the main road of the park, where we can then assess its effectiveness.`,
    },
    {
      imgSrc: sierraImage,
      time: '',
      presentationTitle: 'Humans’, Capuchin Monkeys’ (Cebus [Sapajus] apella), and Rhesus Macaques’ (Macaca mulatta) Size Judgements Shift When Stimuli Change in Frequency',
      hoverSpeaker: { firstName: 'Sierra', lastName: 'Simmons', institution: 'Georgia State University' },
      abstractTitle: 'Humans’, Capuchin Monkeys’ (Cebus [Sapajus] apella), and Rhesus Macaques’ (Macaca mulatta) Size Judgements Shift When Stimuli Change in Frequency',
      authors: [
        { name: 'Sierra M.V. Simmons', affiliationNumber: '1, 2' },
        { name: 'Sarah F. Brosnan', affiliationNumber: '1, 2, 3, 4' },
      ],
      institutions: [
        { number: '1', name: 'Department of Psychology, Georgia State University, Atlanta, GA, U.S.A.' },
        { number: '2', name: 'Language Research Center, Georgia State University, Atlanta, GA, U.S.A.' },
        { number: '3', name: 'Neuroscience Institute, Georgia State University, Atlanta, GA, U.S.A.' },
        { number: '4', name: 'Center for Behavioral Neuroscience, Georgia State University, Atlanta, GA, U.S.A.' },
      ],
      abstractText: `When making decisions, humans often strive to uphold objective, absolute standards, e.g., about what is small vs. large, blue vs purple, or unfair vs. fair, suggesting our judgments should not be swayed by extraneous factors such as the sequence or frequency of events to be judged. Yet in previous research, when some items (e.g., threatening faces) became less frequent, humans responded by expanding their concept (of ‘threatening’) to include more ambiguous stimuli. We assessed the origins of this perceptual frequency bias by testing 25 capuchins, 7 rhesus monkeys, and 102 humans on a computer task in which they had to classify one circle at a time (pulled from a continuum of 50 circle sizes) as either small or large. Small and large circles initially appeared with equal probability but, over time, small circles either became less frequent, more frequent, or did not change in frequency. All three species showed changes in judgement, but contrary to predictions, they contracted, rather than expanded, their concepts of the less frequent category. In other words, when small circles became rare, participants were more likely to judge ambiguous circles sizes as large (and vice versa), GLMM: χ2(4)=25.41, p<.001. Interestingly, immediate explicit feedback reversed rather than eliminated this bias. These results suggest that difficulties in maintaining absolute standards are shared with other animals and highly sensitive to perceptual context.`,
    },
    {
      imgSrc: chandlerImage,
      time: '',
      presentationTitle: 'Lemurs, Affiliative behaviors, & Thermoregulation: A Working Title',
      hoverSpeaker: { firstName: 'Chandler', lastName: 'Brown English', institution: 'Zoo Atlanta' },
      abstractTitle: 'Lemurs, Affiliative behaviors, & Thermoregulation: A Working Title',
      authors: [
        { name: 'Chandler Brown English', affiliationNumber: '' },
      ],
      institutions: [
        { number: '', name: 'Zoo Atlanta' },
      ],
      abstractText: `With greater frequency, zoos and animal parks are utilizing mixed-species housing as a way of increasing both the welfare of captive animals and the experience of visitors and maximizing the utilization of space available. In doing so, atypic hierarchal organizations may arise that do not occur in the wild. Additionally, across animal species, thermoregulatory behaviors are utilized to maintain temperature-specific homeostasis, and existing research demonstrates that these thermoregulatory behaviors serve a social function, such as reinforcing hierarchical organizations within a social group. This project aims to investigate the social dynamic of the Zoo Atlanta lemur population as it is related to sunbathing, heaters, and the affiliative behaviors that arise from thermoregulation.

The Zoo Atlanta lemur population is made up of 0.2 Black-and-white-ruffed Lemur (Varecia variegata variegata), 1.1 Crowned Lemur (Eulemur coronatus), and 2.0 Ring-tailed Lemur (Lemur catta), with the mean age being 16.7 years old. Researchers plan to non-invasively obtain behavioral observations, as well as geospatial data pertaining to where, and with whom, the individuals spend their time. The results of this study would provide greater insight into the space use, as well as the inter- and intra-species dynamics of this particular social group and other mixed-species lemur groups in collections elsewhere. We expect to find that thermoregulation influences social grouping patterns and may reinforce existing hierarchies or promote new affiliative bonds among different lemur species.`,
    },
    {
      imgSrc: skylarImage,
      time: '',
      presentationTitle: 'Rhesus macaques (Macaca mulatta) are more Distracted by Faces than Controls at Low but Not High Cognitive Loads',
      hoverSpeaker: { firstName: 'Skylar', lastName: 'Brodnan', institution: 'Georgia State University' },
      abstractTitle: 'Rhesus macaques (Macaca mulatta) are more Distracted by Faces than Controls at Low but Not High Cognitive Loads',
      authors: [
        { name: 'Skylar Brodnan', affiliationNumber: '1, 2' },
        { name: 'Sarah Pope-Caldwell', affiliationNumber: '1, 2' },
      ],
      institutions: [
        { number: 1, name: 'Department of Psychology, Georgia State University, Atlanta, Georgia' },
        { number: 2, name: 'Language Research Center, Georgia State University, Atlanta, Georgia' },
      ],
      abstractText: `When engaging in high cognitive load tasks, humans are able to ignore most irrelevant distractors but fail to ignore faces. Evidence shows that other primates process faces similarly to humans. However, it is unclear whether they experience challenges avoiding irrelevant faces. Here, we investigated whether socially-housed rhesus macaques (Macaca mulatta) are similarly distracted by conspecific faces. We measured task performance on a computerized delayed matching-to-sample task using either (i) familiar, neutral faces or (ii) distorted, pixelated face controls during sample match selection. To manipulate cognitive load, we used 2000ms, 6000ms, and 10000ms sample presentation delays. Using Bayesian regressions, preliminary results (n=2, trials=2006) show that the interaction between delay and distractor type significantly predicted reaction time (95% BCI [0.03,0.17]). Monkeys took longer to respond on face distractor trials than controls when the cognitive load was low. However, at high cognitive loads, response times were similar in both distractor trial types. This suggests that, unlike humans, rhesus macaques are able to ignore face distractors at high cognitive loads. These results have implications for the evolution of facial processing and attention in humans. Specifically, they support the idea that mandatory processing of faces evolved after the split between apes and Old-World monkeys.`,
    },
    {
      imgSrc: victoriaImage,
      time: '',
      presentationTitle: 'Associations Among Aging, Adiposity, and Cognitive Function in Female Vervet Monkeys (Chlorocebus aethiops sabaeus)',
      hoverSpeaker: { firstName: 'Victoria', lastName: 'Burnette', institution: 'Wake Forest University' },
      abstractTitle: 'Associations Among Aging, Adiposity, and Cognitive Function in Female Vervet Monkeys (Chlorocebus aethiops sabaeus)',
      authors: [
        { name: 'Victoria M. Burnette', affiliationNumber: '' },
        { name: 'Brett M. Frye', affiliationNumber: '' },
        { name: 'Caresse Hightower', affiliationNumber: '' },
        { name: 'Thomas C. Register', affiliationNumber: '' },
        { name: 'Sydney Deal', affiliationNumber: '' },
        { name: 'Carol A. Shively', affiliationNumber: '' },
      ],
      institutions: [],
      abstractText: `From an evolutionary perspective, age-related changes in body composition and cognition may reflect fundamental processes of senescence across a variety of species. In humans, increased adiposity during mid-life may increase risk for neurodegenerative diseases, including Alzheimer’s Disease. Nonhuman primates provide excellent opportunities to study the relationships between adiposity and cognition during aging. Here, we examine relationships between adiposity and cognition in aging female vervet monkeys (Chlorocebus aethiops sabaeus).

We studied 43 female vervets living in the Vervet Research Colony at Wake Forest University School of Medicine who were assessed between 10.8 and 29.8 years of age. We measured body composition using computed tomography (CT), with each individual contributing between 1 and 4 scans. Cognitive performance was assessed using the Wake Forest Maze Task (WFMT) to assess executive function and the Delayed Response Task (DRT) to assess working memory. Relationships between age, body composition, and cognitive performance were examined using linear mixed-effects regression models that accounted for repeated measures within individuals.

Age was negatively associated with total body (β=-102,993.67, p<0.01) and adipose tissue volumes (β=-68,075.03; p<0.01). Cognitive performance was inversely related to age in both domains, (WFMT: β=-0.40, p<0.01; DRT: β=-0.37, p=0.03), indicating that older animals performed more poorly in these tasks. There was little evidence suggesting that CT measures of body composition predicted cognitive performance (p’s>0.05).

Age was negatively associated with body and adipose tissue volumes and cognitive performance, indicating parallel declines in physical and neurocognitive states. However, there was little evidence for predictive relationships between adiposity and cognition, which may suggest that mid- to late-life age-related cognitive decline occurs independently of adiposity in female vervets. From an evolutionary framework, these findings may indicate systemic senescence rather than adiposity-driven trade-offs, and may point to alternative, intrinsic mechanisms as predictors of cognitive decline.`,
    },
    {
      imgSrc: hadleyImage,
      time: '',
      presentationTitle: 'Protect our Forest Friends: Using Education Outreach To Promote Conservation of the Moor Macaque',
      hoverSpeaker: { firstName: 'Hadley', lastName: 'Mueller-Hill', institution: 'University of Georgia' },
      abstractTitle: 'Protect our Forest Friends: Using Education Outreach To Promote Conservation of the Moor Macaque',
      authors: [
        { name: 'Hadley Mueller-Hill', affiliationNumber: '' },
        { name: 'Jared Taglialatela', affiliationNumber: '' },
      ],
      institutions: [],
      abstractText: `Social behavior in primates varies widely within and across species, and growing work in behavioral genetics highlights the value of documenting sequence variation in neurobiologically relevant genes. However, for great apes, individual genetic variation for behavior-associated loci remains limited. To address this gap, we characterized variation in the MAOA promoter VNTR and the OXTR SNP rs35062132 in 12 western lowland gorillas (Gorilla gorilla gorilla) and incorporated an exploratory comparison between genotypes and individual sociability. Sociability was quantified from 25 ten-minute focal follows per subject, including proximity, affiliative, and agonistic behaviors. Using DNA extracted from whole blood and PCR-based sequencing, multiple MAOA VNTR genotypes were identified, including a previously unreported 0-repeat allele, indicating greater regulatory-region diversity than previously documented for this species. No polymorphism was detected at OXTR rs35062132, although several fixed differences from other great ape lineages were identified at nearby nucleotide positions. Behavioral observations revealed individual differences in sociability; however, the presence of multiple previously undescribed MAOA VNTR genotypes with unknown functional consequences limited interpretability of genotype–behavior associations. Overall, these findings provide the first detailed description of MAOA promoter variation in western lowland gorillas and demonstrate sequence conservation in the OXTR region analyzed. These data underscore the importance of future research on gorilla social variation and comparative primate genomics.`,
    },
    {
      imgSrc: jhonatanImage,
      time: '',
      presentationTitle: 'ResearchObs: A Customizable Application for Behavioral Observation and Rapid Reporting',
      hoverSpeaker: { firstName: 'Jhonatan', lastName: 'Saldaña Santisteban', institution: 'Georgia State University' },
      abstractTitle: 'ResearchObs: A Customizable Application for Behavioral Observation and Rapid Reporting',
      authors: [
        { name: 'Jhonatan M. Saldaña Santisteban', affiliationNumber: 1 },
      ],
      institutions: [
        { number: 1, name: 'Georgia State University' },
      ],
      abstractText: `Digital tools for behavioral observation can offer clear advantages over traditional record keeping: they generate analysis-ready files, support rapid archiving, and improve consistency across sessions and observers. In practice, these benefits are often limited because (1) many applications are designed around a single species or study workflow and are difficult to adapt, (2) broadly scoped platforms frequently become unsupported or depend on outdated user interfaces, and (3) even when high-quality data files are produced, meaningful interpretation typically still requires statistical training and additional analysis infrastructure. I developed ResearchObs, a free Flutter-based Android application, to provide a modern, customizable observation workflow paired with rapid, structured summaries. ResearchObs is organized around reusable species profiles that define groups and group members, point and state behaviors, session-level observational variables (e.g., observer identity, temperature, visitor presence), and optional spatial location for 2D and 3D mapping. The app also supports optional individual-level attributes and modifiers (e.g., age, rank, sex, proximity) to standardize downstream analyses across observers and projects. Data management follows a safety-first approach: observations are saved locally within the app and can be exported for USB transfer or uploaded to user-controlled cloud storage (Google Drive, Dropbox). In addition to export, ResearchObs provides internal reporting tools to summarize observation logs and visualize group- and species-level patterns (e.g., time budgets, heat maps) and generate social-network style summaries. In short, ResearchObs reduces the friction of behavioral data collection while increasing standardization and speeding the path from observation to interpretable results, giving non-technical users customizable and future-proof workflows.`,
    },
  ];

      return (
    <div className="w-full flex flex-col items-center px-4 py-12 bg-[#F0F0F0]">
      <ScheduleTitle title="Poster Session" subtitle="12:30 – 2:00" ref={posterHeaderRef} />
      {Array.from({ length: Math.ceil(posters.length / 2) }).map((_, i) => {
        const leftPoster = posters[i * 2];
        const rightPoster = posters[i * 2 + 1];

        return (
          <div key={i} className="w-full flex flex-col lg:flex-row justify-between items-stretch mb-12 gap-6">
            {i !== 0 && <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4 self-center"></div>}
            <div className="lg:w-1/2">
              <SpeakerTile {...leftPoster} align="left" />
            </div>

            {rightPoster && (
              <>
                <div className="block md:hidden w-3/4 h-px bg-[#CCCCCC] my-4 self-center"></div>
                <div className="lg:w-1/2">
                  <SpeakerTile {...rightPoster} align="right" />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
