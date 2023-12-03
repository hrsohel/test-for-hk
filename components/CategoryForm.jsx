"use client";
import React from "react";
import axios from "axios";

const CategoryForm = () => {
  const [loading, setLoading] = React.useState(false);
  const ref = React.useRef();
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    const body = new FormData(e.target);
    const { category, subcategory, subsubcategory, subsubsubcategory } =
      Object.fromEntries(body.entries());
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("subsubcategory", subsubcategory);
    formData.append("subsubsubcategory", subsubsubcategory);
    const response = await axios.post("/api/category", formData);
    setLoading(false);
    ref.current.reset();
  };
  return (
    <>
      <form
        ref={ref}
        onSubmit={submit}
        method="post"
        className="w-full bg-white sm:w-[70%] md:w-[60%] lg:w-[40%] sm:p-4 p-2 rounded-md border-[1px] border-purple-600 "
      >
        <label
          htmlFor="category"
          className="block text-white sm:text-lg text-[0.9rem]"
        >
          Category
        </label>
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Add category"
          required={true}
          className="p-2 w-full sm:text-lg text-[0.9rem] focus:border-purple-600 border-[1px] rounded-md outline-none my-2"
        />
        <label
          htmlFor="subcategory"
          className="block text-white sm:text-lg text-[0.9rem]"
        >
          Subcategory
        </label>
        <input
          type="text"
          name="subcategory"
          id="subcategory"
          placeholder="Add subcategory"
          className="p-2 w-full sm:text-lg text-[0.9rem] focus:border-purple-600 border-[1px] rounded-md outline-none my-2"
        />
        <label
          htmlFor="subsubcategory"
          className="block text-white sm:text-lg text-[0.9rem]"
        >
          Subsubcategory
        </label>
        <input
          type="text"
          name="subsubcategory"
          id="subsubcategory"
          placeholder="Add subsubcategory"
          className="p-2 w-full sm:text-lg text-[0.9rem] focus:border-purple-600 border-[1px] rounded-md outline-none my-2"
        />
        <label
          htmlFor="subsubsubcategory"
          className="block text-white sm:text-lg text-[0.9rem]"
        >
          Subsubsubcategory
        </label>
        <input
          type="text"
          name="subsubsubcategory"
          id="subsubsubcategory"
          placeholder="Add subsubsubcategory"
          className="p-2 w-full sm:text-lg text-[0.9rem] focus:border-purple-600 border-[1px] rounded-md outline-none my-2"
        />
        <input
          type="submit"
          value={`${loading ? "Wait..." : "Save"}`}
          className="px-4 py-1 my-2 bg-purple-600 sm:text-lg text-[0.9rem] text-white rounded-sm cursor-pointer"
        />
      </form>
    </>
  );
};

export default CategoryForm;
