import { useSwiper } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";

const SwiperNavButton = () => {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const checkSlideStatus = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };

    swiper.on("slideChange", checkSlideStatus);

    return () => {
      swiper.off("slideChange", checkSlideStatus);
    };
  }, [swiper]);

  const handleNext = () => {
    swiper.slideNext();
  };

  const handlePrev = () => {
    swiper.slidePrev();
  };

  return (
    <div className="w-full flex justify-between absolute top-[44%] px-2">
      <button onClick={handlePrev} className="z-10" disabled={isBeginning}>
        <div
          className={`w-9 h-9 flex-center rounded-full bg-white hover:bg-gray-200 ${
            isBeginning ? "opacity-50" : ""
          }`}
        >
          <FaArrowLeft />
        </div>
      </button>

      <button onClick={handleNext} className="z-10" disabled={isEnd}>
        <div
          className={`w-9 h-9 flex-center rounded-full bg-white hover:bg-gray-200 ${
            isEnd ? "opacity-50" : ""
          }`}
        >
          <FaArrowRight />
        </div>
      </button>
    </div>
  );
};

export default SwiperNavButton;
