import { Link } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalState';

function LandingPage () {
    const [ state, dispatch ] = useGlobalState();

    return (
        <>
            {!state.currentUser && (
                <>
                    <p>Sign-In</p>
                    <p>or</p>
                    <p><Link to="/register">Register</Link></p>
                </>
            )}
        </>
    );
}

export default LandingPage;