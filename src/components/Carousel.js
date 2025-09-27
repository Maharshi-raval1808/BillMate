import React, { useState, useEffect, useRef } from "react";

function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    startInterval();
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    resetInterval();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    resetInterval();
  };

  const goToSlide = (index) => {
    setCurrent(index);
    resetInterval();
  };

  return (
    <div className="flex flex-col items-center w-full">
  <div className="relative w-full max-w-5xl mx-auto mt-6 md:mt-12 h-72 sm:h-80 md:h-[24rem] overflow-hidden rounded-xl shadow-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-6 p-2 sm:p-4 md:p-6 rounded-xl shadow-lg absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out
              ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            style={{ background: 'linear-gradient(90deg, #e0e7ff 0%, #f0fdf4 100%)' }}
          >
            <div className="relative w-full sm:w-1/2 h-40 sm:h-full flex items-center justify-center">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-contain sm:object-cover rounded-xl shadow-md"
                style={{ filter: 'brightness(0.97) saturate(1.1)' }}
              />
              <div className="absolute inset-0 rounded-xl" style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 100%)'}}></div>
            </div>
            <div className="flex flex-col justify-center gap-2 sm:gap-4 w-full sm:w-1/2 text-center sm:text-left px-3 sm:px-4 md:px-6">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-blue-700 drop-shadow-sm mb-1 sm:mb-2 animate-fadein break-words">
                {slide.title}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed animate-fadein break-words whitespace-pre-line" style={{wordBreak: 'break-word'}}>
                {slide.description}
              </p>
            </div>
          </div>
        ))}

        {/* Invisible click zones for navigation */}
        <div
          className="absolute top-0 left-0 h-full w-1/2 cursor-pointer z-20"
          onClick={prevSlide}
        />
        <div
          className="absolute top-0 right-0 h-full w-1/2 cursor-pointer z-20"
          onClick={nextSlide}
        />
      </div>
  {/* Add more space below carousel for mobile */}
  <div className="mb-14 sm:mb-8 md:mb-12"></div>
    </div>
  );
}

export default Carousel;
