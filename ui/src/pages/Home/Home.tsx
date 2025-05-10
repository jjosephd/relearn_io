import { useInView } from 'react-intersection-observer';
import Hero from './Hero';
import generatedLearn from '../../assets/generated-learn.png';
import scholarshipFigure from '../../assets/scholarship-figure.png';
import '../../styles/Home.css';
import Card from './Card';

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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full place-items-center md:flex md:flex-row md:justify-between">
                  <Card
                    title={
                      ' 11% Of All Adults in the U.S Are Interested in Returning to School'
                    }
                    description={
                      <p>
                        Navigate Your Learning Path with{' '}
                        <span className="font-semibold">Ease: </span>
                        Everything You Need, All in One Spot
                      </p>
                    }
                    imgUrl={generatedLearn}
                  />
                  <Card
                    title={' Flip the Script: Career Moves That Pay Off'}
                    description={
                      <p>
                        A survey conducted by BrainManager.io revealed that
                        90.91% of individuals who changed careers reported
                        experiencing a salary increase.
                      </p>
                    }
                    imgUrl={scholarshipFigure}
                  />

                  <Card
                    title={
                      ' 11% Of All Adults in the U.S Are Interested in Returning to School'
                    }
                    description={
                      <p>
                        Navigate Your Learning Path with{' '}
                        <span className="font-semibold">Ease: </span>
                        Everything You Need, All in One Spot
                      </p>
                    }
                    imgUrl={generatedLearn}
                  />
                </div>
              </div>
            </div>
            <div className="chart-area">
              <div className="chart-layout w-full h-full flex flex-col">
                <h2 className="text-4xl font-bold mb-4 text-center">
                  Did You Know
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
