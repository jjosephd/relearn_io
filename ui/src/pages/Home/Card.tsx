import React from 'react';
import { JSX } from 'react';

interface CardProps {
  title: string;
  description: React.ReactNode;
  icon: JSX.Element;
}

const Card: React.FC<CardProps> = ({ title, description, icon }) => {
  return (
    <div className="mb-2">
      <div className="card h-[220px] border-2 border-r-4 border-b-4 shadow-slate-50/10 shadow-lg p-4 rounded-lg max-w-[350px] font-light bg-slate-800/20">
        <div className="flex justify-center items-center mb-6 text-4xl">
          {icon}
        </div>
        <h1 className="card-title text-lg font-medium mb-3 text-slate-50">
          {title}
        </h1>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
    </div>
  );
};

export default Card;
