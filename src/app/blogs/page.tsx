const Blog = () => {
  return (
    <div className="h-[1000px] ">
      <div
        className="relative bg-center bg-cover w-full h-[calc(100vh-66px)] p-6 flex flex-col justify-center"
        style={{
          backgroundImage: `url("https://rentabikevn.com/wp-content/uploads/2022/09/riding-through-northern-Vietnam-on-a-Royal-Enfield-Himalayan-scaled.jpeg")`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <h1 className="font-sans font-extrabold text-5xl text-white z-10">
          KHÁM PHÁ BLOG
        </h1>
      </div>
    </div>
  );
};

export default Blog;
