import React from 'react'; 

import IRoute from '../../interfaces/RouteInterface';

import Navbar from '../../components/Navbar/Navbar';

import './styles.css';

const logo = require('../../assets/images/fondo.jpg');

const HomePage: React.FC<IRoute> = props => {

    return (
        <div className="homePageContainer container-fluid">
            <div className="row">
                <Navbar />
            </div>
            <div className="row main">
                <div className="bg-text col-12 col-md-6">
                    <div className="bg-title">
                        Online Parking
                    </div>
                    <div className="bg-desc">
                        Online Parking 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;