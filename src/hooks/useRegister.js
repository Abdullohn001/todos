//firebase imports
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
//react imports
import { useState } from "react";

//context
import { useGlobalContext } from "./useGlobalContext";
//toast
import toast from "react-hot-toast";

export const useRegister = () => {
  const [isPanding, setIsPanding] = useState(false);
  const { dispatch } = useGlobalContext();
  //register with goole
  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setIsPanding(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch({ type: "LOG_IN", payload: user });
      toast.success(`Welcome, ${user.displayName}`);
      setIsPanding(false);
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      setIsPanding(false);
    }
  };

  //register with email and password

  const registerEmailAndPassword = async (
    email,
    password,
    displayName,
    photoURL,
    confirmpassword
  ) => {
    try {
      if (confirmpassword !== password) {
        throw new Error("Passwords did not match");
      }
      const register = createUserWithEmailAndPassword(auth, email, password);

      setIsPanding(true);
      const user = (await register).user;
      await updateProfile(auth.currentUser, {
        photoURL,
        displayName,
      });

      dispatch({ type: "LOG_IN", payload: user });
      toast.success(`Welcome, ${user.displayName}`);
      setIsPanding(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      setIsPanding(false);
    }
  };

  return { registerWithGoogle, isPanding, registerEmailAndPassword };
};
