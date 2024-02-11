"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Loading from "@/app/Loading";

const catDetails = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const { id } = params;

 
  useEffect(() => {
    const singleCatDetails = async () => {
      try {
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'live_XEkUa5070NBdTbXLNsxQ2YtHLDi51hO2SRfUkfKOgMvhWuaYZ1amzEivZ6f5HYFf',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch cat data');
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching cat data:', error);
      } finally {
        setLoading(false);
      }
    };

    singleCatDetails();
  }, []);

  console.log(details);

  return (
    <>
      <div className="flex justify-between items-center" >
      <Link href="/" className="float-left text-center">
        <FaArrowLeft />
      </Link>
       <h1 className="text-2xl text-center font-bold tracking-tight text-gray-900"> Cats Details </h1>
        <div></div>
      </div>
     {loading ? <Loading /> : <div className="md:flex items-center justify-center py-12 2xl:px-20 md:px-6 px-4">
        <div className="xl:w-2/6 lg:w-2/5 w-80">
          <Image
            width={250}
            height={400}
            // className="w-full"
            alt="img of a girl posing"
            src={details?.url}
          />
        </div>
        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="border-b border-gray-200 pb-6">
            <p className="text-sm leading-none text-gray-600">
              Origin:
              {details?.breeds?.[0]
                ? details?.breeds?.[0]?.origin
                : "Not Found"}
            </p>
            <h1
              className="
                  lg:text-2xl
                  text-xl
                  font-semibold
                  lg:leading-6
                  leading-7
                  text-gray-800
                  mt-2
              "
            >
              {details?.breeds?.[0] ? details?.breeds?.[0]?.name : "Not Found"}
            </h1>
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800">life Span</p>
            <div className="flex items-center justify-center">
              {details?.breeds?.[0]
                ? `${details?.breeds?.[0]?.life_span}Y`
                : "Not Found"}
            </div>
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800">
              Weight(imperial)
            </p>
            <div className="flex items-center justify-center">
              {details?.breeds?.[0]
                ? details?.breeds?.[0]?.weight?.imperial
                : "Not Found"}
            </div>
          </div>

          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800">height: </p>
            <div className="flex items-center justify-center">
              {details?.height}
            </div>
          </div>

          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800"> Width: </p>
            <div className="flex items-center justify-center">
              {details?.width}
            </div>
          </div>

          <div className="py-4 flex items-start justify-between">
            <p className="text-base leading-4 mt-1 text-gray-800">
              Temperament:{" "}
            </p>
            {details?.breeds?.[0]
              ? details?.breeds?.[0]?.temperament
              : "Not Found"}
          </div>

          {details?.breeds?.[0] && (
            <Link
              href={details?.breeds?.[0]?.wikipedia_url}
              className="
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
              text-base
              flex
              items-center
              justify-center
              leading-none
              text-white
              bg-gray-800
              w-full
              hover:bg-gray-700 mt-4 py-4
          "
            >
              View Details
            </Link>
          )}
        </div>
      </div>}
    </>
  );
};

export default catDetails;
