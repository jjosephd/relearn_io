import { useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

interface HowItWorksCarouselProps {
  bullets: string[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const Carousel = ({
  bullets,
  currentIndex,
  setCurrentIndex,
}: HowItWorksCarouselProps) => {
  const handleNext = () => {
    if (currentIndex < bullets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    // Reset to first slide if bullets change
    setCurrentIndex(0);
  }, [bullets]);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full text-center text-lg font-medium min-h-[4rem]">
        {bullets[currentIndex]}
      </div>
      <div className="flex justify-center gap-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="btn btn-sm btn-outline"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === bullets.length - 1}
          className="btn btn-sm btn-outline"
        >
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
