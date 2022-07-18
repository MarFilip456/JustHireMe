import { useState, useEffect } from "react";

const useInput = (inputType: string) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setIsTouched(false);
    setInputValue("");
    setIsValid(false);
  };

  useEffect(() => {
    const validity = setTimeout(() => {
      if (inputType === "email") {
        setIsValid(inputValue.includes("@"));
      } else if (inputType === "password") {
        const regex1 = new RegExp("[A-Z]");
        const regex2 = new RegExp("[a-z]");
        const regex3 = new RegExp("[0-9]");

        setIsValid(
          regex1.test(inputValue) &&
            regex2.test(inputValue) &&
            regex3.test(inputValue) &&
            inputValue.length > 6
        );
      }
    }, 500);
    return () => {
      clearTimeout(validity);
    };
  }, [inputType, inputValue]);


  return {
    value: inputValue,
    isValid: isValid,
    isTouched: isTouched,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
