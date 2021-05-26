import React from 'react'; 

import { IMenuProps } from '../../interfaces/MenuProps';

import './styles.css'

const Menu: React.FC<IMenuProps> = props => {

    return (
        <div id="menu">
            <div id="menu__button">
                <i className="fas fa-bars fa-lg" onClick={() => props.menuOnClick(true)}></i>
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