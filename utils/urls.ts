const API_KEY = "2dca580c2a14b55200e784d157207b4d";

export const BASE_PATH = "https://api.themoviedb.org/3";

export const MOVIES_PATH = `${BASE_PATH}/discover/movie?api_key=${API_KEY}`;

export const GENRE_PATH = `${BASE_PATH}/genre/movie/list?api_key=${API_KEY}`;

export const SEARCH_PATH = `${BASE_PATH}/search/movie?api_key=${API_KEY}`

export const MOVIE_PATH = (id: number) => `${BASE_PATH}/movie/${id}?api_key=${API_KEY}`;

export const IMAGE_185_PATH = "https://image.tmdb.org/t/p/w185";

export const IMAGE_500_PATH = "https://image.tmdb.org/t/p/w500";

export const FALLBACK_POSTER_PATH = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';

export const FALLBACK_MOVIE_POSTER_PATH = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';