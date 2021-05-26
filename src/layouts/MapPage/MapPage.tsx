import React from 'react'; 

import IRoute from '../../interfaces/RouteInterface';

import Map from '../../components/Map/Map';
import Menu from '../../components/Menu/Menu';
import Settings from '../../components/Settings/Settings';
import AddNewModal from '../../components/AddNewModal/AddNewModal';
import ProfileModal from '../../components/ProfileModal/ProfileModal';

import './styles.css';

const MapPage: React.FC<IRoute> = props => {

    const [ settingsVisible, setSettingsVisibility ] = React.useState(false);
    const [ modalVisible, setModalVisibility ] = React.useState(false);
    const [ profileVisible, setProfileVisibility ] = React.useState(false);

    const handleLogout = () => {
        const { history } = props as any;
        history.push('/login')
    }

    return (
        <div id="mapPage">
            <Menu menuOnClick={setSettingsVisibility} /> 
            <AddNewModal isActive={modalVisible} onClose={setModalVisibility} />
            <ProfileModal 
                isActive={profileVisible} 
                onClose={setProfileVisibility} 
                goBack={handleLogout}
            />
            <Settings 
                visibility={settingsVisible} 
                onClose={setSettingsVisibility} 
                openModal={setModalVisibility} 
                openProfile={setProfileVisibility}
                handleLogout={handleLogout}
            />
            <Map /> 
        </div>
    )
}

export default MapPage;