const Destination = () => {
  return (
    <div className="h-[1000px] ">
      <div
        className="relative bg-center bg-cover w-full h-[calc(100vh-66px)] p-6 flex flex-col justify-center"
        style={{
          backgroundImage: `url("https://rentabikevn.com/wp-content/uploads/2023/11/our-guide-looking-good-scaled-1-2048x1152.jpg")`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <h1 className="font-sans font-extrabold text-5xl text-white z-10">
          ĐỊA ĐIỂM YÊU THÍCH
        </h1>
        {/* <h3 className="text-2xl text-white mt-8 z-10">Tour motor trọn gói</h3> */}
      </div>
    </div>
  );
};

export default Destination;
