import React from 'react'; 

import './styles.css'

interface IMenuProps {
    menuOnClick: React.Dispatch<React.SetStateAction<boolean>>;
    availableOnClick: () => void;
}

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
            <div className="menu__AvailableBtn" onClick={props.availableOnClick}>
                <i className="fas fa-check-circle fa-lg"></i>
            </div>
        </div> 
    )
}

export default Menu;