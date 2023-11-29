"use client";
import React from "react";

const HomeForm = () => {
  const [shoeBox, setShowBox] = React.useState(false);
  const [check, setcheck] = React.useState("none");
  const [option, setOption] = React.useState("Select");
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
          htmlFor="select"
          className="block text-purple-600 sm:text-lg text-[0.9rem]"
        >
          Sectors
        </label>
        <div className="my-2 relative">
          <div
            onClick={() => {
              setShowBox(!shoeBox);
            }}
            className="p-2 h-[2.5rem] w-full sm:text-lg text-[0.9rem] focus:border-purple-600 border-2 rounded-md outline-none"
          >
            {option}
          </div>
          {shoeBox ? (
            <div className="absolute left-0 top-full bg-white z-10 w-full p-2 border-[1px] border-black rounded-md">
              <p
                onClick={() => {
                  setOption("facebook");
                  setShowBox(false);
                }}
                className="my-1 pl-2 rounded-md cursor-pointer py-2 hover:bg-purple-600 hover:text-white sm:text-lg text-[0.9rem]"
              >
                facebook
              </p>
              <p
                onClick={() => {
                  setOption("twitter");
                  setShowBox(false);
                }}
                className="my-1 pl-2 rounded-md cursor-pointer py-2 hover:bg-purple-600 hover:text-white sm:text-lg text-[0.9rem]"
              >
                facebook
              </p>
              <p
                onClick={() => {
                  setOption("linkedIn");
                  setShowBox(false);
                }}
                className="my-1 pl-2 rounded-md cursor-pointer py-2 hover:bg-purple-600 hover:text-white sm:text-lg text-[0.9rem]"
              >
                facebook
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex items-center justify-start gap-1">
          <div
            onClick={() => {
              if (check === "none") setcheck("block");
              else setcheck("none");
            }}
            style={{ "--show": check }}
            className="w-[1.1rem] h-[1.1rem] check rounded-sm border-2 border-black"
          ></div>
          <label
            onClick={() => {
              if (check === "none") setcheck("block");
              else setcheck("none");
            }}
            htmlFor="check"
            className="text-purple-600 sm:text-lg text-[0.9rem] ml-2 "
          >
            Agree to terms
          </label>
        </div>
        <input
          type="submit"
          value="Save"
          className="px-4 py-1 my-2 bg-purple-600 text-xl text-white rounded-md cursor-pointer"
        />
      </form>
    </>
  );
};

export default HomeForm;
