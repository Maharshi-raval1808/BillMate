import React, { useState, useEffect, useRef } from "react";

const slides = [
  {
    title: "Add Friends Easily",
    description: "Keep track of everyone you split bills with.",
    image: `${process.env.PUBLIC_URL}/Carousel_1.jpg`,
    bgColor: "bg-blue-100",
  },
  {
    title: "Manage Expenses",
    description: "Add and edit your expenses seamlessly.",
    image: `${process.env.PUBLIC_URL}/Carousel_2.jpg`,
    bgColor: "bg-green-100",
  },
  {
    title: "View Balances",
    description: "See who owes whom at a glance.",
    image: `${process.env.PUBLIC_URL}/Carousel_3.png`,
    bgColor: "bg-yellow-100",
  },
];

export default function Carousel() {
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
    <div className="relative w-full max-w-5xl mx-auto mt-8 md:mt-12 h-80 md:h-96 overflow-hidden rounded-xl shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center gap-6 p-0 md:p-6 rounded-xl shadow-lg absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out
            ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          style={{ background: 'linear-gradient(90deg, #e0e7ff 0%, #f0fdf4 100%)' }}
        >
          <div className="relative w-full md:w-1/2 h-full flex items-center justify-center">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover rounded-xl shadow-md scale-105"
              style={{ filter: 'brightness(0.95) saturate(1.1)' }}
            />
            <div className="absolute inset-0 rounded-xl" style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 100%)'}}></div>
          </div>
          <div className="flex flex-col justify-center gap-4 md:w-1/2 text-center md:text-left px-2 md:px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 drop-shadow-sm mb-2 animate-fadein">
              {slide.title}
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed animate-fadein">
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
  );
}
