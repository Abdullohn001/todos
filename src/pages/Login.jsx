//import from react
import { useState } from "react";
//rrd import
import { Form, Link, useActionData } from "react-router-dom";
//hook
import { useEffect } from "react";
//components
import { FormInput } from "../components";
//Action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};
//firebase
import { sendPasswordResetEmail } from "firebase/auth";
//custom hooks
import { useRegister } from "../hooks/useRegister";
import { useLogin } from "../hooks/useLogin";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

function Login() {
  const farxod = useActionData();
  const { isPanding, registerWithGoogle } = useRegister();
  const { isPanding: isPandingLogin, signIn } = useLogin();
  const [showPassword, setShowPassword] = useState(true);
  const [errorStatus, setErrorStatus] = useState({
    email: "",
    password: "",
  });
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  useEffect(() => {
    if (farxod) {
      if (farxod.email && farxod.password && showPassword) {
        signIn(farxod.email, farxod.password);
      }
      if (!showPassword && farxod?.email) {
        sendPasswordResetEmail(auth, farxod.email)
          .then(() => {
            toast.success(`The Link was Send to this ${farxod.email}`);
            setShowPassword(true);
          })
          .catch((error) => {
            toast.error("The Link was can not sent :( ");
          });
      }
      if (!farxod.email) {
        setErrorStatus((prev) => {
          return { ...prev, email: "input-error border-[2px]" };
        });
        toast.error("Please, complete the email...");
        setErrorEmail(true);
      } else {
        setErrorStatus({
          email: "",
        });
        setErrorEmail(false);
      }
      if (!farxod.password) {
        setErrorStatus((prev) => {
          return { ...prev, password: "input-error border-[2px]" };
        });
        toast.error("Please, complete the password...");
        setErrorPassword(true);
      } else {
        setErrorStatus({
          password: "",
        });
        setErrorPassword(false);
      }
    }
  }, [farxod]);

  return (
    <div className="auth-container">
      <div className="auth-bg-login auth-right">
        <Form
          // onSubmit={() => handleSubmit(input)}
          method="post"
          className="flex flex-col gap-2 w-[340px] shadow-2xl p-7 rounded-xl  bg-[rgba(255,255,255,0.6)]"
        >
          <h1 className="text-4xl font-semibold text-center">
            {showPassword ? "Login" : "Reset Password"}{" "}
          </h1>
          <FormInput
            label="Email :"
            type="email"
            name="email"
            error={errorStatus.email}
            placeholder="Email"
          />
          {errorEmail && (
            <p className="p-0 text-red-600 text-[12px]">Enter the Email</p>
          )}
          {!errorPassword && <p className="p-0 text-red-600 text-[12px]"></p>}
          {showPassword && (
            <FormInput
              label="Password :"
              type="password"
              error={errorStatus.password}
              name="password"
              placeholder="Password"
            />
          )}
          {errorPassword && (
            <p className="p-0 text-red-600 text-[12px]">Enter the Password</p>
          )}
          <div className="form-control flex items-center">
            <label className="cursor-pointer flex gap-1">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-secondary w-4 h-4"
              />
              <span className="text-[10px] mr-16 ">Remember Password</span>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10px] text-primary"
              >
                {showPassword ? (
                  <span>Forgot password?</span>
                ) : (
                  <span>Show Password</span>
                )}
              </button>
            </label>
          </div>
          <div>
            {isPandingLogin && (
              <button
                disabled
                type="button"
                className="btn btn-primary btn-block font-bold"
              >
                Loading...
              </button>
            )}
            {!isPandingLogin && (
              <button className="btn btn-primary btn-block font-bold">
                {showPassword ? "Login" : "Send"}
              </button>
            )}
          </div>
          <div>
            {isPanding && (
              <button
                disabled
                type="button"
                className="btn bg-green-300 border-red-400 btn-block font-bold"
              >
                Loading...
              </button>
            )}
            {!isPanding && (
              <button
                onClick={registerWithGoogle}
                type="button"
                className="btn bg-green-300 border-red-400 btn-block font-bold"
              >
                Google
              </button>
            )}
          </div>

          <div className="text-center">
            <p className="font-medium text-slate-500">
              If you don't have account,{" "}
              <Link className="link link-primary" to="/register">
                Register
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
