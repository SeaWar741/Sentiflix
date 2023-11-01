import axios from 'axios';

// Axios instance with default configurations
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
});

// Fetch trending movies
export const getTrendingMovies = async () => {
  try {
    const response = await api.get('/trending');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

// Search for a movie
export const searchMovie = async (query) => {
  try {
    const response = await api.get('/search', {
      params: {
        q: query // Assuming "q" is the query parameter for searching movies
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for movie:', error);
    throw error;
  }
};

// Get a specific movie by ID
export const getMovieById = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with ID ${id}:`, error);
    throw error;
  }
};

// Get a random movie
export const getRandomMovie = async () => {
  try {
    const response = await api.get('/random');
    return response.data;
  } catch (error) {
    console.error('Error fetching random movie:', error);
    throw error;
  }
};

// Classify movie reviews
export const classifyMovieReviews = async (movieId) => {
  try {
    const response = await api.get(`/classify/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error classifying reviews for movie ID ${movieId}:`, error);
    throw error;
  }
};

// Generate a movie review
export const generateMovieReview = async (movieId) => {
  try {
    const response = await api.get(`/generate/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error generating review for movie ID ${movieId}:`, error);
    throw error;
  }
};
