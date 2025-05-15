import { motion } from 'framer-motion';
interface StepsProps {
  total: number;
  current: number;
}

const Steps = ({ total, current }: StepsProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Background bar */}
      <div className="absolute top-1/2 left-0 w-full h-2  rounded transform -translate-y-1/2 z-0" />

      {/* Animated progress bar fill */}
      <motion.div
        className="absolute top-1/2 left-0 h-2 bg-green-500 rounded z-10"
        style={{ width: `${(current / (total - 1)) * 100}%` }}
        initial={false}
        animate={{ width: `${(current / (total - 1)) * 100}%` }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      {/* Steps */}
      <ul className="relative z-20 flex justify-between items-center w-full">
        {Array.from({ length: total }).map((_, idx) => (
          <li
            key={idx}
            className={`w-8 h-8 rounded-full flex items-center justify-center border border-r-2 border-b-2 border-black ${
              idx <= current
                ? 'bg-green-400 text-black '
                : 'bg-gray-400 text-gray-700 border-gray-600'
            }`}
          >
            {idx + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Steps;
