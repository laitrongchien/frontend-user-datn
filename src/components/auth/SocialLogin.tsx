"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "@/store/hooks";
import { googleLogin } from "@/store/features/authSlice";

const SocialLogin = () => {
  // const login = useGoogleLogin({
  //   onSuccess: (tokenResponse) => console.log(tokenResponse),
  //   onError: () => console.log("Login Failed"),
  // });
  const dispatch = useAppDispatch();
  return (
    <div className="mt-2">
      {/* <button
        onClick={() => login()}
        className="w-full border border-gray-200 py-2 px-2.5 rounded-lg flex items-center"
      >
        <FcGoogle size={26} />
        <p className="font-medium ml-8">Đăng nhập bằng google</p>
      </button> */}
      <div className="flex-center">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            dispatch(googleLogin(credentialResponse.credential || ""));
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          type="icon"
          size="large"
          shape="rectangular"
          theme="filled_blue"
        />
      </div>
    </div>
  );
};

export default SocialLogin;
