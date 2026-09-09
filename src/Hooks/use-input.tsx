import { useState } from "react";

const useInput = (validateFunction: any, error: string) => {
  const [enteredInput, setEnteredInput] = useState<any>();
  const [enteredRadioInput, setEnteredRadioInput] = useState({});
  const [isTouched, setIsTouched] = useState(false);

  const updateInputHandler = (e: any) => {
    setEnteredInput(e.target.value);
  };
  const inputBlurHandler = () => {
    setIsTouched(true);
  };
  const handleChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setEnteredRadioInput({ [name]: value });
  };

  const inputIsValid = validateFunction(enteredInput);
  const hasError = !inputIsValid && isTouched;
  const reset = () => {
    setEnteredInput("");
    setIsTouched(false);
  };
  const errorMessage = hasError && <p className="error-text">{error}</p>;

  return {
    enteredInput,
    hasError,
    enteredRadioInput,
    inputIsValid,
    errorMessage,
    updateInputHandler,
    handleChangeHandler,
    reset,
    inputBlurHandler,
  };
};
export default useInput;
