'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const RandomMovie: React.FC = () => {
  const [movie, setMovie] = useState<any>(null);

  const fetchRandomMovie = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/random`);
      const data = await response.json();
      setMovie(data.results[0]); // Assuming you want the first result
    } catch (error) {
      console.error('Error fetching random movie data:', error);
    }
  };

  return (
    <>
      <div className='flex justify-center mt-8'>
        <Link href="/">
          <Image
          src="/logo_horizontal.png"
          width={500}
          height={500}
          alt="Sentflix Logo"
          />
        </Link>
      </div>
      <div className='flex justify-center mt-8'>
        <h1>Get a Random Movie</h1>
        <button onClick={fetchRandomMovie}>Fetch Random Movie</button>

        {movie && (
          <div>
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default RandomMovie;
