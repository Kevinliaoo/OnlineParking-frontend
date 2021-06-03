import React from 'react'; 
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

import Parking from '../../objects/Parking';
import Location from '../../objects/Location';
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
    parkings: Parking[];
    onLoadMap: () => void;
    handleOnClickMap: (params: Location) => void;
    loadParkingData: (data: Parking) => void;
}

const Map: React.FC<IMapProps> = props => {

    const parkings: Parking[] = props.parkings;

    const [currentLocation, setLocation] = React.useState<Location>({
        lat: -1,
        lng: -1
    })

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(locationSuccess);
    }, []);

    const locationSuccess = (position: GeolocationPosition) => {
        setLocation({
            lat: position.coords.latitude, 
            lng: position.coords.longitude,
        })
        props.onLoadMap()
    }

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const clickedLocation: Location = {
            lat: event.latLng.lat(), 
            lng: event.latLng.lng(),
        }
        props.handleOnClickMap(clickedLocation);
    }

    const parkingClicked = async (event: google.maps.MapMouseEvent, _id: string) => {
        const endpoint = `${config.API.URL}/parkings/${_id}`;

        try {
            const response: Parking = (await axios.get(endpoint)).data; 
            props.loadParkingData(response);
        } catch(e) {
            alert('Internal server error');
        }
    }

    const renderMap = () => {
        return (
            <LoadScript
                googleMapsApiKey={config.defaults.GOOGLE_MAPS_API_KEY as string} 
            >
                <GoogleMap
                    mapContainerStyle={containerStyles}
                    zoom={17}
                    center={currentLocation}
                    options={defaultOptions}
                    onClick={handleMapClick}
                >
                    {
                        parkings.map(item => {
                            return (
                                <Marker 
                                    key={item._id} 
                                    position={item.location} 
                                    onClick={(e) => parkingClicked(e, item._id)}
                                    icon={{
                                        url: item.available ? config.maps.parkingAvailable : config.maps.parkingOccupied
                                    }}
                                />
                            )
                        })
                    }
                </GoogleMap>
            </LoadScript>
        )
    }

    return renderMap();
}

export default Map;
