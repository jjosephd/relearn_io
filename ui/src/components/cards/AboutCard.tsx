import { useState } from 'react';

interface AboutCardProps {
  imgUrl: string;
  title: string;
  description: (string | { bullets: string[] })[];
}

const AboutCard = ({ imgUrl, title, description }: AboutCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div className="card  p-6 rounded-lg shadow-lg transition-shadow hover:shadow-xl  ">
      <div className="text-xl font-bold mb-3">{title}</div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-auto rounded mb-4 hidden md:block"
        />

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out text-sm leading-relaxed ${
            expanded ? 'max-h-[1000px]' : 'max-h-[200px]'
          }`}
        >
          <div className="space-y-4">
            {description.map((block, i) =>
              typeof block === 'string' ? (
                <p key={i}>{block}</p>
              ) : (
                <ul key={i} className="list-disc list-inside space-y-1 pl-4">
                  {block.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              )
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center md:hidden">
        <button
          onClick={toggleExpand}
          className=" mt-4 text-sm font-medium text-blue-600  focus:outline-none"
        >
          {expanded ? 'Show Less' : 'Learn More'}
        </button>
      </div>
    </div>
  );
};

export default AboutCard;
