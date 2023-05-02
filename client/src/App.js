import NavBar from './components/NavBar';
import Planner from './components/planner/Planner';

function App () {
    return (
        <>
            <header>
                <h1>ELDEN RING Character Planner</h1>
                <hr />
                <NavBar />
                <hr />
            </header>
            <main>
                <Planner />
            </main>
        </>  
    );
}

export default App;