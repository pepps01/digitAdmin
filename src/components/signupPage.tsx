import { ReactElement, useEffect } from "react";
import Image from "next/image";
import SignInForm from "./SignInForm";
import LoginImage from "../../src/assets/image/LoginImage.svg";
import Rocket from "../../src/assets/image/rocket.png";
import { ReactNode, useState } from "react";
import { Router, useRouter } from "next/router";
import { authActions } from "src/redux/store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "src/redux/store/ui-slice";
import Google from "../assets/image/google (1).png";
import Apple from "../assets/image/apple (1).png";
import Facebook from "../assets/image/facebook (1).png";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { success, loading, error, message } = useSelector(
    (state: any) => state.auth
  );
  const handleSignin = (data: any) => {
    dispatch(authActions.loginHandler(data));
  };

  useEffect(() => {
    if (loading === true) {
      dispatch(uiActions.openLoader());
    }
    if (loading === false) {
      dispatch(uiActions.closeLoader());
    }
    if (error.length > 0) {
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: error,
        })
      );
      setTimeout(() => {
        dispatch(uiActions.closeToast());
      }, 10000);
    }
    if (success) {
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: error,
          toastStyles: {
            backgroundColor: "green !important",
          },
        })
      );
      setTimeout(() => {
        dispatch(uiActions.closeToast());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch]);

  return (
    <div className="flex w-screen items-center justify-center md:justify-start flex-col md:flex-row max-w-screen overflow-hidden h-screen">
      <div className="hidden md:w-[600px] h-screen md:flex flex-col md:flex-row items-center justify-center relative">
        <div className="w-full hidden md:block">
          <Image
            src={LoginImage}
            className="w-full object-cover left-0"
            alt={""}
          />
        </div>

        <div className="w-[80%] h-[350px] bg-transparent  rounded-[20px] absolute top-[144px] left-[71px]">
          <div className="text-[26px] leading-[32px] text-grey90 font-semibold ">
            Create exceptional personalized experiences for your friends and
            loved ones
          </div>
          <div className="text-lg text-grey90 ">
            Buy and sell platform for all
          </div>
        </div>
      </div>
      <div className="w-full px-[60px] py-[30px] md:px-[150px] md:py-[120px] md:w-[calc(100vw-700px)]">
        <div className="w-full">
          <div className="text-darkPurple text-[32px] leading-10 font-extrabold w-full text-center">
            Welcome Back
          </div>
          {/* 
          <div className="flex justify-center items-center gap-[30px] mt-[30px]">
            <div className="h-10 w-10 border border-darkPurple flex justify-center items-center rounded-[10px]">
              <Image src={Google} alt={""} />
            </div>
            <div className="h-10 w-10 border border-darkPurple flex justify-center items-center rounded-[10px]">
              <Image src={Apple} alt={""} />
            </div>
            <div className="h-10 w-10 border border-darkPurple flex justify-center items-center rounded-[10px]">
              <Image src={Facebook} alt={""} />
            </div>
          </div>

          <div>
            <div className="border-t border-softGray w-full mt-[50px] relative flex items-center justify-center">
              <div className="bg-white absolute text-xs text-[#1D2939] px-0.5">
                {" "}
                Or log in with
              </div>
            </div>
          </div> */}
        </div>
        <SignInForm login={handleSignin} />
      </div>
    </div>
  );
};
export default SignUp;
