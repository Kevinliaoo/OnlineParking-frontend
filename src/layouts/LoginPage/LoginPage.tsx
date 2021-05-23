import React from 'react'; 
import IRoute from '../../interfaces/route';

import Loginform from '../../components/Loginform/Loginform';

import './styles.css';

const LoginPage: React.FC<IRoute> = props => {

    // Agregarlo onsubmit a form
    // No se si hay que cambiar el tipo del button a submit 
    return (
        <div className="container-fluid" id="loginComponent">
            <div className="row">
                <Loginform />
            </div>
        </div>
    )
}

export default LoginPage