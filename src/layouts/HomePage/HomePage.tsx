import React from 'react'; 

import IRoute from '../../interfaces/route';

import Navbar from '../../components/Navbar/Navbar';
import Map from '../../components/Map/Map';

const HomePage: React.FC<IRoute> = props => {
    return (
        <div>
            <Navbar />
            <Map />
        </div>
    )
}

export default HomePage;