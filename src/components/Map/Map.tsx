import React from 'react'; 
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import IParkings from '../../interfaces/IParkings';
import ILocation from '../../interfaces/ILocation';
import config from '../../utils/config';

const containerStyles = {
    height: '100%',
    width: '100%'
}

const defaultOptions = {
    fullscreenControl: false,
    streetViewControl: false,   
}

interface IMapProps {
    parkings: IParkings[];
    handleOnClickMap: (params: ILocation) => void;
}

const Map: React.FC<IMapProps> = props => {

    const parkings: IParkings[] = props.parkings;

    const [currentLocation, setLocation] = React.useState<ILocation>({
        lat: -1,
        lng: -1
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

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const clickedLocation: ILocation = {
            lat: event.latLng.lat(), 
            lng: event.latLng.lng(),
        }
        props.handleOnClickMap(clickedLocation);
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
                    onClick={handleMapClick}
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
