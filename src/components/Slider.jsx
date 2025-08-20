import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SliderComponent = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://i.ibb.co.com/G3JGVn85/mixed-fried-meat-with-pomegranate-sauce.jpg",
      caption: "Fresh Recipes Everyday 🍲",
    },
    {
      id: 2,
      image:
        "https://i.ibb.co.com/Z12jbrsY/delicious-cream-pumpkin-soup-bowl-wooden-table-Copy.jpg",
      caption: "Cook With Love ❤️",
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/W4f0RSRc/chicken-tomato-sauce-with-rice.jpg",
      caption: "Share Your Favorite Dishes 🍛",
    },
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative w-full  mx-auto overflow-hidden  shadow-lg">
      {/* Images */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.caption}
              className="w-full h-[600px] object-cover"
            />
            <p className="absolute bottom-6 left-6 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-lg">
              {slide.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-110 transition"
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-110 transition"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              current === idx ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderComponent;
