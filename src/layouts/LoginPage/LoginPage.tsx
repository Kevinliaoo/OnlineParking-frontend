import React from 'react'; 
import IRoute from '../../interfaces/RouteInterface';

import Loginform from '../../components/Loginform/Loginform';

import LSFunctions from '../../utils/localStorage';

import './styles.css';

const LoginPage: React.FC<IRoute> = props => {

    React.useEffect(() => {
        LSFunctions.deleteJwtToken();
    }, [])

    const handleLogin = (): void => {
        const { history } = props as any;
        history.push('/map')
    }
    
    return (
        <div className="container-fluid" id="loginComponent">
            <div className="row">
                <Loginform onLogin={handleLogin} />
            </div>
        </div>
    )
}

export default LoginPage