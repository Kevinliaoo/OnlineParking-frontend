import React from 'react'; 

import './styles.css'

const Loginform: React.FC = () => {
    return (
        <React.Fragment>
            <form className="col-10 col-md-6 col-lg-4 offset-1 offset-md-3 offset-lg-4" id="loginForm">
                <h2 className="loginTitle">Login</h2>
                <input id="usernameInput" className="loginInput" placeholder="Username: "></input>
                <input id="pswInput" className="loginInput" placeholder="Password: "></input>
                <div className="loginButtonField">
                    <button type="button" className="loginBtn">Login</button>
                    <a className="signupLink">Sign up for Online Parking</a>
                </div>
            </form>
        </React.Fragment>
    )
}

export default Loginform;