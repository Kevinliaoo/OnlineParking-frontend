import React from 'react'; 
import IRoute from '../../interfaces/RouteInterface';

import RegisterForm from '../../components/RegisterForm/RegisterForm';

const RegisterPage: React.FC<IRoute> = props => {

    const handleRegister = () => {
        const { history } = props as any; 
        history.push('/login');
    }

    return (
        <div className="container-fluid" id="loginComponent">
            <div className="row">
                <RegisterForm handleRegister={handleRegister} />
            </div>
        </div>
    )
}

export default RegisterPage;