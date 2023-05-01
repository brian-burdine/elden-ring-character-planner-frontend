import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import { useGlobalState } from "../../context/GlobalState";
import AuthService from '../../services/auth.service';

/*
    Register
    This component serves as the registration page for the application
    At the moment, the only fields for the user model I'm concerned with are:
        username
        password
        e-mail address
*/

function Register () {
    let navigate = useNavigate();

    const [state, dispatch] = useGlobalState();

    // Create a user object to use for the registration request
    const [user, setUser] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
        email: "",
        firstName: "",
        lastName: ""
    })

    // Incorporates text entered in form fields into user object
    function handleChange (key, value) {
        setUser({
            ...user,
            [key]: value
          })
    }

    // When user submits form, blocks the normal form submission behavior and
    // instead calls register function with user object to request a new user
    // be added and log-in as that user
    function handleRegister (e) {
        e.preventDefault();
        AuthService
            .register(user)
            .then(async (resp) => {
                let data = jwtDecode(resp.access)
                await dispatch({
                    ...state,
                    currentUserToken: resp.access,
                    currentUser: data
                })
                navigate('/planner')
            });
    }

    // Create a form to enter username, password, and e-mail
    // Form submission is disabled until all fields have an entry and password
    //  meets requirements (minimum 8 characters and confirmed with re-entry)
    return (
        <div>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input 
                        type='text'
                        id='username'
                        name='username'
                        onChange={(e) => handleChange('username', e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password (At least 8 characters long): </label>
                    <input 
                        type='password'
                        id='password'
                        name='password'
                        onChange={(e) => handleChange('password', e.target.value)}
                        minLength="8"
                        required 
                    />
                </div>
                <div>
                    <label htmlFor='password-confirm'>Confirm Password: </label>
                    <input 
                        type='password'
                        id='password-confirm'
                        name='password'
                        onChange={(e) => handleChange('passwordConfirm', e.target.value)}
                        minLength="8"
                        required 
                    />
                </div>
                <div>
                    <label htmlFor='email'>E-mail Address: </label>
                    <input 
                        type='text'
                        id='email'
                        name='email'
                        onChange={(e) => handleChange('email', e.target.value)}
                        required 
                    />
                </div>
                <input 
                    type='submit'
                    value='Register'
                    disabled={(
                        user.username &&
                        user.password &&
                        user.password.length >= 8 &&
                        user.password === user.passwordConfirm &&
                        user.email
                    ) ? false : true}
                />
            </form>
        </div>
    );
}

export default Register;