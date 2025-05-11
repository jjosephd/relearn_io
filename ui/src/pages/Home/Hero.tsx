import { Link } from 'react-router-dom';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Hero = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
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
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 px-2 md:px-1 justify-center"
      >
        <div className="relative w-full">
          <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          <input
            type="email"
            placeholder="Enter your email"
            className="pl-10 pr-4 py-2 rounded outline-none border-2 border-r-4 border-b-4 border-black w-full"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <button
          type="submit"
          className="btn rounded border-2 bg-primary text-black hover:bg-primary/80 ease-in duration-300 btn-outline border-r-4 border-b-4  border-black"
        >
          <AcademicCapIcon className="h-4 w-4" />
          <span className="uppercase">Join the waitlist</span>
        </button>
      </form>

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
