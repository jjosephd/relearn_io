import AboutCard from '../components/cards/AboutCard';

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
      'College enrollment in the U.S. is declining. Rising costs, unclear job outcomes, and a changing economy have left millions questioning if school is still worth it—especially adults with jobs, kids, or debt.',
      "But here's what hasn't changed:",
      {
        bullets: [
          '📚 Parents returning to school after a gap',

          '🔁 Working adults pivoting into new industries',

          '🧰 Skilled workers exploring certifications or trades',

          '🧑‍💼 First-generation students navigating the process solo',
        ],
      },
      'Pathwise exists to simplify that journey.',
      'We bring together school data, program comparisons, and financial guidance—powered by AI and built with empathy—so you can choose an educational path that actually fits your life.',
    ],
  },
];

const About = () => {
  return (
    <div className="min-h-screen w-full flex flex-col gap-2 p-6 md:p-12 dark:bg-slate-800/20">
      {aboutData.map((item, idx) => (
        <AboutCard
          key={idx}
          imgUrl={item.imageUrl}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default About;
