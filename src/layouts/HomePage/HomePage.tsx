import React from 'react'; 

import ModalBase from '../../components/ModalBase/ModalBase';

import IRoute from '../../interfaces/RouteInterface';

const HomePage: React.FC<IRoute> = props => {

    return (
        <ModalBase>
            <div>
                Esto es el child
            </div>
        </ModalBase>
    )
}

export default HomePage;