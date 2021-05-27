interface IParkings {
    _id: string;
    location: {
        lat: number, 
        lng: number
    }; 
    available: boolean;
    city: string; 
    address: {
        streetName: string, 
        number: number
    }; 
    last_updated: string; 
    counts: number;
    user: string;
}

export default IParkings;