'use client'

import React, { useState, useEffect } from 'react';
import { getTrendingMovies } from '../api/sentiflix/route';
import Image from 'next/image';
import Link from 'next/link';

const Trending: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) {
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
        <div>Loading...</div>
      </>
    );
  }

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
        <h2>Trending Movies</h2>
        <ul>
          {movies.map((movie: any) => (
            <li key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
              <p>{movie.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Trending;

