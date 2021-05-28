
const config = {
    defaults: {
        name: 'Online Parking',
        GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    }, 
    API: {
        URL: process.env.REACT_APP_API_URL
    }, 
    maps: {
        parkingOccupied: 'https://img.icons8.com/pastel-glyph/64/fa314a/parking--v3.png', 
        parkingAvailable: 'https://img.icons8.com/pastel-glyph/64/26e07f/parking--v3.png'
    }
}

export default config;