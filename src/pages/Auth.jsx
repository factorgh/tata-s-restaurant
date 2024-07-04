import banner from "../assets/banner.jpg";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import toast from "react-hot-toast";
import { useState } from "react";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = (val) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, val.email, val.password)
      .then((user) => {
        setIsLoading(false);
        navigate("/dashboard");
        toast.success("Logged In successful");
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.code === "auth/invalid-email") toast.error("Invalid Email");
        if (err.code === "auth/invalid-credential")
          toast.error("Invalid Credential");
      });
    reset();
  };
  return (
    <div className="w-screen h-screen flex ">
      {/* Form section  */}
      <div className="  flex-1 flex flex-col gap-40 ">
        {/* Logo section */}
        <div className="flex justify-start items-center ">
          <img className="w-40 h-30" src={logo} alt="tata's logo" />
        </div>

        {/* Form section */}
        <div className="flex flex-col gap-5 items-center">
          <h3 className="text-slate-500 font-semibold text-xl">Sign In</h3>

          <div className="flex flex-col items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-3"
            >
              <input
                {...register("email", { required: true })}
                type="text"
                className="w-[300px] h-[40px] p-5 rounded-md mx-auto border text-sm border-slate-200  focus:border-orange-400"
                placeholder="Please enter your email  "
              />
              {errors.email && (
                <span className="text-red-400 text-sm p-2 font-semibold">
                  email is required
                </span>
              )}
              <input
                {...register("password", { required: true })}
                type="password"
                className="w-[300px] h-[40px] p-5 rounded-md text-sm mx-auto border border-slate-200  focus:border-orange-400"
                placeholder="Please enter your password "
              />
              {errors.password && (
                <span className="text-red-400 text-sm p-2 font-semibold">
                  password is required
                </span>
              )}
              <button className="w-[200px] h-[50px] mt-5  text-white bg-orange-300 rounded-3xl ">
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Banner section */}
      <div className="flex-1 h-full">
        <img className="h-full cover" src={banner} alt="Burger banner" />
      </div>
    </div>
  );
};

export default Auth;
