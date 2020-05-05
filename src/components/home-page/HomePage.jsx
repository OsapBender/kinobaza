import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CardMovie from "../cardMovie/CardMovie";
import Pagination from "../pagination/Pagination";
import { getTenRecentlyMovies } from "../../functions/pagination";

export class HomePage extends Component {
    render() {
        const { listMovies } = this.props; // * все фильмы, что мы искали
        const { recentlyMovies } = this.props; // * первые 10 фильмов для рендера
        const { getTenRecentlyMovies } = this.props; // * // * функция получения 10 фильмов
        return (
            <div className='wrapper'>
                <div className='container'>
                    {recentlyMovies && recentlyMovies.length > 0 ? <h1>Вы недавно искали... </h1> : <h1>Пусто</h1>}
                    <ul className='movie-wrapper'>
                        {recentlyMovies && recentlyMovies.length > 0
                            ? recentlyMovies.map(movie => CardMovie(movie))
                            : true}
                    </ul>
                    <Pagination listMovies={ listMovies } getTenMovies={ getTenRecentlyMovies } />
                </div>
            </div>
        );
    }
}

HomePage.propTypes = {
    listMovies: PropTypes.array,
    recentlyMovies: PropTypes.array,
    getTenRecentlyMovies: PropTypes.func
};

const mapStateToProps = state => ({
    listMovies: state.movies.listMovies,
    recentlyMovies: state.recentlyMovies.movies
});

const mapDispatchToProps = dispatch => ({
    getTenRecentlyMovies: obj => dispatch(getTenRecentlyMovies(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
