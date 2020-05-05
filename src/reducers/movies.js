/* eslint-disable guard-for-in */
import {
    GET_DATA_MOVIE,
    ADD_RECENTLY_MOVIES,
    CLICK_WATCHED_BUTTON,
    CLICK_FAVORITE_BUTTON,
    ADD_WATCHED_LOCALSTORAGE,
    ADD_FAVORITE_LOCALSTORAGE,
    ADD_WATCHED_MOVIES,
    ADD_FAVORITE_MOVIES,
    REMOVE_FAVORITE_MOVIE,
    REMOVE_WATCHED_MOVIE,
    REMOVE_MOVIE
} from "../constants/actions";

const changeStateButton = (arr, id, type) => {
    arr.map(movie => {
        if (movie.title === id) {
            // меняем значение кнопки
            if (type === CLICK_FAVORITE_BUTTON) {
                movie.btnFavorite = !movie.btnFavorite;
            }
            if (type === CLICK_WATCHED_BUTTON) {
                movie.btnWatched = !movie.btnWatched;
            }
        }
        return true;
    });
    return arr;
};

const removeMovie = (id, listMovies) => {
    const newState = listMovies.filter(movie => {
        if (movie.title !== id) {
            return movie;
        }
    });

    return newState;
};

const initialState = {
    listMovies: [],
    listWatched: [],
    listFavorite: [],
    moviesOnPage: 10
};

export function movies(state = initialState, action) {
    const { listMovies } = state;
    const { id } = action;

    switch (action.type) {
        case GET_DATA_MOVIE: {
            // прилетает один фильм в массиве, проверяем есть ли он в хранилище, если есть, то удаляем прошлый,
            // let unique = listMovies.filter((set => f => !set.has(f.title) && set.add(f.title))(new Set()));
            const getChangedState = () => {
                const oldState = listMovies;
                oldState.map((movie, index) => {
                    if (movie.title === action.movies[0].title) {
                        oldState.splice(index, 1);
                    }
                });
                oldState.unshift(action.movies[0]);
                return Object.assign({}, state, { listMovies: [...oldState] });
            };

            if (listMovies.length > 0) {
                let newState = getChangedState();
                return Object.assign({}, state, newState);
            }
            return Object.assign({}, state, { listMovies: [...state.listMovies, ...action.movies] });
        }
        case CLICK_WATCHED_BUTTON: {
            const result = changeStateButton(listMovies, id, CLICK_WATCHED_BUTTON);
            const newState = Object.assign({}, state, { listMovies: [...result] });
            return newState;
        }
        case CLICK_FAVORITE_BUTTON: {
            const result = changeStateButton(listMovies, id, CLICK_FAVORITE_BUTTON);
            const newState = Object.assign({}, state, { listMovies: [...result] });
            return newState;
        }
        // * добавление из локалстора
        case ADD_WATCHED_LOCALSTORAGE:
            return Object.assign({}, state, { listWatched: [...action.listMovies] });

        case ADD_FAVORITE_LOCALSTORAGE:
            return Object.assign({}, state, { listFavorite: [...action.listMovies] });

        // * удаление фиьма из этого хранилища
        case REMOVE_MOVIE: {
            const { key } = action;
            let newState;
            if (key === "watchedMovies") {
                newState = removeMovie(id, state.listWatched);
                return Object.assign({}, state, { listWatched: [...newState] });
            }
            if (key === "favoriteMovies") {
                newState = removeMovie(id, state.listFavorite);
                return Object.assign({}, state, { listFavorite: [...newState] });
            }

            return state;
        }
        default:
            return state;
    }
}

// загрузка по 10 фильмов

const initialStateRecently = {
    movies: []
};

export function recentlyMovies(state = initialStateRecently, action) {
    switch (action.type) {
        case ADD_RECENTLY_MOVIES:
            return Object.assign({}, state, { movies: [...action.listMovies] });
        default:
            return state;
    }
}

const initialStateWatched = {
    movies: []
};

export function watchedMovies(state = initialStateWatched, action) {
    switch (action.type) {
        case ADD_WATCHED_MOVIES:
            return Object.assign({}, state, { movies: [...action.listMovies] });
        // * удаление фильма из redux
        case REMOVE_WATCHED_MOVIE: {
            const newState = removeMovie(action.id, state.movies);
            return Object.assign({}, state, { movies: [...newState] });
        }
        default:
            return state;
    }
}

const initialStateFavorite = {
    movies: []
};

export function favoriteMovies(state = initialStateFavorite, action) {
    switch (action.type) {
        case ADD_FAVORITE_MOVIES:
            return Object.assign({}, state, { movies: [...action.listMovies] });
        // * удаление фильма из redux
        case REMOVE_FAVORITE_MOVIE: {
            const newState = removeMovie(action.id, state.movies);
            return Object.assign({}, state, { movies: [...newState] });
        }
        default:
            return state;
    }
}
