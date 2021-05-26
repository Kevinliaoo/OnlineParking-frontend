import React from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

import config from '../../utils/config';
import LSFunctions from '../../utils/localStorage';

interface IRegisterProps {
    handleRegister: () => void;
}

interface IRegisterForm {
    firstName: string; 
    lastName: string; 
    username: string; 
    password: string; 
    repeatpsw?: string; 
}

const RegisterForm: React.FC<IRegisterProps> = props => {

    LSFunctions.deleteJwtToken();

    const [form, setValues] = React.useState<IRegisterForm>({
        firstName: '',
        lastName: '', 
        username: '', 
        password: '',
        repeatpsw: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({
            ...form, 
            [event.target.name]: event.target.value.trim(),
        })
    }
 
    const handleSubit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        if (form.password !== form.repeatpsw) {
            return alert('Passwords does not match');
        }
        delete form.repeatpsw;

        const path: string = '/users'; 
        const endpoint = `${config.API.URL}${path}`

        axios.post(endpoint, form)
            .then(() => {
                props.handleRegister();
            })
            .catch(e => {
                console.log(e);
                alert('Internal server error')
            })
    }

    return (
        <React.Fragment>
            <form 
                className="col-10 col-md-6 col-lg-4 offset-1 offset-md-3 offset-lg-4" 
                id="loginForm"
                onSubmit={handleSubit}
            >
                <h2 className="loginTitle">Register to Online Parking</h2>
                <input 
                    id="fnameInput" 
                    className="loginInput" 
                    placeholder="First name: "
                    name="firstName"
                    onChange={handleChange}
                ></input>
                <input 
                    id="lnameInput" 
                    className="loginInput" 
                    placeholder="Last name: "
                    name="lastName"
                    onChange={handleChange}
                ></input>
                <input 
                    id="usernameInput" 
                    className="loginInput" 
                    placeholder="Username: "
                    name="username"
                    onChange={handleChange}
                ></input>
                <input 
                    id="pswInput" 
                    className="loginInput" 
                    placeholder="Password: "
                    type="password"
                    name="password"
                    onChange={handleChange}
                ></input>
                <input 
                    id="rpPswInput" 
                    className="loginInput" 
                    placeholder="Repeat password: "
                    type="password"
                    name="repeatpsw"
                    onChange={handleChange}
                ></input>

                <div className="loginButtonField">
                    <button className="loginBtn">Register</button>
                    <Link className="signupLink" to="/login">Go back</Link>
                </div>
            </form>
        </React.Fragment>
    )
}

export default RegisterForm;