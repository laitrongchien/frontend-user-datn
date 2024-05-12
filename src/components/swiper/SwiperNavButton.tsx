import { useSwiper } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const SwiperNavButton = () => {
  const [isBegin, setIsBegin] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiper = useSwiper();

  swiper.on("reachBeginning", function () {
    setIsBegin(true);
  });

  swiper.on("reachEnd", function () {
    setIsEnd(true);
  });

  const handleNext = () => {
    swiper.slideNext();
    setIsBegin(false);
  };

  const handlePrev = () => {
    swiper.slidePrev();
    setIsEnd(false);
  };

  return (
    <div className="w-full flex justify-between absolute top-[44%] px-2">
      <button onClick={handlePrev} className="z-10">
        <div className="w-9 h-9 flex-center rounded-full bg-white hover:bg-gray-200">
          <FaArrowLeft />
        </div>
      </button>

      <button onClick={handleNext} className="z-10">
        <div className="w-9 h-9 flex-center rounded-full bg-white hover:bg-gray-200">
          <FaArrowRight />
        </div>
      </button>
    </div>
  );
};

export default SwiperNavButton;
