import React from 'react'; 
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyles = {
    width: '400px',
    height: '400px',
}

const center = {
    lat: 24.953560, 
    lng: 121.225001,
}

const Map: React.FC = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script', 
        googleMapsApiKey: "",
    })

    const [ map, setMap ] = React.useState(null);

    const onLoad = React.useCallback(map => {
        const bounds = new window.google.maps.LatLngBounds(); 
        map.fitBounds(bounds);
        setMap(map);
    }, [])

    const onUnmount = React.useCallback(map => {
        setMap(null);
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle = { containerStyles }
            center = { center }
            zoom = { 10 }
            onLoad = { onLoad }
            onUnmount = { onUnmount }
        >
        </GoogleMap>
    ) : (
        <></>
    )
}

export default Map;