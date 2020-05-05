import { combineReducers } from "redux";
import { movies, recentlyMovies, watchedMovies, favoriteMovies } from "./movies";
import { pagination } from "./pagination";

const reducers = {
    movies,
    pagination,
    recentlyMovies,
    watchedMovies,
    favoriteMovies
};

export default combineReducers(reducers);
