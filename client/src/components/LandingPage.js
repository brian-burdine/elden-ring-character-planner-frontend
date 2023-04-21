import { Link, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalState';

function LandingPage () {
    let navigate = useNavigate();

    const [ state, dispatch ] = useGlobalState();

    function handleAddACharacter (e) {
        navigate("/planner");
    }

    return (
        <>
            {!state.currentUser && (
                <>
                    <p><Link to ="/login">Sign-In</Link></p>
                    <p>or</p>
                    <p><Link to="/register">Register</Link></p>
                </>
            )}
            {state.currentUser && (
                <>
                    <h3>Your Characters:</h3>
                </>
            )}
            <button id='new-character' onClick={handleAddACharacter}>+</button>
            <label htmlFor='new-character'>Create a Character</label>
        </>
    );
}

export default LandingPage;