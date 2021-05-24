import React from 'react'; 

import IRoute from '../../interfaces/route';

import Map from '../../components/Map/Map';
import Menu from '../../components/Menu/Menu';
import Settings from '../../components/Settings/Settings';

import './styles.css';

const HomePage: React.FC<IRoute> = props => {

    const [ settingsVisible, setSettingsVisibility ] = React.useState(false);

    const toggleSettingsVisibility = () => {
        setSettingsVisibility(!settingsVisible);
    }

    return (
        <div id="homePage">
            <Menu menuOnClick={toggleSettingsVisibility} /> 
            <Map /> 
            <Settings visibility={settingsVisible} />
        </div>
    )
}

export default HomePage;