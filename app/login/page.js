import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <section className="sm:p-3 bg-slate-100 p-2 min-h-[90vh] flex items-center justify-center gap-4">
        {/* <div className="sm:w-1/2 h-[80vh]">
          <Image
            className="w-full h-full object-cover object-top"
            src="/images/login-sign.webp"
            width="1000"
            height="1000"
            alt="login"
          />
        </div> */}
        <LoginForm />
      </section>
      <Footer />
    </>
  );
};

export default page;
