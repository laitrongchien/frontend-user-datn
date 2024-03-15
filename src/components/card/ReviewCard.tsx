import Image from "next/image";

const ReviewCard = () => {
  return (
    <div className="mt-4 py-2 border-b border-gray-400">
      <div className="flex items-center">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXPAer2ilVW8b1pynyMFWdAVGWQWeDgLICig&usqp=CAU"
          alt="avatar"
          width={54}
          height={54}
          className="w-[54px] h-[54px] object-cover rounded-full mr-2"
        />
        <div>
          <h1>fdfd</h1>
          <h1>fdfd</h1>
        </div>
      </div>
      <div className="rating rating-sm mt-2">
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star bg-orange-400"
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star bg-orange-400"
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star bg-orange-400"
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star bg-orange-400"
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star bg-orange-400"
          defaultChecked
        />
      </div>
      <p>Tuyet voi</p>
    </div>
  );
};

export default ReviewCard;
