/* eslint-disable no-undef */
import { getMovie, addFavoriteLocalstorage, addWatchedLocalstorage } from "../constants/actions";

function checkStateButton(title, list) {
    let bool = false;
    if (list) {
        for (let i = 0; i < list.length; i += 1) {
            if (title === list[i]) {
                bool = true;
                break;
            }
        }
    }
    return bool;
}

// * добавил ещё один параметр: detailedForecast
// * он передаётся только при запросе детальной информации и функция возвращает весь объект информации
export async function getData(film, movieData, detailedForecast = false) {
    let resp = await fetch(`http://www.omdbapi.com/?t=${film}&apikey=575d30b5`);
    resp = await resp.json();
    if (detailedForecast && resp.Response === "True") {
        return resp;
    }
    if (resp.Response === "True") {
        const title = resp.Title;
        const year = resp.Year;
        const genre = resp.Genre;
        const poster = resp.Poster;
        const localstorageWatched = JSON.parse(localStorage.getItem("watchedMovies"));
        const localstorageFavorite = JSON.parse(localStorage.getItem("favoriteMovies"));
        const btnWatched = checkStateButton(title, localstorageWatched);
        const btnFavorite = checkStateButton(title, localstorageFavorite);
        movieData.push({ title, year, genre, poster, btnWatched, btnFavorite });
        return true;
    }
    alert(resp.Error);
    return false;
}

// работает с добавлением фильмов общий список movies (при поиске фильмов)
export function fetchDataMovie(arr) {
    return async dispatch => {
        const listMovies = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const item of arr) {
            // eslint-disable-next-line no-await-in-loop
            await getData(item, listMovies);
        }
        dispatch(getMovie(listMovies));
    };
}

// добавляем фильмы в redux соответсвующие списку локалстора

export function fetchDataWatchedMovies() {
    return async dispatch => {
        const listLocalstorage = JSON.parse(localStorage.getItem("watchedMovies"));
        if (listLocalstorage !== null && listLocalstorage.length > 0) {
            const listMovies = [];
            // eslint-disable-next-line no-restricted-syntax
            for (const item of listLocalstorage) {
                // eslint-disable-next-line no-await-in-loop
                await getData(item, listMovies);
            }
            dispatch(addWatchedLocalstorage(listMovies));
        }
    };
}

export function fetchDataFavoriteMovies() {
    return async dispatch => {
        const listLocalstorage = JSON.parse(localStorage.getItem("favoriteMovies"));

        if (listLocalstorage !== null && listLocalstorage.length > 0) {
            const listMovies = [];
            // eslint-disable-next-line no-restricted-syntax
            for (const item of listLocalstorage) {
                // eslint-disable-next-line no-await-in-loop
                await getData(item, listMovies);
            }
            dispatch(addFavoriteLocalstorage(listMovies));
        }
    };
}
