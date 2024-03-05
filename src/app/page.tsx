import ImageSwiper from "@/components/swiper/ImageSwiper";
import Link from "next/link";
import TourSwiper from "@/components/swiper/TourSwiper";
import Welcome from "@/components/global/Welcome";
import Image from "next/image";
import DestinationSwiper from "@/components/swiper/DestinationSwiper";
import { tourService } from "@/services/api/tour";

export default async function Home() {
  const popularTours = await (await tourService.getPopularTours()).data;
  return (
    <>
      <ImageSwiper />
      <Welcome />
      <div className="p-10">
        <div className="overflow-hidden mb-16 relative rounded-xl mt-6">
          <Image
            src="https://rentabikevn.com/wp-content/uploads/2023/03/Rentabike-Vietnam-Honda-CB500x-Front-left-2048x1153.jpg"
            alt="rent motor"
            width={2048}
            height={1153}
            className="w-full object-cover h-[500px] "
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute top-[36%] left-20">
            <h1 className="font-sans font-extrabold text-4xl text-white z-10 mb-8">
              THUÊ XE MOTOR
            </h1>
            <Link
              href={"/motorbikes"}
              className="text-white px-4 py-2 border border-white rounded-xl hover:bg-primary"
            >
              Xem tất cả
            </Link>
          </div>
        </div>
        <div className="overflow-hidden mb-16 relative rounded-xl">
          <Image
            src="https://rentabikevn.com/wp-content/uploads/2022/09/crazy-mountains-up-in-northern-Vietnam-scaled.jpg"
            alt="view tours"
            width={2048}
            height={1153}
            className="w-full object-cover h-[500px] "
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="absolute top-[36%] left-20">
            <h1 className="font-sans font-extrabold text-4xl text-white z-10 mb-8">
              TOUR XE MOTOR
            </h1>
            <Link
              href={"/tours"}
              className="text-white px-4 py-2 border border-white rounded-xl hover:bg-primary"
            >
              Xem tất cả
            </Link>
          </div>
        </div>

        <div className="mb-16">
          <h1 className="text-4xl font-semibold mb-6 font-sans text-center text-gray-900">
            TOUR PHỔ BIẾN
          </h1>
          <TourSwiper tours={popularTours} />
          <div className="flex-center mt-6">
            <Link
              href={"/"}
              className="text-primary font-semibold border border-primary px-6 py-2 hover:text-white hover:bg-primary"
            >
              Xem tất cả
            </Link>
          </div>
        </div>

        <div className="mb-16">
          <h1 className="text-4xl font-semibold mb-6 font-sans text-center text-gray-900">
            ĐIỂM ĐẾN YÊU THÍCH
          </h1>
          <DestinationSwiper images={[1, 2, 3, 4, 5, 6]} />
          <div className="flex-center mt-6">
            <Link
              href={"/"}
              className="text-primary font-semibold border border-primary px-6 py-2 hover:text-white hover:bg-primary"
            >
              Xem tất cả
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
