import { useInView } from 'react-intersection-observer';
import Hero from './Hero';
import Card from './Card';
import {
  SparklesIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  InboxIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

const featureCards = [
  {
    title: 'Personalized Guidance',
    description:
      'A conversational assistant that asks a few key questions (like your goals and schedule) and gives tailored school recommendations.',
    icon: <SparklesIcon className="h-10 w-10" />,
  },
  {
    title: 'Resume & App Help',
    description:
      'Get AI feedback on your resume and applications to confidently submit strong materials tailored to your target programs.',
    icon: <DocumentTextIcon className="h-10 w-10" />,
  },
  {
    title: 'Financial Aid Explainer',
    description:
      'Understand scholarships, grants, and aid eligibility in plain English — with comparisons built from real school data.',
    icon: <CurrencyDollarIcon className="h-10 w-10" />,
  },
  {
    title: 'Email Summarizer',
    description:
      'Connect Gmail to summarize confusing advisor threads and even auto-draft polite responses when needed.',
    icon: <InboxIcon className="h-10 w-10" />,
  },
  {
    title: 'School Discovery Tool',
    description:
      'Search and filter programs that match your lifestyle — online, self-paced, budget-friendly — all from verified databases.',
    icon: <AcademicCapIcon className="h-10 w-10" />,
  },
];

const Home = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="w-full">
        <Hero />
      </div>

      {/* Full-width accent section with SVG and cards */}
      <section className="relative bg-accent w-screen overflow-hidden pb-20">
        {/* SVG divider at the top */}
        <div className="absolute top-0 left-0 w-screen overflow-hidden leading-none z-10">
          <svg
            className="w-full h-16"
            viewBox="0 0 1440 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z"
            />
          </svg>
        </div>

        {/* Card grid content */}
        <div className="relative z-20 max-w-7xl mx-auto pt-24 px-4 md:px-12">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 text-center">
            What Relearn Offers
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {featureCards.map((feature) => (
              <Card
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Placeholder for next section */}
      <section className="w-full px-4 py-16">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Sign Up Component
        </h2>
      </section>
    </div>
  );
};

export default Home;
