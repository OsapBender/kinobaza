import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getData } from "../../functions/fetchDataMovie";
import "./detailedCardMovie.pcss";

export class DetaildCardMovie extends Component {
    state = {
        resp: {}
    };

    componentDidMount() {
        this.foo();
    }

    foo = async () => {
        let { title } = await this.props.match.params;
        title = await title.replace(/[+]/g, " ");
        const resp = await getData(title, null, true);
        this.setState({ resp });
    };

    render() {
        const { resp } = this.state;
        return (
            <div className='wrapper'>
                <div className='container'>
                    <div className='movie-wrapper movie-wrapper--detailed'>
                        <div className='movie-detailed'>
                            <div className='movie-detailed__poster-container'>
                                <img src={ resp.Poster } className='movie-detailed__poster ' alt='Poster' />
                            </div>
                            <div className='movie-detailed__info '>
                                <ul className='movie-detailed__list-info'>
                                    <li className='movie-detailed__list-item'>
                                        <h2 className='movie-detailed__title '>Title: {resp.Title}</h2>
                                    </li>
                                    <li className='movie-detailed__list-item'>
                                        <h4 className='movie-detailed__subtitle'>Year: </h4>
                                        <p className='movie-detailed__year '>{resp.Year}</p>
                                    </li>
                                    <li className='movie-detailed__list-item'>
                                        <h4 className='movie-detailed__subtitle'>Rated:</h4>
                                        <p className='movie-detailed__rated '>{resp.Rated}</p>
                                    </li>
                                    <li className='movie-detailed__list-item'>
                                        <h4 className='movie-detailed__subtitle'>Realesed:</h4>
                                        <p className='movie-detailed__released'>{resp.Released}</p>
                                    </li>
                                    <li className='movie-detailed__list-item'>
                                        <h4 className='movie-detailed__subtitle'>Run time:</h4>
                                        <p className='movie-detailed__runtime '>{resp.Runtime}</p>
                                    </li>
                                    <li className='movie-detailed__list-item'>
                                        <h4 className='movie-detailed__subtitle'>Genre:</h4>
                                        <p className='movie-detailed__genre '>{resp.Genre}</p>
                                    </li>
                                    <li className='movie-detailed__list-item'>
                                        <h4 className='movie-detailed__subtitle'>Director:</h4>
                                        <p className='movie-detailed__director '>{resp.Director}</p>
                                    </li>
                                    <li className='movie-detailed__list-item'>
                                        <h4 className='movie-detailed__subtitle'>Writer:</h4>
                                        <p className='movie-detailed__writer '>{resp.Writer}</p>
                                    </li>
                                    <li className='movie-detailed__list-item'>
                                        <h4 className='movie-detailed__subtitle'>Actors:</h4>
                                        <p className='movie-detailed__actors'>{resp.Actors} </p>
                                    </li>
                                    <li className='movie-detailed__list-item'>
                                        <h4 className='movie-detailed__subtitle'>Plot:</h4>
                                        <p className='movie-detailed__plot'>{resp.Plot}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DetaildCardMovie);
