import { Outlet } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import NavBar from './components/NavBar';

function App () {
    return (
        <GlobalProvider>
            <header>
                <h1>ELDEN RING Character Planner</h1>
                <hr />
                <NavBar />
                <hr />
            </header>
            <main>
                <Outlet />
            </main>
        </GlobalProvider>  
    );
}

export default App;