import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import capIcon from '../assets/icons/capIcon.svg';
import MenuButton from './nav/MenuButton';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'New', to: '/', isCTA: true },
  { label: 'Discover', to: '/discover' },
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // Always show nav when at top
      if (currentY <= 10) {
        setScrollDir('up');
        setIsScrolled(false);
        return;
      }

      setIsScrolled(true);

      if (currentY > lastScrollY) {
        setScrollDir('down');
      } else {
        setScrollDir('up');
      }

      lastScrollY = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <div className="drawer z-50">
        <input
          id="mobile-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <div className="drawer-content">
          <nav
            className={`flex justify-between items-center p-2 w-full fixed z-50 top-0 transition-all duration-300 border-b-2 shadow-md transform ${
              scrollDir === 'down' ? '-translate-y-full' : 'translate-y-0'
            } ${isScrolled ? 'backdrop-blur-sm bg-base-100' : 'bg-base-100'}`}
          >
            {/* Logo */}
            <div className="flex items-center">
              <div className="cap-icon border rounded-full h-[1.5rem] w-[1.5rem] flex items-center justify-center bg-primary mx-1">
                <img src={capIcon} alt="cap icon" className="size-4" />
              </div>
              <Link to="/" className="text-primary text-sm hidden md:flex">
                Aguidor
              </Link>
            </div>

            {/* Desktop nav links - hide on scroll down */}
            <div
              className={`hidden md:flex justify-center transition-all duration-300 ${
                scrollDir === 'down'
                  ? 'opacity-0 -translate-y-4 pointer-events-none'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              <ul className="menu-horizontal text-xs">
                {navLinks.map(({ label, to, isCTA }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className={`m-2 ${
                        isCTA
                          ? 'rounded font-bold border-r-2 border-b-2 border-black p-2 hover:text-accent transform hover:scale-110 ease-in duration-100'
                          : 'hover:text-accent text-neutral font-bold'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile menu button */}
            <div
              className={`p-2 md:hidden transition-all duration-300 transform ${
                scrollDir === 'down' ? '-translate-y-full' : 'translate-y-0'
              }`}
            >
              <label htmlFor="mobile-drawer">
                <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
              </label>
            </div>

            {/* Desktop auth buttons - always visible */}
            <div className="hidden md:flex gap-2 px-4">
              <Link
                to="/"
                className="btn btn-outline border-r-2 border-b-2 border-black"
              >
                Login
              </Link>
              <Link
                to="/"
                className="btn btn-primary border-r-2 border-b-2 border-black"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>

        {/* Mobile drawer sidebar */}
        <div className="drawer-side z-40 h-screen">
          <label
            htmlFor="mobile-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content pt-20 space-y-2 ">
            {navLinks.map(({ label, to, isCTA }) => (
              <li key={label}>
                <Link
                  to={to}
                  className={`${
                    isCTA
                      ? 'border border-r-2 border-b-2 border-black w-full'
                      : 'font-extrabold'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <hr />
            <li className="mt-2">
              <Link
                to="/"
                className="btn w-full mb-2 border-r-2 border-b-2 border-black"
              >
                Login
              </Link>
              <Link
                to="/"
                className="btn btn-primary border-r-2 border-b-2 border-black"
              >
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
