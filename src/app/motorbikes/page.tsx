const Motorbike = () => {
  return (
    <div className="h-[1000px] ">
      <div
        className="relative bg-center bg-cover w-full h-[calc(100vh-74px)] p-6 flex flex-col justify-center"
        style={{
          backgroundImage: `url("https://rentabikevn.com/wp-content/uploads/2023/03/Rentabike-Vietnam-Honda-CB500x-Front-left-2048x1153.jpg")`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <h1 className="font-sans font-extrabold text-5xl text-white z-10">
          THUÊ XE MOTOR
        </h1>
      </div>
    </div>
  );
};

export default Motorbike;
