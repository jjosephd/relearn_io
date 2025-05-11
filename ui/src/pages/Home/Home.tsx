import { useInView } from 'react-intersection-observer';
import Hero from './Hero';
import generatedLearn from '../../assets/generated-learn.png';
import scholarshipFigure from '../../assets/scholarship-figure.png';
import '../../styles/Home.css';
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
    triggerOnce: false, // Set to true if you want to load the component only once
    threshold: 0.1, // Adjust based on when you want to trigger the visibility
  });
  return (
    <>
      <div className="">
        <div className="hero-layout flex flex-col  w-full">
          <header>
            <Hero />
          </header>
        </div>
        <main>
          <div className="main-layout">
            <div className="mb-12">
              <div className="w-full">
                <section className="py-10 px-4 md:px-12 ">
                  <h2 className="text-2xl font-bold text-slate-100 mb-6">
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
                </section>
              </div>
            </div>
            <div className="chart-area">
              <div className="chart-layout w-full h-full flex flex-col">
                <h2 className="text-4xl font-bold mb-4 text-center">
                  Sign Up Component
                </h2>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
