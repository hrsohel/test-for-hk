"use client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <header className="flex items-center justify-between sm:mx-4 mx-2 my-2 rounded-lg bg-purple-600 sm:px-4 px-2 py-2 sm:flex-row flex-col">
        <div className="logo">
          <h1 className="sm:text-3xl text-2xl font-bold text-white">HRTest</h1>
        </div>
        <nav>
          <ul
            className="text-white sm:text-xl text-lg flex items-center justify-center gap-4
          "
          >
            <li>
              <Link className="sm:text-lg text-[1rem]" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="sm:text-lg text-[1rem]" href="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="sm:text-lg text-[1rem]" href="/signup">
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
