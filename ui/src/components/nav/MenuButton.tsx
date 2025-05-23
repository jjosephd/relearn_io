import React from 'react';

interface HamburgerButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuButton: React.FC<HamburgerButtonProps> = ({ isOpen, setIsOpen }) => (
  <button
    onClick={() => setIsOpen(!isOpen)}
    aria-label="Toggle menu"
    className="flex flex-col justify-evenly w-7 h-6 relative z-50 focus:outline-none"
  >
    <span
      className={`h-0.5 w-full bg-white rounded outline transition-all duration-300 ease-in-out border-r-0.5 border-b-1 border-black
        ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
    />
    <span
      className={`h-0.5 w-full bg-white rounded outline transition-all duration-300 ease-in-out border-r-0.5 border-b-1 border-black
        ${isOpen ? 'opacity-0' : ''}`}
    />
    <span
      className={`h-0.5 w-full bg-white rounded outline transition-all duration-300 ease-in-out border-r-0.5 border-b-1 border-black
        ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
    />
  </button>
);

export default MenuButton;
