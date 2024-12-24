import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const { setUser, userSignIn } = useContext(AuthContext);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login Successful!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        // toast.error(`${err}.Please try again` );
        setUser(null);
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    userSignIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login Successful!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        // console.error('Login Error:', err);
        setError("Please input your email and password correctly");
      });
  };

  return (
    <div className="md:w-2/5 mx-auto w-4/5 ">
      <div>
        <h1 className="text-center font-bold text-2xl text-[#262522]">
          Login to your account
        </h1>
      </div>
      <form
        onSubmit={handleLoginSubmit}
        className="border-[#ee6352] card-body border-2 mt-10 rounded-xl shadow-xl"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            name="password"
            required
          />
          <label className="label">
            <p className="label-text-alt link link-hover">Forgot password?</p>
          </label>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <div className="form-control mt-6">
          <button className="btn bg-[#ee6352] text-white">Login</button>
        </div>
        <div>
          <h1>
            Don't have an account?{" "}
            <Link to="/register" className="text-[#ee6352]">
              Register
            </Link>
          </h1>
        </div>
        <div className="flex w-full flex-col">
          <div className="divider">Or</div>
        </div>
        <div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full btn  border-[#ee6352] btn-outline "
          >
            Login With Google <FaGoogle />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
