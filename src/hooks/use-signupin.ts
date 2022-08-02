import { useAppDispatch } from "../store/redux-hooks";
import { uiActions } from "../store/ui-slice";

const useSignUpIn = (
  enteredEmail: string,
  enteredPassword: string,
  act: string,
  isDev: boolean
) => {
  type authObject = {
    idToken: string;
    expiresIn: string;
    localId: string;
  };

  const dispatch = useAppDispatch();
  let userId: string;
  const loginRegister = async () => {
    // authenticating user
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
      const expirationDate = new Date(new Date().getTime() + +duration * 1000);
      userId = responseData.localId;
      // saving data to keep after reload
      localStorage.setItem("justHireMeId", userId);
      localStorage.setItem("justHireMeDate", expirationDate.toISOString());
      localStorage.setItem("justHireMeLogin", token);
      dispatch(uiActions.loggingInOut());
      if (isDev) {
        localStorage.setItem("justHireMeDev", "dev");
        dispatch(uiActions.setIsDev());
      }
    } catch (error) {
      alert(error);
    } finally {
      // sending new user data to database
      if (act === "Sign in") {
        return;
      }
      let databaseUrl: string;
      //for devs
      if (isDev) {
        databaseUrl = `${process.env.REACT_APP_API_DATABASE_USERS_URL}/devs.json`;
        try {
          const response = await fetch(databaseUrl, {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              userId: userId,
            }),
            headers: { "Content-Type": "application/json" }
          });
          console.log(response);
        } catch (error) {
          alert(error);
        }
      } else if (!isDev) { //and for employers
        databaseUrl = `${process.env.REACT_APP_API_DATABASE_USERS_URL}/employers.json`;
        try {
          await fetch(databaseUrl, {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              userId: userId,
            }),
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          alert(error);
        }
      }
    }
  };

  return loginRegister;
};

export default useSignUpIn;
