import Image from "next/image";

const Welcome = () => {
  return (
    <div className="flex px-10 pt-12">
      <div className="basis-[36%] max-lg:hidden">
        <Image
          src="https://rentabikevn.com/wp-content/uploads/2022/09/stopping-to-take-a-picture-of-the-sunset-over-Da-Bac-in-Hoa-Binh-Province-1024x1024.jpg"
          alt="Welcome"
          width={475}
          height={424}
          style={{ width: "100%", height: "auto" }}
          className="rounded-lg"
        />
      </div>
      <div className="lg:basis-[64%] lg:p-14">
        <h1 className="font-sans text-5xl font-semibold mt-6">
          MOTORTOUR VIETNAM
        </h1>
        <p className="mt-6 mb-12">
          Chào mừng bạn đến với Motortour, dịch vụ cho thuê xe motor và điều
          hành tour du lịch xe motor. Cho dù bạn đang muốn thuê một chiếc xe
          motor hay đi tham quan, chúng tôi đều sẵn sàng hỗ trợ bạn
        </p>
        <div className="flex">
          <div>
            <p>Tour du lịch</p>
            <p className="font-sans text-4xl mt-4 font-semibold">100+</p>
          </div>
          <div className="ml-8">
            <p>Phượt thủ</p>
            <p className="font-sans text-4xl mt-4 font-semibold">10000+</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
