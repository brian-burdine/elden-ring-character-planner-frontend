function CharacterListButton () {
    return (
        <button
                className="nav-link"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCharacterList" 
                aria-controls="offcanvasCharacterList"
            >
                <span className="navbar-toggler-icon"></span>
                Characters
            </button>
    );
}

export default CharacterListButton;