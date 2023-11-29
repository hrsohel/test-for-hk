import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Signup from "@/components/Signup";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <section className="bg-slate-100 sm:p-3 p-2 min-h-[90vh] flex items-center justify-center">
        <Signup />
      </section>
      <Footer />
    </>
  );
};

export default page;
