"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Center({ movieData }) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentMovieIndex((prevIndex) => {
          let newIndex;
          do {
            newIndex = Math.floor(
              Math.random() * (movieData?.results.length || 1)
            );
          } while (newIndex === prevIndex && movieData?.results.length > 1);
          return newIndex;
        });
        setIsFading(false);
      }, 1000);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [movieData]);

  const currentMovie = movieData.results[currentMovieIndex];
  const lmao = () => redirect(`/film/${currentMovie.id}`);

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
    </>
  );
}
