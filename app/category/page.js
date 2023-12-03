import CategoryForm from "@/components/CategoryForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <section className="sm:p-3 category-section bg-slate-100 p-2 min-h-[90vh] flex items-center justify-center">
        <CategoryForm />
      </section>
      <Footer />
    </>
  );
};

export default page;
