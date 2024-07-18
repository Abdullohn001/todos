//react
import { useState } from "react";
//fitebase
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

//GlobalContext
import { useGlobalContext } from "./useGlobalContext";

//Toast
import toast from "react-hot-toast";

export const useLogin = () => {
  const [isPanding, setIsPanding] = useState(false);
  const { dispatch } = useGlobalContext();

  const signIn = async (email, password) => {
    try {
      setIsPanding(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      dispatch({ type: "LOG_IN", payload: user });
      toast.success(`Welcome, ${user.displayName} `);
      setIsPanding(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      setIsPanding(false);
    }
  };
  return { isPanding, signIn };
};
