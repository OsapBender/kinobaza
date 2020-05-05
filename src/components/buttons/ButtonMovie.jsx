/* eslint-disable no-undef */
import React, { Component } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./btnMovie.pcss";

class ButtonMovie extends Component {
    handleStorage = (target, key, id, bool) => {
        const { removeFavoriteMovie } = this.props;
        const { removeWatchedMovie } = this.props;
        const { removeMovie } = this.props;
        // приходит прошлое значение, то есть если сейчас true, то покажет false
        const list = JSON.parse(localStorage.getItem(key));
        // * если true, то удаляем из локалстора
        if (bool) {
            target.closest(".movie").classList.add("deleted");
            setTimeout(() => {
                list.map((item, index) => {
                    if (item === id) {
                        list.splice(index, 1);
                    }
                });
                // * удаляем из соотвествующего хранилища redux
                if (key === "watchedMovies") {
                    removeWatchedMovie("REMOVE_WATCHED_MOVIE", id);
                }
                if (key === "favoriteMovies") {
                    removeFavoriteMovie("REMOVE_FAVORITE_MOVIE", id);
                }

                // * удаляем фильм из общего хранилища (movie.хранилище)
                removeMovie("REMOVE_MOVIE", id, key);
                localStorage.setItem(key, JSON.stringify(list));
            }, 300);

            // * если false, то пушим в локалстор
        } else if (localStorage.getItem(key)) {
            list.push(id);
            localStorage.setItem(key, JSON.stringify(list));
        } else {
            // * если локалстора не существует, то создаём и пушим
            const arr = [id];
            localStorage.setItem(key, JSON.stringify(arr));
        }
    };

    addToLocalstorage = (target, type, id, bool) => {
        if (type === "CLICK_WATCHED_BUTTON") {
            const key = "watchedMovies";
            this.handleStorage(target, key, id, bool);
        }
        if (type === "CLICK_FAVORITE_BUTTON") {
            const key = "favoriteMovies";
            this.handleStorage(target, key, id, bool);
        }
    };

    render() {
        const { state } = this.props;
        const { btn } = state;
        const { textTrue } = state;
        const { textFalse } = state;
        const { ariaLabel } = state;
        const { name } = state;
        const { id } = state;
        const { type } = state;

        const { handleClick } = this.props;

        return (
            <button
                type='button'
                name={ name }
                className='movie__btn'
                aria-label={ ariaLabel }
                onClick={ e => {
                    const { target } = e;
                    handleClick(type, id);
                    this.addToLocalstorage(target, type, id, btn);
                } }
            >
                {btn ? textTrue : textFalse}
            </button>
        );
    }
}

ButtonMovie.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object,
    btn: PropTypes.bool,
    textTrue: PropTypes.string,
    textFalse: PropTypes.string,
    name: PropTypes.string,
    ariaLabel: PropTypes.string,
    handleClick: PropTypes.func,
    removeWatchedMovie: PropTypes.func,
    removeFavoriteMovie: PropTypes.func,
    removeMovie: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    handleClick: (type, id) => dispatch({ type, id }),
    removeWatchedMovie: (type, id) => dispatch({ type, id }),
    removeFavoriteMovie: (type, id) => dispatch({ type, id }),
    removeMovie: (type, id, key) => dispatch({ type, id, key })
});

export default connect(null, mapDispatchToProps)(ButtonMovie);
