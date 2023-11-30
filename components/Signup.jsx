"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const history = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    const body = new FormData(e.target);
    const { name, username, password } = Object.fromEntries(body.entries());
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    const response = await axios.post("/api/signup", formData);
    if (response?.data?.message) setError(response?.data?.message);
    else history.push("/login");
    setLoading(false);
  };
  return (
    <>
      <form
        onSubmit={submit}
        method="post"
        className="w-full bg-white sm:w-[70%] md:w-[60%] lg:w-[40%] sm:p-4 p-2 rounded-md border-[1px] border-purple-600 "
      >
        <label
          htmlFor="name"
          className="block text-purple-600 sm:text-lg text-[0.9rem]"
        >
          Name
        </label>
        <input
          type="text"
          className="p-2 w-full sm:text-lg text-[0.9rem] focus:border-purple-600 border-[1px] rounded-md outline-none my-2"
          name="name"
          id="name"
          placeholder="Enter your name"
          required={true}
        />
        <label
          htmlFor="username"
          className="block text-purple-600 sm:text-lg text-[0.9rem]"
        >
          Username
        </label>
        <input
          type="text"
          className="p-2 w-full sm:text-lg text-[0.9rem] focus:border-purple-600 border-[1px] rounded-md outline-none my-2"
          name="username"
          id="username"
          placeholder="Enter your username"
          pattern="^[^\s]+$"
          title="No spaces allowed"
          required={true}
        />
        <label
          htmlFor="password"
          className="block text-purple-600 sm:text-lg text-[0.9rem]"
        >
          Password
        </label>
        <input
          type="password"
          className="p-2 w-full sm:text-lg text-[0.9rem] focus:border-purple-600 border-[1px] rounded-md outline-none my-2"
          name="password"
          id="password"
          placeholder="Enter your password"
          required={true}
        />
        <input
          disabled={loading}
          type="submit"
          value={`${loading ? "Wait..." : "Signup"}`}
          className="px-4 py-1 my-2 bg-purple-600 sm:text-lg text-[0.9rem] text-white rounded-sm cursor-pointer"
        />
        {error ? (
          <div className="py-2 rounded-sm bg-red-300 text-red-600 sm:text-lg text-[0.9rem] text-center">
            {error}
          </div>
        ) : (
          <></>
        )}
        <p className="text-center">
          Do you have an account?{" "}
          <Link href="/login" className="text-purple-600 my-2">
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default Signup;
