import Image from "next/image";
import Link from "next/link";

const CatCards = ({val}) => {
  return (
    <Link
    href={`/catdetails/${val?.id}`}
    className="group relative"
  >
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
          <div>
            <span
              aria-hidden="true"
              className="absolute inset-0"
            ></span>
            Name:
            {val?.breeds?.[0]
              ? val?.breeds?.[0]?.name
              : "Not Found"}
          </div>
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Origin:{" "}
          {val?.breeds?.[0]
            ? val?.breeds?.[0]?.origin
            : "Not Found"}
        </p>
      </div>
      <p className="text-sm font-medium text-gray-900">
        Life:{" "}
        {val?.breeds?.[0]
          ? `${val?.breeds?.[0]?.life_span}y`
          : "Not Found"}
      </p>
    </div>
  </Link>

  )
}

export default CatCards