import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Pagination from "../pagination/Pagination";
import CardMovie from "../cardMovie/CardMovie";
import { fetchDataFavoriteMovies } from "../../functions/fetchDataMovie";
import { getTenFavoriteMovies } from "../../functions/pagination";

export class FavoritePage extends Component {
    componentDidMount() {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.fetchDataFavoriteMovies();
    }

    render() {
        const { listFavorite } = this.props;
        const { getTenFavoriteMovies } = this.props;
        const { favoriteMovies } = this.props;

        return (
            <div className='wrapper'>
                <div className='container'>
                    {favoriteMovies && favoriteMovies.length > 0 ? <h1>Ваши избранные фильмы</h1> : true}
                    <ul className='movie-wrapper'>
                        {favoriteMovies && favoriteMovies.length > 0 ? (
                            favoriteMovies.map(movie => CardMovie(movie))
                        ) : (
                            <h1>Вы не добавили ни одного фильма в избранные</h1>
                        )}
                    </ul>
                    <Pagination listMovies={ listFavorite } getTenMovies={ getTenFavoriteMovies } />
                </div>
            </div>
        );
    }
}

FavoritePage.propTypes = {
    listFavorite: PropTypes.array,
    fetchDataFavoriteMovies: PropTypes.func,
    getTenFavoriteMovies: PropTypes.func,
    favoriteMovies: PropTypes.array
};

const mapStateToProps = state => ({
    listFavorite: state.movies.listFavorite,
    favoriteMovies: state.favoriteMovies.movies
});

const mapDispatchToProps = dispatch => ({
    fetchDataFavoriteMovies: () => dispatch(fetchDataFavoriteMovies()),
    getTenFavoriteMovies: obj => dispatch(getTenFavoriteMovies(obj))
});
export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage);
