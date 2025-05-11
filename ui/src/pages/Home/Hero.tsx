import { Link } from 'react-router-dom';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  return (
    <div className="hero flex flex-col items-center w-full min-h-[80vh] px-4 justify-evenly">
      <div className="container">
        <div className="font-bold text-4xl text-center md:text-4xl mb-4 uppercase">
          Start again,
          <div className="relative inline-block">
            {' '}
            <span className="relative z-10">smarter</span>
            <div className="absolute bottom-0 right-0  h-1/2 w-3/4 bg-accent z-0"></div>
          </div>
          <div className="text-lg">Get started without the guesswork</div>
        </div>
        <div className="text-shadow text-slate-50 text-xs text-center mb-4">
          The platform built to help you get back on track
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full px-2 md:px-1 gap-4  justify-center">
        <Link
          to="/"
          className="btn rounded-full border-0  bg-emerald-300 text-black hover:bg-emerald-400 ease-in duration-300 shadow-emerald-300/20 shadow-xl"
        >
          <AcademicCapIcon className="h-4 w-4 " />
          <span className="">Get Started</span>
        </Link>
        <Link
          to="/"
          className="btn btn-ghost hover:bg-emerald-300/10 ease-in duration-300 border-emerald-300 rounded-full shadow-xl shadow-emerald-300/20"
          prefetch="viewport"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="oklch(0.845 0.143 164.978)"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>

          <span className="text-emerald-300">Learn More</span>
        </Link>
      </div>
      <div className="container">
        <div className="container flex flex-col items-center justify-center  p-12">
          <h1 className="text-xl text-center font-extralight text-shadow md:w-3/4">
            Simplifying Your Learning Journey
          </h1>
          <h2 className="text-sm text-center p-2 font-extralight text-slate-50/50 lg:w-1/2 shadow-md">
            How you start can go a long way in determining how you finish. Spend
            less time figuring out how, and more time getting prepared.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;
