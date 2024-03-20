import { formatTimeDate } from "@/utils/common";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";

const ReviewCard = ({ review }: { review: any }) => {
  const { user } = useAppSelector((state) => state.auth);
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <input
          key={i}
          type="radio"
          name={`rating-${review._id}`}
          className="mask mask-star bg-orange-400 cursor-auto"
          checked={i === review.rating}
          disabled
        />
      );
    }
    return stars;
  };

  return (
    <div className="mt-4 py-2 border-b border-gray-400">
      <div className="flex items-center">
        <Image
          src={review.user.avatar}
          alt="avatar"
          width={54}
          height={54}
          className="w-[54px] h-[54px] object-cover rounded-full mr-2 border border-gray-300"
        />
        <div>
          <h1 className="font-semibold">
            {user._id === review.user._id ? "Bạn" : review.user.name}
          </h1>
          <h1 className="text-sm">{formatTimeDate(review.createdAt)}</h1>
        </div>
      </div>
      <div className="rating rating-sm mt-2">{renderStars()}</div>
      <p>{review.content}</p>
    </div>
  );
};

export default ReviewCard;
