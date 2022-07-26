import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/redux-hooks";
import { uiActions } from "../store/ui-slice";

const useSignUpIn = (
  enteredEmail: string,
  enteredPassword: string,
  act: string
) => {
  type authObject = {
    idToken: string;
    expiresIn: string;
    localId: string;
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginRegister = async () => {
    let url: string | null;
    const apiKey = process.env.REACT_APP_AUTH_API_KEY;
    if (act === "Sign in") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    } else if (act === "Register") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    }
    try {
      const response = await fetch(url!, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = (await response.json()) as authObject;
      const token = responseData.idToken;
      const duration = responseData.expiresIn;
      const expirationDate = new Date(new Date().getTime() + (+duration) * 1000);
      localStorage.setItem("justHireMeDate", expirationDate.toISOString());
      localStorage.setItem("justHireMeLogin", token);
      navigate("/dev/profile");
      dispatch(uiActions.loggingInOut());
    } catch (error) {
      alert(error);
    }
  };

  return loginRegister;
};

export default useSignUpIn;
