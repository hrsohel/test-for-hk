"use client";
import React from "react";

const Signup = () => {
  return (
    <>
      <form
        method="post"
        className="w-full bg-white sm:w-[70%] md:w-[60%] lg:w-[40%] sm:p-4 p-2 rounded-md border-2 border-purple-600 "
      >
        <label
          htmlFor="name"
          className="block text-purple-600 sm:text-lg text-[0.9rem]"
        >
          Name
        </label>
        <input
          type="text"
          className="p-2 w-full sm:text-lg text-[0.9rem] focus:border-purple-600 border-2 rounded-md outline-none my-2"
          name="name"
          id="name"
          placeholder="Enter your name"
        />
        <label
          htmlFor="username"
          className="block text-purple-600 sm:text-lg text-[0.9rem]"
        >
          Username
        </label>
        <input
          type="text"
          className="p-2 w-full sm:text-lg text-[0.9rem] focus:border-purple-600 border-2 rounded-md outline-none my-2"
          name="username"
          id="username"
          placeholder="Enter your username"
        />
        <label
          htmlFor="password"
          className="block text-purple-600 sm:text-lg text-[0.9rem]"
        >
          Password
        </label>
        <input
          type="password"
          className="p-2 w-full sm:text-lg text-[0.9rem] focus:border-purple-600 border-2 rounded-md outline-none my-2"
          name="password"
          id="password"
          placeholder="Enter your password"
        />
        <input
          type="submit"
          value="Signup"
          className="px-4 py-1 my-2 bg-purple-600 text-xl text-white rounded-md cursor-pointer"
        />
      </form>
    </>
  );
};

export default Signup;
