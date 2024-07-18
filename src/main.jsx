import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalContextProvider from "./context/GlobalContext.jsx";
//Toast
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <App />
    <Toaster position="bottom-center" />
  </GlobalContextProvider>
);
