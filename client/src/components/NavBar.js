import { Link } from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";
import AuthService from "../services/auth.service";

function NavBar() {
    const [state, dispatch] = useGlobalState();

    function handleLogout () {
        AuthService.logout();
        dispatch({
            ...state,
            currentUser: null,
            currentUserToken: null
        })
    }

    return (
        <nav className="navbar navbar-expand-md">
            <div className="container-fluid">
                <button 
                    className="navbar-toggler" 
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar-content" 
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar-content">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/">Characters</Link>
                        </li>
                        {
                            !state.currentUser && (
                                <li className="nav-item">
                                    <Link to="/login">Sign In</Link>
                                </li>
                            )
                        }
                        {
                            !state.currentUser && (
                                <li className="nav-item">
                                    <Link to="register">Register</Link>
                                </li>
                            )
                        }
                        {
                            state.currentUser && (
                                <button 
                                    className="nav-link" 
                                    onClick={handleLogout}
                                >
                                    Sign Out
                                </button>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;