"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

const Navbar = () => {
  const path = usePathname();
  const [loader, setLoader] = React.useState(false);
  const [session, setSession] = React.useState("");
  React.useEffect(() => {
    setLoader(false);
    axios.get("/api/session").then((res) => {
      if (res.data?.message) setSession(res.data.message);
    });
  }, []);
  return (
    <>
      <header className="relative flex items-center justify-between  rounded-sm bg-purple-600 sm:px-4 px-2 py-2 sm:flex-row flex-col">
        <div className="logo">
          <h1 className="sm:text-3xl text-2xl font-bold text-white">HRTest</h1>
        </div>
        <nav>
          <ul
            className="text-white sm:text-xl text-lg flex items-center justify-center gap-4
          "
          >
            {session ? (
              <>
                <li
                  onClick={() => setLoader(true)}
                  className={`${path === "/" ? "navbar-list" : ""} `}
                >
                  <Link className="sm:text-lg text-[1rem]" href="/">
                    Home
                  </Link>
                </li>
                <li
                  onClick={() => setLoader(true)}
                  className={`${path === "/category" ? "navbar-list" : ""} `}
                >
                  <Link className="sm:text-lg text-[1rem]" href="/category">
                    Add category
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
            {session ? (
              <p>{session.user.name}</p>
            ) : (
              <>
                <li
                  onClick={() => setLoader(true)}
                  className={`${path === "/login" ? "navbar-list" : ""} `}
                >
                  <Link className="sm:text-lg text-[1rem]" href="/login">
                    Login
                  </Link>
                </li>
                <li
                  onClick={() => setLoader(true)}
                  className={`${path === "/signup" ? "navbar-list" : ""} `}
                >
                  <Link className="sm:text-lg text-[1rem]" href="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      {loader ? <div className="h-[0.3rem] loader mt-[0.05rem]"></div> : <></>}
    </>
  );
};

export default Navbar;
