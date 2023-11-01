'use client'

import React, { useState } from 'react';

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
    <div>
      <h1>Get a Random Movie</h1>
      <button onClick={fetchRandomMovie}>Fetch Random Movie</button>

      {movie && (
        <div>
          <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
          <p>{movie.title}</p>
        </div>
      )}
    </div>
  );
};

export default RandomMovie;
