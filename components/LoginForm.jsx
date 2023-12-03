"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginForm = () => {
  const history = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    const body = new FormData(e.target);
    const { name, password } = Object.fromEntries(body.entries());
    formData.append("name", name);
    formData.append("password", password);
    const response = await axios.post("/api/login", formData);
    if (response?.data?.message) setError(response?.data?.message);
    else history.push("/");
    setLoading(false);
  };
  React.useEffect(() => {
    axios.get("/api/session").then((res) => {
      if (res.data?.message) history.push("/");
    });
  }, []);
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
          Username
        </label>
        <input
          type="text"
          className="p-2 w-full sm:text-lg text-[0.9rem] focus:border-purple-600 border-[1px] rounded-md outline-none my-2"
          name="name"
          id="name"
          placeholder="Enter your username"
          pattern="^[^\s]+$"
          title="No spaces allowed"
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
        />
        <input
          disabled={loading}
          type="submit"
          value={`${loading ? "Wait..." : "Login"}`}
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
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-purple-600 my-2">
            Signup
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
