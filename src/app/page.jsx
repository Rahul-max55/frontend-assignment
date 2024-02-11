"use client";
import { useState, useEffect } from "react";
import Loading from "./Loading.jsx";
import { lazy } from "react";
import Filters from "./components/Filters.jsx";
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


  return (
    <>
      <h1 className="text-2xl pb-2 text-center font-bold tracking-tight text-gray-900">
        Cats Data
      </h1>
      <Filters setHasBreeds={setHasBreeds} setOrder={setOrder} hasBreeds={hasBreeds} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {catsData?.map((val, index) => (
              <CatCards key={index} val={val} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
