import React from 'react'; 
import IPage from '../../interfaces/route';

import './styles.css';

const LoginPage: React.FC<IPage> = props => {

    // Agregarlo onsubmit a form
    // No se si hay que cambiar el tipo del button a submit 
    return (
        <div className="container-fluid" id="loginComponent">
            <div className="row">
                <form className="col-10 col-md-6 col-lg-4 offset-1 offset-md-3 offset-lg-4" id="loginForm">
                    <h2 className="loginTitle">Login</h2>
                    <input id="usernameInput" className="loginInput" placeholder="Username: "></input>
                    <input id="pswInput" className="loginInput" placeholder="Password: "></input>
                    <div className="loginButtonField">
                        <button type="button" className="loginBtn">Login</button>
                        <a className="signupLink">Sign up for Online Parking</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage