import React from "react";
import { Route, Switch } from "react-router-dom";

import { MAIN_PAGE_ROUTE, WATCHED_PAGE_ROUTE, FAVORITE_PAGE_ROUTE } from "../../constants/routes";
import Header from "../header/Header";
import Search from "../search/Search";
import HomePage from "../home-page/HomePage";
import WatchedPage from "../watched-page/WatchedPage";
import FavoritePage from "../favorite-page/FavoritePage";
import DetailedCardMovie from "../detailedCardMovie/DetailedCardMovie";

class PageMain extends React.Component {
    render() {
        return (
            <div className='page-main'>
                <Header />
                <Search />
                <Switch>
                    <Route path={ MAIN_PAGE_ROUTE } exact={ true } component={ HomePage } />
                    <Route exact={ true } path='/movie/:title' component={ DetailedCardMovie } />
                    <Route path={ WATCHED_PAGE_ROUTE } component={ WatchedPage } />
                    <Route path={ FAVORITE_PAGE_ROUTE } component={ FavoritePage } />
                </Switch>
            </div>
        );
    }
}

export default PageMain;
