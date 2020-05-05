import { changePagination, addRecentlyMovies, addWatchedMovies, addFavoriteMovies } from "../constants/actions";

export const clickPagination = params => dispatch => {
    const index = params; // * это будет новая активная страница
    dispatch(changePagination(index));
};

const getTenMovies = params => {
    const { activePage } = params;
    const { listMovies } = params;
    const { moviesOnPage } = params;
    const min = activePage * moviesOnPage - moviesOnPage;
    const max = activePage * moviesOnPage;
    const moviesForRendering = [];

    for (let i = min; i < max; i += 1) {
        if (listMovies[i] === undefined) {
            break;
        }
        moviesForRendering.push(listMovies[i]);
    }
    return moviesForRendering;
};

export const getTenRecentlyMovies = params => dispatch => {
    const moviesForRendering = getTenMovies(params);
    dispatch(addRecentlyMovies(moviesForRendering));
};

export const getTenWatchedMovies = params => dispatch => {
    const moviesForRendering = getTenMovies(params);
    dispatch(addWatchedMovies(moviesForRendering));
};

export const getTenFavoriteMovies = params => dispatch => {
    const moviesForRendering = getTenMovies(params);
    dispatch(addFavoriteMovies(moviesForRendering));
};
