import React from "react";
import "./movieCard.pcss";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ButtonMovie from "../buttons/ButtonMovie";

const CardMovie = props => {
    const { title } = props;
    const { poster } = props;
    const { year } = props;
    const { genre } = props;
    const { btnWatched } = props;
    const { btnFavorite } = props;

    const stateWatched = {
        btn: btnWatched,
        textTrue: "Убрать из просмотренного",
        textFalse: "Добавить в просмотренное",
        ariaLabel: "Add in watched",
        name: "Add in watched",
        id: title,
        type: "CLICK_WATCHED_BUTTON"
    };
    const stateFavorite = {
        btn: btnFavorite,
        textTrue: "Убрать из избранного",
        textFalse: "Добавить в избранное",
        ariaLabel: "Add in favorite",
        name: "Add in favorite",
        id: title,
        type: "CLICK_FAVORITE_BUTTON"
    };

    const chopText = text => {
        if (text.length > 20) {
            return (
                text
                    .split("")
                    .splice(0, 20)
                    .join("") + "..."
            );
        }
        return text;
    };
    console.log(poster);

    return (
        <li className='movie' key={ title }>
            <a
                href='/'
                className='movie__container'
                onClick={ e => {
                    e.preventDefault();
                    // eslint-disable-next-line react/prop-types
                    props.history.push(
                        "/movie/" +
                            title
                                .replace(/[-][ {2}]/g, "")
                                .split(" ")
                                .join("+")
                    );
                } }
            >
                <div className='movie__poster-container'>
                    {poster === "N/A" ? (
                        <img
                            src='https://forum.guns.ru/forums/icons/forum_pictures/025599/25599090_25889.jpg'
                            className='movie__poster'
                            alt='Poster'
                        />
                    ) : (
                        <img src={ poster } className='movie__poster' alt='Poster' />
                    )}
                </div>
                <div className='movie__title-container'>
                    <span className='movie__title'>{chopText(title)}</span>
                </div>
                <div className='movie__faction'>
                    <span className='movie__year'>Year: {year}</span>
                    <span className='movie__genre'>{chopText(genre)}</span>
                </div>
            </a>
            <div className='movie__buttons-container'>
                <ButtonMovie state={ stateWatched } />
                <ButtonMovie state={ stateFavorite } />
            </div>
        </li>
    );
};
CardMovie.propTypes = {
    title: PropTypes.string,
    poster: PropTypes.string,
    year: PropTypes.string,
    genre: PropTypes.string,
    btnWatched: PropTypes.bool,
    btnFavorite: PropTypes.bool
};

export default withRouter(CardMovie);
