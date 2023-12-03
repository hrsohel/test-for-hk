"use client";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

const UpdateForm = () => {
  const history = useRouter();
  const [categories, setCategories] = React.useState([]);
  const [shoeBox, setShowBox] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [update, setupdate] = React.useState(false);
  const [sectors, setSectors] = React.useState({});
  const [user, setUser] = React.useState({});
  const [option, setOption] = React.useState("Update sectors");
  const selectRef = React.useRef();
  const formRef = React.useRef();
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
  React.useEffect(() => {
    (async () => {
      const [category, sessionData] = await Promise.all([
        axios.get("/api/category"),
        axios.get("/api/session"),
      ]);
      if (!sessionData?.data?.message) history.push("/login");
      setUser(sessionData?.data?.message.user);
      setCategories(category?.data?.message);
      setSectors({
        category: sessionData?.data?.message.category,
        subCat: sessionData?.data?.message.subCat,
        subsubCat: sessionData?.data?.message.subsubCat,
        subsubsubCat: sessionData?.data?.message.subsubsubCat,
      });
      selectRef.current.style.display = "none";
    })();
  }, [update]);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    const body = new FormData(e.target);
    const { name, username } = Object.fromEntries(body.entries());
    formData.append("name", name);
    formData.append("username", "hrsohel");
    formData.append("category", sectors.category);
    formData.append("subCat", sectors.subCat);
    formData.append("subsubCat", sectors.subsubCat);
    formData.append("subsubsubCat", sectors.subsubsubCat);
    await axios.patch("/api/add-sectors", formData);
    setLoading(false);
    setupdate(!update);
  };
  return (
    <>
      <form
        onSubmit={submit}
        ref={formRef}
        className="w-full bg-white sm:w-[70%] md:w-[60%] lg:w-[40%] sm:p-4 p-2 rounded-md border-[1px] border-purple-600"
        method="post"
      >
        <label
          htmlFor="name"
          className="block text-white sm:text-lg text-[0.9rem]"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required={true}
          defaultValue={user.name}
          className="p-2 w-full sm:text-lg text-[0.9rem] focus:border-purple-600 border-[1px] rounded-md outline-none my-2"
        />

        <input
          type="hidden"
          name="username"
          id="username"
          defaultValue={user.username}
          required={true}
          className="p-2 w-full sm:text-lg text-[0.9rem] focus:border-purple-600 border-[1px] rounded-md outline-none my-2"
        />
        <label
          htmlFor="name"
          className="block text-white sm:text-lg text-[0.9rem]"
        >
          Sectors
        </label>
        <div
          onClick={() => handleShowBox()}
          className={`relative p-2 h-[2.5rem] bg-white rounded-md sm:text-lg text-[0.9rem] border-[1px] ${
            shoeBox ? "border-purple-600" : ""
          }`}
        >
          <p>{option}</p>
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
                  className={`${
                    user.category === category.name
                      ? "bg-purple-600 text-white"
                      : ""
                  } pl-2 border-t-[1px] border-b-[1px] border-purple-600 rounded-sm font-bold text-[0.9rem] hover:bg-purple-600 hover:text-white cursor-pointer`}
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
                        className={`${
                          user.subCat === subCat.name
                            ? "bg-purple-600 text-white"
                            : ""
                        } pl-2 ml-4  rounded-sm font-bold text-[0.9rem] hover:bg-purple-600 hover:text-white cursor-pointer`}
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
                            className={`${
                              user.subsubCat === subsubCat.name
                                ? "bg-purple-600 text-white"
                                : ""
                            } ml-8 pl-2 rounded-sm font-bold text-[0.9rem] hover:bg-purple-600 hover:text-white cursor-pointer`}
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
                              className={`${
                                user.subsubsubCat === subsubsubCat.name
                                  ? "bg-purple-600 text-white"
                                  : ""
                              } ml-12 pl-2 rounded-sm font-bold text-[0.9rem] hover:bg-purple-600 hover:text-white cursor-pointer`}
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
        </div>
        <input
          disabled={loading}
          type="submit"
          value="Update"
          className="px-4 py-1 my-2 bg-purple-600 sm:text-lg text-[0.9rem] text-white rounded-sm cursor-pointer"
        />
        {loading ? <div className="h-[0.3rem] loader"></div> : <></>}
      </form>
    </>
  );
};

export default UpdateForm;
