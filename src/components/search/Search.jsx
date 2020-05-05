import React, { Component } from "react";
import "./search.pcss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchDataMovie } from "../../functions/fetchDataMovie";

class Search extends Component {
    render() {
        const { fetchDataMovie } = this.props;
        return (
            <div className='search'>
                <div className='search__wrapper container'>
                    <label className='search__label' htmlFor='searchBtn'>
                        <input type='search' className='search__input' />
                    </label>
                    <button
                        type='button'
                        id='searchBtn'
                        className='search__btn'
                        onClick={ () => {
                            const input = document.querySelector(".search__input");
                            fetchDataMovie([input.value]);
                            input.value = "";
                        } }
                    >
                        <span role='img' aria-label='search-image'>
                            &#128269;
                        </span>
                    </button>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    fetchDataMovie: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    fetchDataMovie: arr => dispatch(fetchDataMovie(arr))
});

export default connect(null, mapDispatchToProps)(Search);
