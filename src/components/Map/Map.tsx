import React from 'react'; 
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import IParkings from '../../interfaces/IParkings';
import config from '../../utils/config';

const containerStyles = {
    height: '100%',
    width: '100%'
}

const defaultOptions = {
    fullscreenControl: false,
    streetViewControl: false,   
}

interface ILocation {
    lat: number; 
    lng: number; 
}

interface IMapProps {
    parkings: IParkings[];
}

const Map: React.FC<IMapProps> = props => {

    const parkings: IParkings[] = props.parkings;

    const [currentLocation, setLocation] = React.useState<ILocation>({
        lat: 0,
        lng: 0
    })

    const [locationLoaded, loadLocation] = React.useState<boolean>(false);

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(locationSuccess);
    }, []);

    const locationSuccess = (position: GeolocationPosition) => {
        setLocation({
            lat: position.coords.latitude, 
            lng: position.coords.longitude,
        })
        loadLocation(true);
    }


    const renderMap = () => {
        return (
            <LoadScript
                googleMapsApiKey={config.defaults.GOOGLE_MAPS_API_KEY as string} 
            >
                <GoogleMap
                    mapContainerStyle={containerStyles}
                    zoom={15}
                    center={currentLocation}
                    options={defaultOptions}
                >
                    {
                        parkings.map(item => {
                            return (
                                <Marker key={item._id} position={item.location} />
                            )
                        })
                    }
                </GoogleMap>
            </LoadScript>
        )
    }

    const renderLoading = () => (
        <div>Loading map</div>
    )

    return locationLoaded ? renderMap() : renderLoading()
}

export default Map;
