export const GET_DATA_MOVIE = "GET_DATA_MOVIE";
export const CHANGE_PAGINATION = "CHANGE_PAGINATION";
export const ADD_RECENTLY_MOVIES = "ADD_RECENTLY_MOVIES";
export const ADD_WATCHED_MOVIES = "ADD_WATCHED_MOVIES";
export const ADD_FAVORITE_MOVIES = "ADD_FAVORITE_MOVIES";
export const CLICK_WATCHED_BUTTON = "CLICK_WATCHED_BUTTON";
export const CLICK_FAVORITE_BUTTON = "CLICK_FAVORITE_BUTTON";
export const ADD_WATCHED_LOCALSTORAGE = "ADD_WATCHED_LOCALSTORAGE";
export const ADD_FAVORITE_LOCALSTORAGE = "ADD_FAVORITE_LOCALSTORAGE";
export const REMOVE_MOVIE = "REMOVE_MOVIE";
export const REMOVE_WATCHED_MOVIE = "REMOVE_WATCHED_MOVIE";
export const REMOVE_FAVORITE_MOVIE = "REMOVE_FAVORITE_MOVIE";

export function getMovie(movies) {
    return {
        type: GET_DATA_MOVIE,
        movies
    };
}

export function changePagination(index) {
    return {
        type: CHANGE_PAGINATION,
        index
    };
}

export function addRecentlyMovies(listMovies) {
    return {
        type: ADD_RECENTLY_MOVIES,
        listMovies
    };
}

export function addWatchedMovies(listMovies) {
    return {
        type: ADD_WATCHED_MOVIES,
        listMovies
    };
}

export function addFavoriteMovies(listMovies) {
    return {
        type: ADD_FAVORITE_MOVIES,
        listMovies
    };
}

export function addWatchedLocalstorage(listMovies) {
    return {
        type: ADD_WATCHED_LOCALSTORAGE,
        listMovies
    };
}

export function addFavoriteLocalstorage(listMovies) {
    return {
        type: ADD_FAVORITE_LOCALSTORAGE,
        listMovies
    };
}
