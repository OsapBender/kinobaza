import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Pagination from "../pagination/Pagination";
import CardMovie from "../cardMovie/CardMovie";
import { fetchDataWatchedMovies } from "../../functions/fetchDataMovie";
import { getTenWatchedMovies } from "../../functions/pagination";

export class WatchedPage extends Component {
    componentDidMount() {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.fetchDataWatchedMovies();
    }

    render() {
        const { listWatched } = this.props;
        const { getTenWatchedMovies } = this.props;
        const { watchedMovies } = this.props;
        return (
            <div className='wrapper'>
                <div className='container'>
                    {watchedMovies && watchedMovies.length > 0 ? <h1>Ваши просмотренные фильмы</h1> : true}
                    <ul className='movie-wrapper'>
                        {watchedMovies && watchedMovies.length > 0 ? (
                            watchedMovies.map(movie => CardMovie(movie))
                        ) : (
                            <h1>Вы не добавили ни одного фильма в просмотренные</h1>
                        )}
                    </ul>
                    <Pagination listMovies={ listWatched } getTenMovies={ getTenWatchedMovies } />
                </div>
            </div>
        );
    }
}

WatchedPage.propTypes = {
    listWatched: PropTypes.array,
    fetchDataWatchedMovies: PropTypes.func,
    getTenWatchedMovies: PropTypes.func,
    watchedMovies: PropTypes.array
};

const mapStateToProps = state => ({
    listWatched: state.movies.listWatched,
    watchedMovies: state.watchedMovies.movies
});

const mapDispatchToProps = dispatch => ({
    fetchDataWatchedMovies: () => dispatch(fetchDataWatchedMovies()),
    getTenWatchedMovies: obj => dispatch(getTenWatchedMovies(obj))
});
export default connect(mapStateToProps, mapDispatchToProps)(WatchedPage);
