"use client";
import { useState, useEffect } from "react";
import Loading from "./Loading.jsx";
import { lazy } from "react";
import Link from "next/link.js";
const CatCards = lazy(() => import("./components/CatCards.jsx"));

export default function Home() {
  const [catsData, setCatsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasBreeds, setHasBreeds] = useState(0);
  const [order, setOrder] = useState("RAND");

  const fetchCatData = async (value) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=100&has_breeds=${hasBreeds}&order=${order}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_XEkUa5070NBdTbXLNsxQ2YtHLDi51hO2SRfUkfKOgMvhWuaYZ1amzEivZ6f5HYFf",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cats data");
      }
      const data = await response.json();
      setCatsData(data);
    } catch (error) {
      console.error("Error fetching cats data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatData();
  }, [hasBreeds, order]);

  const pagination = Math.ceil(catsData.length / 10);

  // const handleClick = (value) => {
  //   fetchCatData();
  // };

  const handleChange = () => {
    hasBreeds ? setHasBreeds(0) : setHasBreeds(1);
  };

  console.log(catsData);

  return (
    <>
      <h1 className="text-2xl pb-2 text-center font-bold tracking-tight text-gray-900">
        Cats Data
      </h1>

      {/* Filter section */}
      {/* for breeds selection checkbox */}
        <div className="p-4 rounded-lg shadow-lg ">
        <h1 className="pb-2 text-lg font-semibold block">Filters</h1>
      <div className="flex flex-col sm:flex-row justify-start items-start sm-items-center">
          <div className="ml-0 sm-ml-4 my-2 sm:my-0">
            <input
              type="checkbox"
              name="hasBreed"
              id="hasBreed"
              onChange={handleChange}
            />
            <label htmlFor="hasBreed" className="mx-2">
              Show only breed details cat
            </label>
          </div>
          {/* for breeds selection checkbox */}

          {/*for asc and desc selection according to the image upload date*/}

          <label
            for="countries"
            class="block mb-2 text-sm font-medium mr-0 sm:ml-8 text-gray-900 dark:text-white"
          >
            Select Order(according to image upload)
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setOrder(e.target.value)}
            >
              <option selected value="RAND">
                Choose a Order
              </option>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </label>
        </div>
        {/*for asc and desc selection according to the image upload date*/}
      </div>
      {/* Filter section */}

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {catsData?.map((val, index) => (
              <CatCards key={index} val={val} />
            ))}
          </div>
          {/* <nav className="my-10 text-center">
            <ul className="inline-flex -space-x-px text-base h-10 ">
              <li>
                <button
                  href="#"
                  className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>

              {Array.from(Array(pagination).keys()).map((index) => {
                return (
                  <li>
                    <button
                      href="#"
                      aria-current="page"
                      className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >
                      {index + 1}
                    </button>
                  </li>
                );
              })}

              <li>
                <button
                  href="#"
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav> */}
        </>
      )}
    </>
  );
}
