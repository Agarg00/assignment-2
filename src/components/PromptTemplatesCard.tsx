import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Slide, SliderProps } from "./PromptCompanionCard";
import { ChevronDown, ChevronUp, Fan } from "lucide-react";

const dummySlides = [
  {
    id: 1,
    title: "Crimson Peak",
    description: "A vibrant view of fall foliage.",
    altText: "Crimson Peak forest",
  },
  {
    id: 2,
    title: "Emerald Lake",
    description: "Crystal clear waters reflecting the sky.",
    altText: "Emerald Lake reflections",
  },
  {
    id: 3,
    title: "Sapphire City",
    description: "Night lights of a sprawling metropolis.",
    altText: "Sapphire City lights",
  },
  {
    id: 4,
    title: "Amethyst Fields",
    description: "Lavender fields stretching to the horizon.",
    altText: "Amethyst lavender fields",
  },
  {
    id: 5,
    title: "Golden Sands",
    description: "Warm desert dunes under the setting sun.",
    altText: "Golden desert sands",
  },
];

const VerticalSlider = ({ slides }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const scrollTimeoutRef = useRef<number | null>(null);

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
      y: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      y: 0, // Centered
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    // Exit state for leaving slide
    exit: (direction: number) => ({
      y: direction < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  // Helper function to render SVG icons based on iconType
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "gift":
        return (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.5 3A2.5 2.5 0 003 5.5v2.25a.75.75 0 001.5 0V5.5A1 1 0 015.5 4h9A1 1 0 0116 5.5v2.25a.75.75 0 001.5 0V5.5A2.5 2.5 0 0014.5 3h-9zM3 10.5a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3 14.5a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "star":
        return (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
        );
      case "code":
        return (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.633l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "book":
        return (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h1a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 000-2H7zm3 0a1 1 0 000 2h.01a1 1 0 000-2H10zm3 0a1 1 0 000 2h.01a1 1 0 000-2H13zm-3 4a1 1 0 000 2h.01a1 1 0 000-2H10z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "cloud":
        return (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.25 7.5a8.25 8.25 0 0116.5 0v1.5a.75.75 0 01-.75.75H2.25a.75.75 0 01-.75-.75V7.5z" />
            <path
              fillRule="evenodd"
              d="M12.5 13.5a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm-3 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm-3 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleWheelScroll = (event: React.WheelEvent) => {
    event.preventDefault();

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (event.deltaY > 0) {
        goToNext();
      } else if (event.deltaY < 0) {
        goToPrevious();
      }
      scrollTimeoutRef.current = null;
    }, 200);
  };

  return (
    <div
      onWheel={handleWheelScroll}
      className="flex flex-col items-center justify-center w-full mx-auto my-12 relative h-[40rem] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black p-8 shadow-2xl"
    >
      {/* Vertical Timeline Line - remains central */}
      <div
        className="absolute left-1/2 -translate-x-1/2 h-2/3 w-[2px] z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(41, 41, 41, 0) 0%, #9972FD 51.92%, rgba(41, 41, 41, 0) 100%)",
        }}
      />

      {/* Timeline Dot - positioned next to the main card on the right side of the timeline */}
      <div
        className="absolute left-[50] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #9A73FD 0%, #9A73FD 100%)",
        }}
      ></div>

      {/* Previous Preview Card (Top, Left-aligned) */}
      <div
        // Positioned left of the timeline, showing 50% of its height from the bottom
        className="absolute top-0 left-0 w-[calc(50%-1rem)] h-[40%] scale-75 z-10 prompt-card rounded-3xl shadow-lg flex flex-col items-center justify-center p-4 opacity-30 blur-sm cursor-pointer transform transition-all duration-500 ease-in-out hover:opacity-50 hover:blur-none"
        onClick={goToPrevious} // Navigate to previous slide on click
      >
        {/* Content for timeline preview cards */}
        <div className="text-white text-xl font-bold text-center">
          {previousSlide.title}
        </div>
        {previousSlide.subtitle && (
          <div className="text-white text-sm mt-1">
            {previousSlide.subtitle}
          </div>
        )}
        {previousSlide.description && (
          <div className="text-white text-xs mt-1">
            {previousSlide.description}
          </div>
        )}
      </div>

      {/* Main Slide Card wrapped with AnimatePresence for exit animations (Right-aligned) */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          // @ts-expect-error varient
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={direction}
          className="absolute inset-0 m-auto left-[calc(50%+1rem)] w-[calc(40%-1.5rem)] h-[30%] z-20 prompt-card rounded-3xl shadow-2xl flex flex-col items-start justify-between gap-3 p-8 pt-4 text-white"
        >
          {/* Conditional rendering based on isCompanionCard */}
          {/* @ts-expect-error cond */}
          {currentSlide.isCompanionCard ? (
            <>
              {/* Icon for companion card */}
              <div className="bg-orange-500 rounded-full p-3 mb-4 flex items-center justify-center">
                {/* @ts-expect-error cond  icon type*/}
                {renderIcon(currentSlide.iconType || "")}
              </div>
              {/* Square Placeholder - using a simple div with a white background */}
              <div className="w-24 h-24 bg-white rounded-lg mb-6 shadow-inner"></div>
              {/* Title */}
              <h2 className="text-4xl font-extrabold mb-2 text-center leading-tight">
                {currentSlide.title}
              </h2>
              {/* Description */}
              <p className="text-base text-center opacity-80 max-w-md">
                {currentSlide.description}
              </p>
              {/* "Start from Year" text and circular button */}
              <div className="flex items-center justify-center mt-6">
                <span className="text-sm opacity-70 mr-2">
                  {/* @ts-expect-error year */}
                  Start from {currentSlide.year}
                </span>
                <button className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl hover:bg-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-75">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Content for timeline preview cards when they are the main slide */}
              <h2 className="text-4xl font-extrabold mb-2 text-center leading-tight">
                {currentSlide.title}
              </h2>
              {currentSlide.subtitle && (
                <h3 className="text-2xl font-semibold mb-4 text-center opacity-90">
                  {currentSlide.subtitle}
                </h3>
              )}
              <p className="text-base text-center opacity-80 max-w-md">
                {currentSlide.description}
              </p>
              <div className="purple-gradient ml-auto rounded-full p-4 mb-4 flex items-center justify-center h-fit border-[6px] border-[#362d58fe] after:content-[' '] after:rounded-l-full after:block after:h-1.5 after:w-16 mr-7 after:bg-[#362d58fe] after:absolute after:right-0">
                <Fan />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (now left-aligned, over previews) */}
      <button
        // Positioned over the top preview's visible area on the left
        className="absolute top-10 left-[22%] text-white text-4xl opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200 focus:outline-none z-30"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <ChevronUp className="size-12" />
      </button>
      <button
        // Positioned over the bottom preview's visible area on the left
        className="absolute bottom-10 left-[22%] text-white text-4xl opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200 focus:outline-none z-30"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <ChevronDown className="size-12" />
      </button>

      {/* Next Preview Card (Bottom, Left-aligned) */}
      <div
        // Positioned left of the timeline, showing 50% of its height from the top
        className="absolute scale-75 bottom-0 left-0 w-[calc(50%-1rem)] h-[40%] z-10 prompt-card rounded-3xl shadow-lg flex flex-col items-center justify-center p-4 opacity-30 blur-sm cursor-pointer transform transition-all duration-500 ease-in-out hover:opacity-50 hover:blur-none"
        onClick={goToNext} // Navigate to next slide on click
      >
        {/* Content for timeline preview cards */}
        <div className="text-white text-xl font-bold text-center">
          {nextSlide.title}
        </div>
        {nextSlide.subtitle && (
          <div className="text-white text-sm mt-1">{nextSlide.subtitle}</div>
        )}
        {nextSlide.description && (
          <div className="text-white text-xs mt-1">{nextSlide.description}</div>
        )}
      </div>
    </div>
  );
};

const PromptTemplatesCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#1e1e3f] rounded-3xl p-8 text-white w-full mx-auto relative overflow-hidden"
    >
      {/* @ts-expect-error slides */}
      <VerticalSlider slides={dummySlides} />
    </motion.div>
  );
};

export default PromptTemplatesCard;
