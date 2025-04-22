import { useState, useEffect } from 'react';
import menuIcon from '../assets/icons/menuIcon.svg';
import capIcon from '../assets/icons/capIcon.svg';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`border-b-2 border-emerald-300 shadow-md shadow-emerald-50/20 flex 
      justify-between items-center p-2 w-full fixed z-50 top-0 transition-all duration-300 
      ${isScrolled ? 'backdrop-blur-sm bg-black/50' : ''}`}
      >
        <div className=" flex flex-row items-center w-1/4">
          <div className="cap-icon border rounded-full h-[1.5rem] w-[1.5rem] flex items-center justify-center bg-emerald-300/80 mx-1">
            <img src={capIcon} alt="" className="size-4 font-extrabold" />
          </div>
          <Link
            to="/"
            className="hover-effect text-effect text-sm hidden md:flex"
          >
            Learn Again
          </Link>
        </div>

        <div className="hidden md:flex justify-center">
          <ul className=" menu-horizontal text-xs ">
            <li>
              <Link to="/" className="nav-link hover-effect m-2">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-link hover-effect m-2">
                Features
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link hover-effect m-2">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-emerald-300  ease-in duration-300 m-2 border rounded-xl px-4 py-2 text-shadow"
              >
                New
              </Link>
            </li>
            <li>
              <Link to="/Explore" className="nav-link hover-effect m-2">
                Explore
              </Link>
            </li>
          </ul>
        </div>

        <button>
          <img src={menuIcon} alt="" className="size-4 md:hidden" />
        </button>
        <div className="btn-container hidden md:flex gap-2 px-4">
          <Link
            to="/"
            className="btn text-slate-50 btn-outline border-emerald-300 hover:bg-emerald-400/10 "
          >
            Login
          </Link>
          <Link to="/" className="btn border-0 bg-emerald-300 ">
            Sign Up
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
