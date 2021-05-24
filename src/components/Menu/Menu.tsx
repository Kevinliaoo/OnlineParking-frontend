import React from 'react'; 

import { menuPropsInterface } from '../../interfaces/menuPropsInterface';

import './styles.css'

const Menu: React.FC<menuPropsInterface> = props => {

    const toggleSettingsMenu = () => {
        props.menuOnClick();
    }

    return (
        <div id="menu">
            <div id="menu__button">
                <i className="fas fa-bars fa-lg" onClick={toggleSettingsMenu}></i>
            </div>
            <div className="menu__search">
                <input type="text" placeholder="Search" ></input>
            </div>
            <div className="menu__searchBtn">
                <i className="fas fa-search fa-lg"></i>
            </div>
        </div> 
    )
}

export default Menu;