import React from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

import LSFunctions from '../../utils/localStorage';
import config from '../../utils/config';

import User from '../../objects/User';

import './styles.css';

interface IProps {
    onLogin: () => void;
}

const Loginform: React.FC<IProps> = props => {
    LSFunctions.deleteJwtToken();

    const [ form, setValues ] = React.useState<User>({
        username: '', 
        password: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({
            ...form, 
            [event.target.name]: event.target.value.trim(),
        })
    }

    const handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        const path: string = '/auth/login'; 
        const endpoint: string = `${config.API.URL}${path}`;
        console.log(endpoint)
        
        axios.post(endpoint, form)
            .then((response) => {
                LSFunctions.saveJwtToken(response.data.accessToken); 
                props.onLogin();
            })
            .catch(e => {
                alert('Incorrect username or password')
            })
    }

    return (
        <React.Fragment>
            <form 
                className="col-10 col-md-6 col-lg-4 offset-1 offset-md-3 offset-lg-4" 
                id="loginForm"
                onSubmit={handleSubmit}
            >
                <h2 className="loginTitle">Login</h2>
                <input 
                    id="usernameInput" 
                    className="loginInput" 
                    placeholder="Username: " 
                    name="username"
                    onChange={handleChange}
                />
                <input 
                    id="pswInput" 
                    className="loginInput" 
                    placeholder="Password: "
                    name="password"
                    type="password"
                    onChange={handleChange}
                />
                <div className="loginButtonField">
                    <button type="submit" className="loginBtn">Login</button>
                    <Link className="signupLink" to="/register">Sign up for Online Parking</Link>
                </div>
            </form>
        </React.Fragment>
    )
}

export default Loginform;