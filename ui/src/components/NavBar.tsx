import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import capIcon from '../assets/icons/capIcon.svg';
import MenuButton from './nav/MenuButton';

// Centralized navigation link config
const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'New', to: '/', isCTA: true },
  { label: 'Discover', to: '/discover' },
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile drawer trigger + overlay */}
      <div className="drawer z-50 md:">
        <input
          id="mobile-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <div className="drawer-content">
          {/* Navbar for all screen sizes */}
          <nav
            className={`border-b-2 border-emerald-300 shadow-md shadow-emerald-50/20 flex 
              justify-between items-center p-2 w-full fixed z-50 top-0 transition-all duration-300 
              ${isScrolled ? 'backdrop-blur-sm bg-black' : ''}`}
          >
            {/* Left side logo */}
            <div className="flex items-center">
              <div className="cap-icon border rounded-full h-[1.5rem] w-[1.5rem] flex items-center justify-center bg-emerald-300/80 mx-1">
                <img src={capIcon} alt="cap icon" className="size-4" />
              </div>
              <Link
                to="/"
                className="hover-effect text-effect text-sm hidden md:flex"
              >
                Learn Again
              </Link>
            </div>

            {/* Desktop nav links */}
            <div className="hidden md:flex justify-center">
              <ul className="menu-horizontal text-xs">
                {navLinks.map(({ label, to, isCTA }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className={`m-2 ${
                        isCTA
                          ? 'text-emerald-300 ease-in duration-300 border rounded-xl px-4 py-2 text-shadow'
                          : 'nav-link hover-effect'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile menu toggle button */}
            <div className="md:hidden">
              <label htmlFor="mobile-drawer">
                <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
              </label>
            </div>

            {/* Desktop action buttons */}
            <div className="btn-container hidden md:flex gap-2 px-4">
              <Link
                to="/"
                className="btn text-slate-50 btn-outline border-emerald-300 hover:bg-emerald-400/10"
              >
                Login
              </Link>
              <Link to="/" className="btn border-0 bg-emerald-300">
                Sign Up
              </Link>
            </div>
          </nav>
        </div>

        {/* Drawer sidebar (mobile only) */}
        <div className="drawer-side z-40 h-screen">
          <label
            htmlFor="mobile-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content pt-20 space-y-2">
            {navLinks.map(({ label, to, isCTA }) => (
              <li key={label}>
                <Link
                  to={to}
                  className={`hover:text-emerald-400 ${
                    isCTA
                      ? 'text-emerald-600 font-bold border rounded px-3 py-2'
                      : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <hr />
            <li className="mt-2">
              <Link to="/" className="btn btn-outline w-full mb-2">
                Login
              </Link>
              <Link to="/" className="btn bg-emerald-300 w-full">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
