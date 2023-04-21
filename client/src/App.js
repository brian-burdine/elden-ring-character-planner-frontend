import { Outlet } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import LandingPage from './components/LandingPage';

function App () {
    return (
        <GlobalProvider>
            <h1>Elden Ring Character Planner</h1>
            <hr />
            <LandingPage />
            <Outlet />
        </GlobalProvider>  
    );
}

export default App;