import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import Link from "next/link";
import MovieCard from "../../components/moviecard";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ movies }) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const currentMovie = movies.results[currentMovieIndex];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentMovieIndex((prevIndex) => {
          let newIndex;
          do {
            newIndex = Math.floor(
              Math.random() * (movies?.results.length || 1)
            );
          } while (newIndex === prevIndex && movies?.results.length > 1);
          return newIndex;
        });
        setIsFading(false);
      }, 1000);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [movies]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${currentMovie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={`absolute inset-0  transition-opacity duration-1000 ease-in-out ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      />
      <div className="absolute ml-14 top-40  text-white">
        <h2 className="text-5xl mb-4 font-semibold">{currentMovie.title}</h2>
        <p className="mb-4 w-1/3 text-lg font-light">
          {currentMovie.overview.split(".")[0]}.
        </p>
      </div>
      <div className="absolute pl-14 top-96">
        <Link href={`/film/${currentMovie.id}`}>
          <button className="bg-white text-black hover:bg-gray-300 p-3  font-medium text-base rounded">
            More Information
          </button>
        </Link>
      </div>
      <div className="absolute w-full h-68 bottom-0 bg-gradient-to-t from-black from-1% via-black to-100%">
        <h2 className="pl-14 font-bold text-xl">Trending</h2>

        <div className="w-full h-52 items-center flex flex-grow overflow-x-auto">
          <div className="w-full h-40 flex bg-red flex-row space-x-4 first:pl-14">
            {movies.results.map((movie, i) => (
              <MovieCard ind={i} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ context }) {
  const res = await fetch(`http://127.0.0.1:5001/api/trending`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return { props: { movies: data } };
}
