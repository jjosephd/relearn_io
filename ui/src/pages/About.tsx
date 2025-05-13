import { useState } from 'react';
import AboutCard from '../components/cards/AboutCard';
import Carousel from '../components/about/Carousel';
import Steps from '../components/about/Steps';

const aboutData = [
  {
    imageUrl: 'xxx',
    title: 'Our Mission',
    description: [
      'At Pathwise, we help working adults and parents return to school—or pivot to career-ready certifications—without the confusion, cost traps, or wasted time.',
      'We believe education should work around your life, not take it over.',
    ],
  },
  {
    imageUrl: 'xxx',
    title: 'Why Pathwise Exists',
    description: [
      'College enrollment in the U.S. is declining. Rising costs, unclear job outcomes, and a changing economy have left millions questioning if school is still worth it—especially adults with jobs, kids, or debt.',
      "But here's what hasn't changed:",
      {
        bullets: [
          'The need to learn new skills.',
          'The desire for better-paying work.',
          'The challenge of doing it with a family to support.',
        ],
      },
      'Pathwise exists to simplify that journey.',
      'We bring together school data, program comparisons, and financial guidance—powered by AI and built with empathy—so you can choose an educational path that actually fits your life.',
    ],
  },
  {
    imageUrl: 'xxx',
    title: 'Who We Help',
    description: [
      'From parents juggling school pickups to first-gen students navigating alone, Pathwise is built for real people with real responsibilities.',
      'We help:',
      {
        bullets: [
          'Working adults pivoting into new industries',
          'Skilled workers exploring certifications or trades',
          'First-generation students navigating the process solo',
          'Parents returning to school after a gap',
        ],
      },
    ],
  },
  {
    imageUrl: 'xxx',
    title: 'What We Do',
    description: [
      'We help you:',
      {
        bullets: [
          'Understand your goals and schedule',
          'Find programs that fit your lifestyle',
          'Apply for financial aid',
          'Plan your schedule',
          'Join study groups',
          'Achieve your goals',
        ],
      },
    ],
  },
  {
    imageUrl: 'xxx',
    title: 'How It Works',
    description: [
      'Relearn combines real school data (from places like College Scorecard) with smart filtering and AI-powered guidance. It only takes a few clicks or a short chat to:',
      {
        bullets: [
          'See programs that match your budget, pace, and schedule',
          'Understand your trade-offs (online vs. hybrid, cost vs. speed)',
          'Get simple, jargon-free explanations',
        ],
      },
      'We give you a personalized list of programs that fit your lifestyle.',
      'Our goal is to ensure that within five minutes, users feel a sense of clarity and realize that returning to school is a viable and sensible option for them.',
    ],
  },
];

const About = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  return (
    <div className="min-h-screen w-full flex flex-col gap-6 p-6 md:p-12">
      {aboutData.map((item, idx) => {
        const isHowItWorks = item.title === 'How It Works';
        const bulletBlock = item.description.find(
          (d) => typeof d === 'object' && d !== null && 'bullets' in d
        ) as { bullets: string[] } | undefined;

        return (
          <div key={idx} className="flex flex-col gap-4">
            <AboutCard
              imgUrl={item.imageUrl}
              title={item.title}
              description={item.description}
              replaceBullets={isHowItWorks} // 👈 NEW
            >
              {isHowItWorks && bulletBlock?.bullets ? (
                <>
                  <Carousel
                    bullets={bulletBlock.bullets}
                    currentIndex={carouselIndex}
                    setCurrentIndex={setCarouselIndex}
                  />
                  <Steps
                    total={bulletBlock.bullets.length}
                    current={carouselIndex}
                  />
                </>
              ) : null}
            </AboutCard>
          </div>
        );
      })}
    </div>
  );
};

export default About;
