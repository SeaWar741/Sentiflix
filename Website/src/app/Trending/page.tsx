'use client'

import React, { useState, useEffect } from 'react';
import { getTrendingMovies } from '../api/sentiflix/route';

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
    return <div>Loading...</div>;
  }

  return (
    <div>
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
  );
};

export default Trending;

