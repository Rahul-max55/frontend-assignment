import Image from "next/image";
import Link from "next/link";


export const getCatsData = async () => {
  const response = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=10",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "live_XEkUa5070NBdTbXLNsxQ2YtHLDi51hO2SRfUkfKOgMvhWuaYZ1amzEivZ6f5HYFf",
      },
    }
  );
  if (!response) {
    throw new Error("cats data fetching error is ocurred");
  }
  const data = await response.json();
  return data;
};

export default async function Home() {
  const catsData = await getCatsData();
  
  return (
   <>
          <h1 className="text-2xl text-center font-bold tracking-tight text-gray-900">
            Cats Data
          </h1>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {catsData &&
              catsData.map((val, index) => {
                return (
                  <Link href={`/catdetails/${val?.id}`}  key={val.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <Image
                        src={val.url}
                        width={3250}
                        height={400}
                        alt="Front of men&#039;s Basic Tee in black."
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href="#">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            ></span>
                            Name: {val?.breeds?.[0] ? val?.breeds?.[0]?.name : "Not Found"}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">Origin: {val?.breeds?.[0] ? val?.breeds?.[0]?.origin : "Not Found"}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">Life: {val?.breeds?.[0] ? `${val?.breeds?.[0]?.life_span}y` : "Not Found"}</p>
                    </div>
                  </Link>
                );
              })}
          </div>
          </>
  );
}
