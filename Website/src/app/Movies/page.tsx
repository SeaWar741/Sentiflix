'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/movie');
      const data = await response.json();
      setMovies(data); // Adjust this based on the structure of the returned data
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
