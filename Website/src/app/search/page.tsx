"use client";

import { useState } from "react";

async function getMovieData(name) {
  console.log("we out here");

  const res = await fetch(`http://127.0.0.1:5001/api/search/${name}`);
  console.log("we out here");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Page() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    console.log("LMAO");
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    const data = await getMovieData(search);
    setResults(data);
  };

  console.log(search);
  console.log("fuck me");

  return (
    <div className="pt-14 pl-14 pr-14 w-full h-full">
      <div className=" w-full">
        <div className=" w-full flex flex-row justify-center">
          <div className="mt-6 flex w-2/3 gap-x-4  flex-row justify-center">
            <input
              onChange={console.log(2)}
              className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              value={search}
            />
            <button
              type="submit"
              onClick={(evt) => handleSearch()}
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
