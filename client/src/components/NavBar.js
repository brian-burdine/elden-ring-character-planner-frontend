import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";
import AuthService from "../services/auth.service";
import CharacterListButton from "./CharacterListButton";

function NavBar() {
    const [state, dispatch] = useGlobalState();
    let navigate = useNavigate();

    function handleLogout () {
        AuthService.logout();
        dispatch({
            ...state,
            currentUser: null,
            currentUserToken: null
        })
    }

    function handleNavigate () {
        navigate('/registration');
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
                        {
                            state.currentUser && (
                                <li className="nav-item">
                                    <CharacterListButton />
                                </li>
                            )
                        }
                        {
                            !state.currentUser && (
                                <li className="nav-item d-flex ms-auto">
                                    <button 
                                        className="nav-link"
                                        onClick={handleNavigate}
                                    >
                                        Sign-In/Register
                                    </button>
                                </li>
                            )
                        }
                        {
                            state.currentUser && (
                                <li className="nav-item d-flex ms-auto">
                                    <button 
                                        className="nav-link" 
                                        onClick={handleLogout}
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;