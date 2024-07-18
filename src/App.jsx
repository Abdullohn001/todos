//rrd import
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
//Layout
import MainLayout from "./layout/MainLayout";
//Pages
import {
  Home,
  About,
  Contact,
  Login,
  Register,
  ErrorPage,
  SingleProduct,
  Cart,
  TodoList,
} from "./pages";
//actions
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
import { action as TodosAction } from "./pages/TodoList";
//Loaders
import { loader as HomeLoader } from "./pages/Home";
import { loader as SingleProductLoader } from "./pages/SingleProduct";
//components
import ProtectedRoutes from "./components/ProtectedRoutes";

//hooks
import { useGlobalContext } from "./hooks/useGlobalContext";
import { useEffect } from "react";
//firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

function App() {
  const { user, dispatch, isAuthReady } = useGlobalContext();

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <TodoList />,
          action: TodosAction,
        },
      ],
    },
    {
      path: "login",
      element: user ? <Navigate to="/" /> : <Login />,
      errorElement: <ErrorPage />,
      action: LoginAction,
    },
    {
      path: "register",
      element: user ? <Navigate to="/" /> : <Register />,
      errorElement: <ErrorPage />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: "LOG_IN", payload: user });
      dispatch({ type: "IS_AUTH_READY" });
    });
  }, []);

  return <>{isAuthReady && <RouterProvider router={routes} />}</>;
}

export default App;
