import Login from "./Login";
import Register from "./Register";
import NavBar from "../NavBar";

function Registration () {
    return (
        <>
            <header>
                <h1>ELDEN RING Character Planner</h1>
                <hr />
                <NavBar />
                <hr />
            </header>
            <main>
                <div className="container registration-page">
                    <div className="row justify-content-evenly">
                        <div className="col-md-5 mb-5">
                            <h3>Sign-In</h3>
                            <h5>Have an account? Sign in:</h5>
                            <Login />
                        </div>
                        <div className="col-md-5 mb-5">
                            <h3>Register</h3>
                            <h5>New here? Make an account:</h5>
                            <Register />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Registration;