import { motion } from 'framer-motion';
interface StepsProps {
  total: number;
  current: number;
}

const Steps = ({ total, current }: StepsProps) => {
  return (
    <div className="w-full flex justify-center">
      <ul className="steps">
        {Array.from({ length: total }).map((_, idx) => (
          <li
            key={idx}
            className={`step ${idx <= current ? 'step-primary' : ''} `}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Steps;
