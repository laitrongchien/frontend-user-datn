import Link from "next/link";
import Image from "next/image";
import { tourService } from "@/services/api/tour";
import TourSwiper from "@/components/swiper/TourSwiper";
import DestinationSwiper from "@/components/swiper/DestinationSwiper";
import SearchForm from "@/components/global/SearchForm";

export default async function Home() {
  const popularTours = await (await tourService.getPopularTours()).data;
  const popularDestinations = [
    {
      name: "Cao Bằng",
      image:
        "https://motorbiketourexpert.com/demo/wp-content/uploads/2024/01/Amazing-Cao-Bang.jpg",
    },
    {
      name: "Hà Giang",
      image:
        "https://motorbiketourexpert.com/demo/wp-content/uploads/2023/12/Frame-14-min-scaled.jpg",
    },
    {
      name: "Mù Cang Chải",
      image:
        "https://motorbiketourexpert.com/demo/wp-content/uploads/2023/12/Frame-1-scaled.jpg",
    },
    {
      name: "Mã Pí Lèng",
      image:
        "https://motorbiketourexpert.com/demo/wp-content/uploads/2023/12/bg.jpg",
    },
    {
      name: "Tà Xùa",
      image:
        "https://motorbiketourexpert.com/demo/wp-content/uploads/2023/12/Frame-6-min-scaled.jpg",
    },
    {
      name: "Hồ Thác Bà",
      image:
        "https://motorbiketourexpert.com/demo/wp-content/uploads/2024/01/Thac-Ba-lake-Yen-Bai.jpg",
    },
  ];

  return (
    <>
      <div className="relative lg:h-[calc(100vh-160px)] max-sm:h-[400px]">
        <Image
          src="https://motorbiketourexpert.com/demo/wp-content/uploads/2024/01/Northwest-Vietnam-touring.jpg"
          alt="imgCover"
          sizes="100vw"
          width={2048}
          height={1153}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute left-0 bottom-0 w-full flex justify-center">
          <SearchForm />
        </div>
      </div>
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
              THUÊ XE MÁY
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
              TOUR XE MÁY
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
          <h1 className="text-[36px] font-semibold mb-6 text-center text-gray-800">
            Tour nổi bật
          </h1>
          <TourSwiper tours={popularTours} />
          <div className="flex-center mt-6">
            <Link
              href={"/tours"}
              className="text-primary font-semibold border border-primary px-6 py-2 hover:text-white hover:bg-primary"
            >
              Xem tất cả
            </Link>
          </div>
        </div>

        <div className="mb-16">
          <h1 className="text-[36px] font-semibold mb-6 text-center text-gray-800">
            Điểm đến yêu thích
          </h1>
          <DestinationSwiper destinations={popularDestinations} />
        </div>
      </div>
    </>
  );
}
