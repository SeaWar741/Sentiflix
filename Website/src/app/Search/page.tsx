'use client'

import React, { useState } from 'react';

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [movie, setMovie] = useState<any>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/search/${query}`);
      const data = await response.json();
      setMovie(data.results[0]); // Assuming you want the first result
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  return (
    <div>
      <h1>Search for a Movie</h1>
      <input
        type="text"
        placeholder="Enter movie name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {movie && (
        <div>
          <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
          <p>{movie.title}</p>
        </div>
      )}
    </div>
  );
};

export default Search;
