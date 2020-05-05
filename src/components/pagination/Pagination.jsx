import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./pagination.pcss";
import { clickPagination } from "../../functions/pagination";

class Pagination extends Component {
    render() {
        const { listMovies } = this.props; // * все фильмы, что искали
        const { moviesOnPage } = this.props; // * сколько должны быть фильмов на странице
        const { activePage } = this.props; // * индекс активной страницы пагинации
        const { clickPagination } = this.props;
        const numberOfPage = [];
        const { getTenMovies } = this.props; // * функция получения 10 фильмов

        // ! нужно перенести это в componentdidmount
        getTenMovies({ listMovies, activePage, moviesOnPage }); // * вызываем функцию получения 10 фильмов, которые нужно показать

        // * получаем количество страниц в пагинации
        if (listMovies.length <= moviesOnPage) {
            numberOfPage.push(1);
        } else {
            const max = Math.ceil(listMovies.length / moviesOnPage);
            for (let i = 1; i <= max; i += 1) {
                numberOfPage.push(i);
            }
        }

        function getPagination() {
            // определяем, сколько страниц будет видно впереди
            const max = activePage + 2;
            let activeNext = activePage;
            const next = [];
            // eslint-disable-next-line no-plusplus
            for (let i = ++activeNext; i <= max; i += 1) {
                if (i > numberOfPage.length) {
                    break;
                }
                next.push(i);
            }

            // определяем, сколько страниц будет видно позади
            const min = activePage - 2;
            const prev = [];
            for (let i = min; i <= activePage; i += 1) {
                if (i >= 1 && activePage !== i) {
                    prev.push(i);
                }
            }

            return (
                <>
                    {prev.map(item => (
                        <li key={ item } className='pagination__list-item'>
                            <button type='button' className='pagination__page' onClick={ () => clickPagination(item) }>
                                {item}
                            </button>
                        </li>
                    ))}
                    <li key={ activePage } className='pagination__list-item'>
                        <button
                            type='button'
                            className='pagination__page active'
                            onClick={ () => clickPagination(activePage) }
                        >
                            {activePage}
                        </button>
                    </li>
                    {next.map(item => (
                        <li key={ item } className='pagination__list-item'>
                            <button type='button' className='pagination__page' onClick={ () => clickPagination(item) }>
                                {item}
                            </button>
                        </li>
                    ))}
                    {activePage + 2 < numberOfPage.length ? (
                        <li key='...' className='pagination__list-item'>
                            <span>...</span>
                        </li>
                    ) : (
                        true
                    )}
                </>
            );
        }

        return listMovies.length === 0 || !listMovies ? (
            true
        ) : (
            <div className='pagination'>
                <div className='pagination__wrapper'>
                    <button
                        type='button'
                        name='btn-prev'
                        className='pagination__prev'
                        onClick={ () => {
                            let idx = activePage;
                            if (idx !== 1) {
                                idx -= 1;
                                clickPagination(idx);
                            }
                        } }
                    >
                        <span role='img' aria-label='Go to back'>
                            🔚
                        </span>
                    </button>
                    <ul className='pagination__list'>{getPagination()}</ul>
                    <button
                        type='button'
                        name='btn-next'
                        className='pagination__next'
                        onClick={ () => {
                            let idx = activePage;
                            if (listMovies.length !== idx) {
                                idx += 1;
                                clickPagination(idx);
                            }
                        } }
                    >
                        <span role='img' aria-label='Go to next'>
                            🔜
                        </span>
                    </button>
                </div>
            </div>
        );
    }
}

Pagination.propTypes = {
    listMovies: PropTypes.array,
    activePage: PropTypes.number,
    clickPagination: PropTypes.func,
    getTenMovies: PropTypes.func,
    moviesOnPage: PropTypes.number
};

const mapStateToProps = state => ({
    activePage: state.pagination.activePage,
    moviesOnPage: state.movies.moviesOnPage
});

const mapDispatchToProps = dispatch => ({
    clickPagination: index => dispatch(clickPagination(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
