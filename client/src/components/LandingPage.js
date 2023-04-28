import { Link, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalState';
import CharacterButton from './CharacterButton';

function LandingPage () {
    let navigate = useNavigate();

    const [ state, dispatch ] = useGlobalState();

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
            <CharacterButton buttonType="add" />
        </>
    );
}

export default LandingPage;