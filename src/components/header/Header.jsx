import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./header.pcss";

export default class Header extends Component {
    state = {
        menu: false
    };

    toggleMenuHandler = () => {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    };

    render() {
        const linksPath = ["/", "/watched", "/favorite"];
        const links = ["Поиск", "Просмотернные", "Избранное"];
        const { menu } = this.state;
        const cls = ["menuToggle"];
        if (menu) {
            cls.push("active");
        }
        return (
            <>
                <header className='main-header'>
                    <div className='main-header__wrapper container'>
                        <div className='main-header__logo-container'>
                            <span className={ menu ? "main-header__logo active" : "main-header__logo" }>кинобаза</span>
                        </div>
                        <div className='main-header__links-container'>
                            <nav>
                                <ul className={ menu ? "main-header__list active" : "main-header__list" }>
                                    {links.map((item, index) => (
                                        <li key={ item } className='main-header__list-item'>
                                            <NavLink
                                                to={ linksPath[index] }
                                                exact={ true }
                                                className='main-header__link'
                                                onClick={ this.toggleMenuHandler }
                                            >
                                                {item}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        <button
                            type='button'
                            name='Menu'
                            className={ cls.join(" ") }
                            aria-label='Button Menu'
                            onClick={ this.toggleMenuHandler }
                        >
                            <span />
                        </button>
                    </div>
                </header>
            </>
        );
    }
}
