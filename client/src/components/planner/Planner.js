import { useState } from "react";
import { useGlobalState } from "../../context/GlobalState";
import request from "../../services/api.request";
import CharacterNameField from "./Name";

function Planner () {
    const [ state, dispatch ] = useGlobalState();

    const [character, setCharacter] = useState({
        name: ""
    });

    return (
        <div className="container" id="planner-page">
            <div className="row m-3">
                <p>The planner page!</p>
                <div className="col-md">
                    <p>Column 1</p>
                    <CharacterNameField 
                        character={character} 
                        setCharacter={setCharacter} 
                    />
                </div>
                <div className="col-md-5">
                    <span>Column 2</span>
                </div>
                <div className="col-md">
                    <span>Column 3</span>
                </div>
            </div>
            <button>Save Character</button>
        </div>
    )
}

export default Planner;