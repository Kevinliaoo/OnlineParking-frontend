import React from 'react'; 
import axios from 'axios';

import IRoute from '../../interfaces/RouteInterface';
import IParkings from '../../interfaces/IParkings';

import Map from '../../components/Map/Map';
import Menu from '../../components/Menu/Menu';
import Settings from '../../components/Settings/Settings';
import AddNewModal from '../../components/AddNewModal/AddNewModal';
import ProfileModal from '../../components/ProfileModal/ProfileModal';
import config from '../../utils/config';

import './styles.css';

const MapPage: React.FC<IRoute> = props => {

    const [ settingsVisible, setSettingsVisibility ] = React.useState<boolean>(false);
    const [ modalVisible, setModalVisibility ] = React.useState<boolean>(false);
    const [ profileVisible, setProfileVisibility ] = React.useState<boolean>(false);
    const [ parkingsLoaded, loadParkings ] = React.useState<boolean>(false);

    const [ parkings, setParkigs ] = React.useState<IParkings[]>([]);

    const handleLogout = () => {
        const { history } = props as any;
        history.push('/login')
    }

    React.useEffect(() => {
        const parkings_url: string = `${config.API.URL}/parkings?city=Taoyuan&available=false`;

        // Tengo que sacar la ciudad
        axios.get(parkings_url)
            .then(response => {
                const res = response.data.map((p: IParkings) => p);
                setParkigs(res);
                loadParkings(true);
            })
            .catch(() => {
                alert('Internal server error');
                // Redireccionar a la pagina de login
            });
    }, []);

    const renderPage = () => (
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
            <Map parkings={parkings} /> 
        </div>
    )

    const renderLoading = () => (
        <div>Loading page</div>
    )

    return parkingsLoaded ? renderPage() : renderLoading()
}

export default MapPage;