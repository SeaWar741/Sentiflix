'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type Movie = {
  title: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  // Add other properties of the movie here...
};

const MovieDetail: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) fetchMovieDetail(id);
  }, [id]);

  const fetchMovieDetail = async (movieId: string | string[]) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/movie/${movieId}`);
      const data: Movie = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.backdrop_path} alt={movie.title} />
      <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
      {/* You can display other movie details here */}
    </div>
  );
};

export default MovieDetail;

