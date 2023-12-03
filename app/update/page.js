import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import UpdateForm from "@/components/UpdateForm";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <section className="sm:p-3 update-section bg-slate-100 p-2 min-h-[90vh] flex items-center justify-center">
        <UpdateForm />
      </section>
      <Footer />
    </>
  );
};

export default page;
