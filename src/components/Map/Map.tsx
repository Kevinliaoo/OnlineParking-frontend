import React from 'react'; 
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import config from '../../utils/config';

const containerStyles = {
    width: '100%',
    height: '100%',
}

const center = {
    lat: 24.953560, 
    lng: 121.225001,
}

const defaultOptions = {
    fullscreenControl: false,
    streetViewControl: false,   
}

const Map: React.FC = () => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script', 
        googleMapsApiKey: config.defaults.GOOGLE_MAPS_API_KEY || '',
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

    const renderMap = () => {
        return (
            <GoogleMap
                mapContainerStyle = { containerStyles }
                center = { center }
                zoom = { 8 }
                options = { defaultOptions }
                onLoad = { onLoad }
                onUnmount = { onUnmount }
            >

            </GoogleMap>
        )
    }

    if (loadError) {
        return (
            <div>
                Map could not be loaded
            </div>
        )
    }

    return isLoaded ? renderMap() : <div>LoadinfPage</div>
}

export default Map;