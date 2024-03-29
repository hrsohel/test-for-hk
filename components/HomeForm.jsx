"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const HomeForm = () => {
  const history = useRouter();
  const [shoeBox, setShowBox] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [check, setcheck] = React.useState("none");
  const [option, setOption] = React.useState("Please Select this field");
  const [categories, setCategories] = React.useState([]);
  const [sectors, setSectors] = React.useState({});
  const [session, setSession] = React.useState("");
  const [error, setError] = React.useState("");
  const selectRef = React.useRef();
  const formRef = React.useRef();
  React.useEffect(() => {
    (async () => {
      const [session, category] = await Promise.all([
        axios.get("/api/session"),
        axios.get("/api/category"),
      ]);
      if (!session.data.message) history.push("/login");
      setSession(session.data.message.user);
      setCategories(category.data.message);
    })();
    selectRef.current.style.display = "none";
  }, []);
  const setCategory = (category, sectors) => {
    setSectors(sectors);
    if (category?.subCategory?.length) {
      const nullValue = category.subCategory.every((value) => !value.name);
      if (nullValue) {
        setOption(category.name);
      }
    } else if (category?.subsubCategory?.length) {
      const nullValue2 = category.subsubCategory.every((value) => !value.name);
      if (nullValue2) {
        setOption(category.name);
      }
    } else if (category?.subsubsubCategory?.length) {
      const nullValue3 = category.subsubsubCategory.every(
        (value) => !value.name
      );
      if (nullValue3) {
        setOption(category.name);
      }
    } else {
      setOption(category.name);
    }
  };
  const handleShowBox = () => {
    if (selectRef.current.style.display === "none")
      selectRef.current.style.display = "block";
    else selectRef.current.style.display = "none";
  };
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (option === "Please Select this field") {
      alert("Please Select Sectors field");
      setLoading(false);
      return;
    }
    if (check === "none") {
      alert("Please check the 'Agree terms' button");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    const body = new FormData(e.target);
    const { name } = Object.fromEntries(body.entries());
    formData.append("name", name);
    formData.append("username", session.username);
    formData.append("category", sectors.category);
    formData.append("subCat", sectors.subCat);
    formData.append("subsubCat", sectors.subsubCat);
    formData.append("subsubsubCat", sectors.subsubsubCat);
    formData.append("agree", true);
    const { data } = await axios.post("/api/add-sectors", formData);
    if (!data.message)
      setError(
        "You've already added data. Please click on update to update your data."
      );
    setLoading(false);
    formRef.current.reset();
  };
  return (
    <>
      <form
        ref={formRef}
        onSubmit={submit}
        method="post"
        className="w-full bg-white sm:w-[70%] md:w-[60%] lg:w-[40%] sm:p-4 p-2 rounded-md border-[1px] border-purple-600 "
      >
        <label
          htmlFor="name"
          className="block text-white sm:text-lg text-[0.9rem]"
        >
          Name
        </label>
        <input
          type="text"
          className="p-2 w-full sm:text-lg text-[0.9rem] focus:border-purple-600 border-[1px] rounded-md outline-none my-2"
          name="name"
          id="name"
          placeholder="Enter your name"
          required={true}
        />
        <label
          htmlFor="select"
          className="block text-white sm:text-lg text-[0.9rem]"
        >
          Sectors
        </label>
        <div
          onClick={() => handleShowBox()}
          className={`relative p-2 bg-white h-[2.5rem] rounded-md sm:text-lg text-[0.9rem] border-[1px] ${
            shoeBox ? "border-purple-600" : ""
          }`}
        >
          <p>{option}</p>
          {/* {!shoeBox ? ( */}
          <div
            ref={selectRef}
            className="border-purple-600 h-[18rem] overflow-auto rounded-md border-[1px] absolute left-0 top-[110%] bg-white w-full z-10 p-2"
          >
            <div className="flex items-center justify-between">
              <p className="p-1 hover:bg-purple-600 hover:text-white rounded-md">
                Select sectors
              </p>
            </div>
            {categories.map((category) => (
              <div key={category._id}>
                <p
                  onClick={() => {
                    setCategory(category, { category: category.name });
                  }}
                  className="pl-2 border-t-[1px] border-b-[1px] border-purple-600 rounded-sm font-bold text-[0.9rem] hover:bg-purple-600 hover:text-white cursor-pointer"
                >
                  {category.name}
                </p>
                {category.subCategory.map((subCat) => (
                  <>
                    {subCat.name ? (
                      <p
                        onClick={() =>
                          setCategory(subCat, {
                            category: category.name,
                            subCat: subCat.name,
                          })
                        }
                        className="ml-4 pl-2 rounded-sm font-semibold  text-[0.9rem] hover:bg-purple-600 hover:text-white cursor-pointer"
                        key={subCat._id}
                      >
                        {subCat.name}
                      </p>
                    ) : (
                      <></>
                    )}
                    {subCat.subsubCategory.map((subsubCat) => (
                      <>
                        {subsubCat.name ? (
                          <p
                            onClick={() =>
                              setCategory(subsubCat, {
                                category: category.name,
                                subCat: subCat.name,
                                subsubCat: subsubCat.name,
                              })
                            }
                            className="ml-8 pl-2 rounded-sm font-[600] text-[0.9rem] hover:bg-purple-600 hover:text-white cursor-pointer"
                            key={subsubCat._id}
                          >
                            {subsubCat.name}
                          </p>
                        ) : (
                          <></>
                        )}
                        {subsubCat.subsubsubCategory?.map((subsubsubCat) =>
                          subsubsubCat.name ? (
                            <p
                              onClick={() =>
                                setCategory(subsubsubCat, {
                                  category: category.name,
                                  subCat: subCat.name,
                                  subsubCat: subsubCat.name,
                                  subsubsubCat: subsubsubCat.name,
                                })
                              }
                              className="ml-12 pl-2 rounded-sm  text-[0.9rem] hover:bg-purple-600 hover:text-white cursor-pointer"
                              key={subsubsubCat._id}
                            >
                              {subsubsubCat.name}
                            </p>
                          ) : (
                            <></>
                          )
                        )}
                      </>
                    ))}
                  </>
                ))}
              </div>
            ))}
          </div>
          {/* ) : (
            <></>
          )} */}
        </div>

        <div className="flex items-center justify-start gap-1">
          <div
            onClick={() => {
              if (check === "none") setcheck("block");
              else setcheck("none");
            }}
            style={{ "--show": check }}
            className="w-[1.1rem] h-[1.1rem] check rounded-sm border-[1px] border-black"
          ></div>
          <label
            onClick={() => {
              if (check === "none") setcheck("block");
              else setcheck("none");
            }}
            htmlFor="check"
            className="text-white sm:text-lg text-[0.9rem] ml-2 "
          >
            Agree to terms
          </label>
        </div>
        <div className="flex items-center justify-between">
          <input
            disabled={loading}
            type="submit"
            value="Save"
            className="px-4 py-1 my-2 bg-purple-600 sm:text-lg text-[0.9rem] text-white rounded-sm cursor-pointer"
          />
          <Link
            onClick={() => setLoading(true)}
            href="/update"
            className="px-4 py-1 my-2 bg-purple-600 sm:text-lg text-[0.9rem] text-white rounded-sm cursor-pointer"
          >
            Update
          </Link>
        </div>
        {error ? (
          <div className="px-4 py-2 rounded-sm font-semibold bg-purple-200 text-purple-500 text-center sm:text-lg text-[0.9rem]">
            {error}
          </div>
        ) : (
          <></>
        )}
        {loading ? <div className="h-[0.3rem] loader"></div> : <></>}
      </form>
    </>
  );
};

export default HomeForm;
