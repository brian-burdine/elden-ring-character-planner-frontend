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
                navigate('/');
            });
    }

    // Create a form to enter username, password, and e-mail
    // Form submission is disabled until all fields have an entry and password
    //  meets requirements (minimum 8 characters and confirmed with re-entry)
    return (
        <div>
            <form onSubmit={handleRegister}>
                <div className="v-stack gap-3 my-2">
                    <label htmlFor='reg-username'>Username: </label>
                    <div className="input-group p-1">
                        <input 
                            type='text'
                            id='reg-username'
                            name='username'
                            onChange={(e) => handleChange('username', e.target.value)}
                            required 
                        />
                    </div>
                    <label htmlFor='reg-password'>Password: </label>
                    <div className="input-group p-1">
                        <input
                            type='password'
                            id='reg-password'
                            name='password'
                            onChange={(e) => handleChange('password', e.target.value)}
                            minLength="8"
                            required 
                        />
                    </div>
                    <div className="form-text">At least 8 characters long</div>
                    <label htmlFor='reg-password-confirm'>Confirm Password: </label>
                    <div className="input-group p-1">
                        <input
                            type='password'
                            id='reg-password-confirm'
                            name='password-confirm'
                            onChange={(e) => handleChange('passwordConfirm', e.target.value)}
                            minLength="8"
                            required 
                        />
                    </div>
                    <label htmlFor='reg-email'>E-mail Address: </label>
                    <div className="input-group p-1">
                        <input 
                            type='text'
                            id='reg-email'
                            name='email'
                            onChange={(e) => handleChange('email', e.target.value)}
                            required 
                        />
                    </div>
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