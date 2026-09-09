import { useEffect, useState } from "react";
import HidePassword from "../assets/image/hide-password.svg";
import ShowPassword from "../assets/image/show-password.svg";
import useInput from "../Hooks/use-input";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import store from "src/redux/store";
import { authActions } from "src/redux/store/auth-slice";
import { uiActions } from "src/redux/store/ui-slice";
import { is8Chars, isNotEmpty } from "src/utils/helperFunctions";

const SignInForm = ({ login }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(state => state.auth);
  const [formisValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formisTouched, setFormIsTouched] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const {
    enteredInput: enteredEmail,
    hasError: emailHasError,
    reset: emailReset,
    errorMessage: emailError,
    inputIsValid: emailIsValid,
    updateInputHandler: emailInputHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredPassword,
    hasError: passwordHasError,
    reset: passwordReset,
    errorMessage: passwordError,
    inputIsValid: passwordIsValid,
    updateInputHandler: passwordInputHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(is8Chars, "Password must be atleast 8 characters");

  const showFormError = !formisValid && formisTouched;

  const payload = {
    email: enteredEmail,
    password: enteredPassword,
  };

  const submitFormHandler = (e: any) => {
    e.preventDefault();
    setFormIsTouched(true);

    if (emailIsValid && passwordIsValid) {
      setFormIsValid(true);
      setIsLoading(true);
      const loginHandler = async () => {
        try {
          const res = await axios.post(
            "https://easy.unikmarketing.org/api/auth/login/admin",
            payload,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          dispatch(
            uiActions.openToastAndSetContent({
              toastContent: error,
              backgroundColor: "red",
            })
          );
          dispatch(authActions.loginHandler(res.data));
          setSuccess(true);
        } catch (err: any) {
          setIsLoading(false);
          console.log(err);
          dispatch(authActions.errorHandler(err));
        }
      };
      loginHandler();

      // login(payload);
    }
  };
  useEffect(() => {
    if (isLoading === true) {
      dispatch(uiActions.openLoader());
    }
    if (isLoading === false) {
      dispatch(uiActions.closeLoader());
    }
    if (success) {
      setTimeout(() => {
        
        window.location.href = "/dashboard/overview";
      }, 1000);
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: "Login Successfully",
          backgroundColor: "green",
        })
      );

      setIsLoading(false);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
    if (error.length > 0) {
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: error,
          backgroundColor: "red",
        })
      );
      setTimeout(() => {
        dispatch(authActions.clearState());
      }, 2000);
    }
  }, [dispatch, error, isLoading, success]);
  return (
    <Provider store={store}>
      <form onSubmit={submitFormHandler} className="w-full mt-[50px]">
        {showFormError && (
          <div className="text-red-400 text-[10px]">
            Fill form correctly to summit
          </div>
        )}

        <div className="border-[0.5px] border-lightGrey relative rounded-[10px] mt-[10px]">
          <label
            htmlFor="email"
            className="absolute top-[-6px] left-3 text-[10px] text-[#1D2939] bg-white"
          >
            Email Address or Username
          </label>
          <input
            type="text"
            name="email"
            value={enteredEmail}
            id="email"
            onBlur={emailBlurHandler}
            onChange={emailInputHandler}
            className="bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-4"
            placeholder="Email Address"
          />
        </div>
        <div className="text-red-400 text-[10px]">{emailError}</div>
        <div className="border-[0.5px] border-lightGrey relative bg-white  rounded-[10px] mt-[30px] flex justify-between">
          <label
            htmlFor="password"
            className="absolute top-[-6px] left-3 text-[10px] text-[#1D2939] bg-white"
          >
            Password
          </label>
          <input
            type={passwordShown ? "text" : "password"}
            name="password"
            value={enteredPassword}
            id="password"
            onBlur={passwordBlurHandler}
            onChange={passwordInputHandler}
            autoFocus={false}
            placeholder="Password"
            className="bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-4"
          />

          <span className="w-[11px] absolute right-1 top-[50%] -translate-y-[50%]">
            {!passwordShown ? (
              <Image src={ShowPassword} onClick={togglePassword} alt={""} />
            ) : (
              <Image src={HidePassword} onClick={togglePassword} alt={""} />
            )}
          </span>
        </div>
        <div className="text-red-400 text-[10px]">{passwordError}</div>

        <button
          type="submit"
          className="bg-lightPurple w-full text-white text-center py-3 rounded-[10px] mt-[30px]"
        >
          Sign In{" "}
        </button>
      </form>
    </Provider>
  );
};
export default SignInForm;
