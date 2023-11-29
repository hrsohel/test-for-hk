import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <section className="sm:p-3 bg-slate-100 p-2 min-h-[90vh] flex items-center justify-center">
        <LoginForm />
      </section>
      <Footer />
    </>
  );
};

export default page;
