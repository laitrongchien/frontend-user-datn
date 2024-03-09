"use client";

import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full  flex-col min-h-full h-screen flex-center">
      <TailSpin
        height="50"
        width="50"
        color="orange"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p className="text-sm mt-2 font-semibold text-orange-500">Loading....</p>
    </div>
  );
};

export default Loading;
