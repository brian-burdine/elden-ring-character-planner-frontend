import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useGlobalState } from "../../context/GlobalState";
import AuthService from "../../services/auth.service";

function Login () {
    let navigate = useNavigate();

    const [ state, dispatch ] = useGlobalState();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSignIn (e) {
        e.preventDefault();

        AuthService
            .login(username, password)
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

    return (
        <div>
            <form onSubmit={handleSignIn}>
                <div className="v-stack gap-3 my-3">
                    <label htmlFor="login-username">Username: </label>
                    <div className="input-group p-1">
                        <input
                            type="text"
                            id="login-username"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <label htmlFor="login-password">Password: </label>
                    <div className="input-group p-1">
                        <input
                            type="password"
                            id="login-password"
                            name="password"
                            minLength="8"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <input
                    type="submit"
                    value="Sign in"
                    disabled={
                        (username && password) ? false : true
                    }
                />
            </form>
        </div>
    );
}

export default Login;