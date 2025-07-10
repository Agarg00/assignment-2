import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';

const dummySlides = [
  {
    id: 1,
    imageUrl: 'https://placehold.co/1200x800/FF5733/FFFFFF?text=Slide+1',
    title: 'Crimson Peak',
    description: 'A vibrant view of fall foliage.',
    altText: 'Crimson Peak forest',
  },
  {
    id: 2,
    imageUrl: 'https://placehold.co/1200x800/33FF57/FFFFFF?text=Slide+2',
    title: 'Emerald Lake',
    description: 'Crystal clear waters reflecting the sky.',
    altText: 'Emerald Lake reflections',
  },
  {
    id: 3,
    imageUrl: 'https://placehold.co/1200x800/3357FF/FFFFFF?text=Slide+3',
    title: 'Sapphire City',
    description: 'Night lights of a sprawling metropolis.',
    altText: 'Sapphire City lights',
  },
  {
    id: 4,
    imageUrl: 'https://placehold.co/1200x800/FF33DA/FFFFFF?text=Slide+4',
    title: 'Amethyst Fields',
    description: 'Lavender fields stretching to the horizon.',
    altText: 'Amethyst lavender fields',
  },
  {
    id: 5,
    imageUrl: 'https://placehold.co/1200x800/FFBB33/FFFFFF?text=Slide+5',
    title: 'Golden Sands',
    description: 'Warm desert dunes under the setting sun.',
    altText: 'Golden desert sands',
  },
];

export interface Slide {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface SliderProps {
  slides: Slide[];
}

const HorizontalSlider = ({ slides }: SliderProps) => {
  const [direction, setDirection] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const getPreviousIndex = (idx: number): number =>
    (idx - 1 + slides.length) % slides.length;
  const getNextIndex = (idx: number): number => (idx + 1) % slides.length;

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex(getPreviousIndex(currentIndex));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex(getNextIndex(currentIndex));
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No slides to display.
      </div>
    );
  }

  const currentSlide: Slide = slides[currentIndex];
  const previousSlide: Slide = slides[getPreviousIndex(currentIndex)];
  const nextSlide: Slide = slides[getNextIndex(currentIndex)];

  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),

    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    // Exit state for leaving slide
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  return (
    <div className="flex items-center justify-center w-full max-w-7xl mx-auto my-12 relative h-[28rem] overflow-hidden rounded-3xl p-8 shadow-2xl">
      {/* Previous Preview Card */}
      {/* Positioned absolutely, partially off-screen to the left, blurred and faded */}
      <div
        className="absolute -left-6 top-1/2 -translate-y-1/2 w-[45%] h-[60%] z-10 prompt-card rounded-3xl shadow-lg flex flex-col items-center justify-center p-4 opacity-80 blur-sm cursor-pointer transform -translate-x-1/2 transition-all duration-500 ease-in-out hover:opacity-90 hover:blur-none"
        onClick={goToPrevious} // Navigate to previous slide on click
      >
        {/* Simplified content for preview: just the title */}
        <div className="text-white text-xl font-bold text-center">
          {previousSlide.title}
        </div>
      </div>

      {/* Main Slide Card wrapped with AnimatePresence for exit animations */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          // @ts-expect-error variant
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={direction}
          className="absolute inset-0 m-auto w-1/2 h-[80%] z-20 prompt-card rounded-3xl shadow-2xl flex flex-col items-start gap-8 justify-center p-8 pb-12 text-white"
        >
          {/* Icon based on current slide's icon property */}
          <div className="flex justify-between w-full items-center">
            <div className="orange-radial rounded-full p-4 mb-4 flex items-center justify-center h-fit border-[6px] border-[#362d58fe] before:content-[' '] before:rounded-l-full before:block before:h-1.5 before:w-16 ml-7 before:bg-[#362d58fe] before:absolute before:left-0">
              <Gift className='text-white' />
            </div>
            {/* Square Placeholder - using a simple div with a white background */}
            <div className="w-24 h-24 bg-gray-300 rounded-lg mb-6 shadow-inner"></div>
            <div className=""></div>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold mb-2 leading-tight">
              {currentSlide.title}
            </h2>
            {/* Subtitle */}
            <h3 className="text-2xl font-semibold mb-4 opacity-90">
              {currentSlide.subtitle}
            </h3>
            {/* Description */}
            <p className="text-base opacity-80 max-w-md">
              {currentSlide.description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (now outside the main card, over previews) */}
      <button
        // Positioned over the left preview's visible area
        className="absolute left-[8%] top-1/2 -translate-y-1/2 text-white text-4xl opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200 focus:outline-none z-30"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-14" />
      </button>
      <button
        // Positioned over the right preview's visible area
        className="absolute right-[8%] top-1/2 -translate-y-1/2 text-white text-4xl opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200 focus:outline-none z-30"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <ChevronRight className="size-14" />
      </button>

      {/* Next Preview Card */}
      <div
        className="absolute -right-6 top-1/2 -translate-y-1/2 w-[45%] h-[60%] z-10 prompt-card rounded-3xl shadow-lg flex flex-col items-center justify-center p-4 opacity-80 blur-sm cursor-pointer transform translate-x-1/2 transition-all duration-500 ease-in-out hover:opacity-90 hover:blur-none"
        onClick={goToNext} // Navigate to next slide on click
      >
        <div className="text-white text-xl font-bold text-center">
          {nextSlide.title}
        </div>
      </div>
    </div>
  );
};

const PromptCompanionCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl p-8 text-white mx-auto relative overflow-hidden w-full"
    >
      {/* @ts-expect-error slides */}
      <HorizontalSlider slides={dummySlides} />
    </motion.div>
  );
};

export default PromptCompanionCard;
