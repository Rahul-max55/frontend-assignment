import React from "react";

const Filters = ({ setHasBreeds, setOrder  , hasBreeds}) => {
  const handleChange = () => {
    hasBreeds ? setHasBreeds(0) : setHasBreeds(1);
  };

  return (
    <>
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
    </>
  );
};

export default Filters;
