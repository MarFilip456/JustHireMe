import { useAppDispatch } from "../store/redux-hooks";
import { uiActions } from "../store/ui-slice";

const useSignUpIn = (
  enteredEmail: string,
  enteredPassword: string,
  act: string,
  isDev: boolean,
) => {
  type authObject = {
    idToken: string;
    expiresIn: string;
    localId: string;
  };

  const dispatch = useAppDispatch();

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
      dispatch(uiActions.loggingInOut());
      if (isDev) {
        localStorage.setItem("justHireMeDev", "dev");
      }
    } catch (error) {
      alert(error);
    }
  };

  /* const putUserInDatabase = async() => {
    if (act === "Sign in") {
      return
    }
  } */

  return loginRegister;
};

export default useSignUpIn;
