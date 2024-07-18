//context
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext() must be use in the GlobalContextProvider()")
  }

  return context;
};
