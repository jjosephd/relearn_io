import { useState } from 'react';

import { ReactNode } from 'react';
import brushStroke from '../../assets/about/brush_stroke.png';

interface AboutCardProps {
  imgUrl: string;
  title: string;
  description: (string | { bullets: string[] })[];
  children?: ReactNode;
  replaceBullets?: boolean;
}

const AboutCard = ({
  imgUrl,
  title,
  description,
  children,
  replaceBullets = false,
}: AboutCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div className="card relative p-6 rounded-lg shadow-lg transition-shadow hover:shadow-xl border-2 border-r-4 border-b-4">
      <div className="text-xl font-bold mb-3 z-3">{title}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 relative">
        {/* Triangle SVG background */}
        <div className="absolute top-0 left-0  h-[220px] pointer-events-none">
          <svg
            className="w-full h-full transform scale-115 hidden md:block"
            viewBox="0 0 200 200"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="95" fill="oklch(100% 0.10 100)" />
          </svg>
        </div>

        {/* Main Image */}
        <div className="relative w-[200px] h-[200px] mb-4 hidden md:block">
          <div className="w-full h-full clip-pentagon overflow-hidden rotate-[-12deg] shadow-md">
            <img
              src={imgUrl}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Brush Stroke SVG background */}
        <div className="absolute bottom-0  left-0  h-full pointer-events-none">
          <img
            src={brushStroke}
            alt="brush stroke"
            className="w-[100px] h-[100px] object-bottom hidden md:block"
          />
        </div>

        {/* Description */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out text-sm leading-relaxed ${
            expanded ? 'max-h-[1000px]' : 'max-h-[200px]'
          }`}
        >
          <div className="space-y-4">
            {description.map((block, i) => {
              if (typeof block === 'string') {
                return <p key={i}>{block}</p>;
              }

              if (replaceBullets) {
                return children && expanded ? (
                  <div key={i} className="mt-4">
                    {children}
                  </div>
                ) : null;
              }

              return (
                <ul key={i} className="list-disc list-inside space-y-1 pl-4">
                  {block.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={toggleExpand}
          className="mt-4 text-sm font-medium text-blue-600 focus:outline-none"
        >
          {expanded ? 'Show Less' : 'Learn More'}
        </button>
      </div>
    </div>
  );
};

export default AboutCard;
