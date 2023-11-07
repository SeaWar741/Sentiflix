import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import Link from "next/link";
import MovieCard from "../../components/moviecard";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const renderSearchTermResults = (display, results) => {
  if (display && results.results.length == 0) {
    return (
      <h2 className="mt-10 font-medium text-xl">
        No results found for: {display}
      </h2>
    );
  } else if (display && results.results) {
    return (
      <h2 className="mt-10 font-medium text-xl">Results for: {display}</h2>
    );
  }
};

const renderMovies = (results) => {
  if (results?.results?.length > 0) {
    return results.results.map((movie) => <MovieCard movie={movie} />);
  }
  return null;
};

export default function Page({ movies }) {
  const [search, setSearch] = useState("");
  const [searchDisplay, setSearchDisplay] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  console.log(search);

  const searchMovie = async () => {
    if (search == "") return;
    
    //replace spaces with _
    const encodedStr = search.replace(/ /g, "_");

    const reqString = `http://127.0.0.1:5000/api/search/${encodedStr}`;
    console.log(reqString);

    const currentMovie = await fetch(reqString);

    if (!currentMovie.ok) {
      throw new Error("Failed to fetch data");
    }

    const currentMovieData = await currentMovie.json();
    console.log(currentMovieData);
    setSearchResults(currentMovieData);
    setSearchDisplay(search);
  };

  return (
    <>
      <Head>
        <title>Sentiflix | Search</title>
        <meta name="description" content="Description of my Next.js page" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#000000"/>
      </Head>
      <div className="pt-14 pl-14 pr-14 w-full h-full">
        <div className=" w-full">
          <div className=" w-full flex flex-row justify-center">
            <div className="mt-6 flex w-2/3 gap-x-4  flex-row justify-center">
              <input
                placeholder="Movie title..."
                onChange={(evt) => setSearch(evt.target.value)}
                onKeyDown={(evt) => {
                  if (evt.key === 'Enter') {
                    searchMovie();
                  }
                }}
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-red-500 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 hover:ring-2 hover:ring-red-500"
              />


              <button
                type="submit"
                onClick={searchMovie}
                className="flex-none rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                Search
              </button>
            </div>
          </div>

          <div className="px-20">
            <div className="mb-5">
              {renderSearchTermResults(searchDisplay, searchResults)}
            </div>
            <div className="w-full h-full items-center flex flex-grow overflow-x-auto">
              <div className="w-full flex-wrap h-full flex bg-red flex-row gap-5 ">
                {renderMovies(searchResults)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ context }) {
  const res = await fetch(`http://127.0.0.1:5000/api/trending`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return { props: { movies: data } };
}
