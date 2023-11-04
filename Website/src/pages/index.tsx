import { useState, useEffect } from "react";
import Link from "next/link";
import MovieCard from "../../components/moviecard";
import Head from 'next/head';

export default function Home() {
  const [movies, setMovies] = useState({ results: [] });
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Fetch movies data from the API on component mount
  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/trending`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("Fetching movies failed:", error);
        // Handle error state as needed
      }
    }

    fetchMovies();
  }, []);

  // Set up the interval for changing movies
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentMovieIndex((prevIndex) => {
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * (movies.results.length || 1));
          } while (newIndex === prevIndex && movies.results.length > 1);
          return newIndex;
        });
        setIsFading(false);
      }, 1000);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [movies.results.length]);

  const currentMovie = movies.results[currentMovieIndex] || {};

  return (
    <>
      <Head>
        <title>Sentiflix | Home</title>
        <meta name="description" content="Description of my Next.js page" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#000000"/>
      </Head>
      {currentMovie.backdrop_path && (
        <div
          style={{
            backgroundImage: `url(${currentMovie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
      <div className="absolute ml-14 top-40 text-white">
        <h2 className="text-5xl mb-4 font-semibold">{currentMovie.title}</h2>
        <p className="mb-4 w-1/3 text-lg font-light">
          {currentMovie.overview?.split(".")[0]}.
        </p>
      </div>
      <div className="absolute pl-14 top-96">
        <Link href={`/film/${currentMovie.id}`} legacyBehavior>
          <a className="bg-white text-black hover:bg-gray-300 p-3 font-medium text-base rounded">
            More Information
          </a>
        </Link>
      </div>
      <div className="absolute w-full h-68 bottom-0 bg-gradient-to-t from-black from-1% via-black to-100%">
        <h2 className="pl-14 font-bold text-xl">Trending</h2>
        <div className="w-full h-52 items-center flex flex-grow overflow-x-auto">
          <div className="w-full h-40 flex bg-red flex-row space-x-4 first:pl-14">
            {movies.results.map((movie, i) => (
              <MovieCard key={movie.id} ind={i} movie={movie} />
            ))}
          </div>
        </div>
      </div>
      {/*Add more sections like trending*/}
    </>
  );
}
