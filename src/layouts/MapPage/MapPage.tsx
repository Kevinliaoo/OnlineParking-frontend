import React from 'react'; 
import axios from 'axios';

import IRoute from '../../interfaces/RouteInterface';
import Parking from '../../objects/Parking';
import Location from '../../objects/Location';
import User from '../../objects/User';

import Map from '../../components/Map/Map';
import Menu from '../../components/Menu/Menu';
import Settings from '../../components/Settings/Settings';
import AddNewModal from '../../components/AddNewModal/AddNewModal';
import ProfileModal from '../../components/ProfileModal/ProfileModal';
import ParkingModal from '../../components/ParkingModal/ParkingModal';
import config from '../../utils/config';
import LSFunctions from '../../utils/localStorage';

import './styles.css';

const MapPage: React.FC<IRoute> = props => {

    // Settings menu visibility
    const [ settingsVisible, setSettingsVisibility ] = React.useState<boolean>(false);
    // Add new Parking Modal visibility
    const [ modalVisible, setModalVisibility ] = React.useState<boolean>(false);
    // Profile info modal visibility
    const [ profileVisible, setProfileVisibility ] = React.useState<boolean>(false);
    // Parking info modal visibility
    const [ parkingVisible, setParkingVisibility ] = React.useState<boolean>(false);
    // Whether the API request to get Parkings was done
    const [ parkingsLoaded, loadParkings ] = React.useState<boolean>(false);
    // Get only available parkings
    const [ onlyAvailable, setOnlyAv ] = React.useState<boolean>(false);
    // To make re render after occupying a parking
    const [ renderCounts, setRendercounts ] = React.useState<number>(0);
    // Parkings got by API request
    const [ parkings, setParkigs ] = React.useState<Parking[]>([]);
    // Location clicked on map to add a new Parking
    const [ clickedLocation, setLocation ] = React.useState<Location>({
        lat: -1, lng: -1
    })
    // Parking info for Parking info modal
    const [ parkingInfo, setParkingInfo ] = React.useState<Parking>({
        // Empty id value for default 
        _id: '',
        location: {
            lat: -1, 
            lng: -1
        },
        available: false, 
        address: {
            streetName: '',
            number: -1
        }, 
        last_updated: '', 
        counts: -1,
        user: '',
        city: ''
    })
    // Logged user
    const [ user, setUser ] = React.useState<User>({
        _id: '',
        username: ''
    })

    // Logout function
    const handleLogout = () => {
        const { history } = props as any;
        history.push('/login')
    }

    // When user clicks the map to add a new Parking
    const handleOnClickMap = (latLng: Location) => {
        setLocation(latLng);
        setModalVisibility(true);
    }
    
    // User clicks a Parking to show Parking info modal 
    const loadParkingData = (parking: Parking) => {
        setParkingInfo(parking)
        setParkingVisibility(true);
    }
    
    // User closes Modal to add new Parking
    const closeAddNewModal = () => {
        setLocation({
            lat: -1, 
            lng: -1
        });
        setRendercounts(renderCounts+1);
        setModalVisibility(false);
    }

    // User closes Profile modal
    const closeProfile = () => {
        setProfileVisibility(false);
    }

    // User toggles Parkings availability
    const toggleAvailability = () => {
        setOnlyAv(!onlyAvailable);
    }

    // User closes parking modal 
    const closeParkingModal= (): void => {
        setParkingInfo({
            ...parkingInfo, 
            _id: ''
        })
        setParkingVisibility(false);
    }

    // Re render map 
    const reRenderMap = () => setRendercounts(renderCounts+1);

    // Get logged user
    const getUser = async () => {
        try {
            const endpoint = `${config.API.URL}/users/me`; 
            const configs = {
                headers: { Authorization: `Bearer ${LSFunctions.getJwtToken()}` }
            };
            const res: User = (await axios.get(endpoint, configs)).data;
            setUser(res);
        } catch(e) {
            alert('Internal server error');
        }
    }

    // Send Parking info to Parking modal
    const goToParking = (parking: Parking) => {
        setParkingInfo(parking);
        setParkingVisibility(true);
    }
    
    React.useEffect(() => {
        getUser();
        const parkings_url: string = `${config.API.URL}/parkings?available=${onlyAvailable ? 'true' : 'false'}`;

        // Tengo que sacar la ciudad
        axios.get(parkings_url)
            .then(response => {
                const res = response.data.map((p: Parking) => p);
                setParkigs(res);
                loadParkings(true);
            })
            .catch(() => {
                alert('Internal server error');
                // Redireccionar a la pagina de login
            });
    }, [onlyAvailable, renderCounts]);

    const renderPage = () => (
        <div id="mapPage">
            <Menu menuOnClick={setSettingsVisibility} availableOnClick={toggleAvailability} /> 
            <AddNewModal 
                isActive={modalVisible} 
                onClose={closeAddNewModal} 
                defaultLatLng={clickedLocation}
            />
            <ProfileModal 
                isActive={profileVisible} 
                onClose={closeProfile} 
                goBack={handleLogout}
                user={user}
                goToParking={goToParking}
            />
            <ParkingModal 
                isActive={parkingVisible}
                onClose={closeParkingModal}
                parkingData={parkingInfo}
                reRenderMap={reRenderMap}
                user={user}
            />
            <Settings 
                visibility={settingsVisible} 
                onClose={setSettingsVisibility} 
                openModal={setModalVisibility} 
                openProfile={setProfileVisibility}
                handleLogout={handleLogout}
            />
            <Map 
                parkings={parkings} 
                handleOnClickMap={handleOnClickMap} 
                loadParkingData={loadParkingData}
            /> 
        </div>
    )

    const renderLoading = () => (
        <div>Loading page</div>
    )

    return (parkingsLoaded && user._id !== '') ? renderPage() : renderLoading()
}

export default MapPage;