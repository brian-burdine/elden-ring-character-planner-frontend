import { useState } from "react";
import { useGlobalState } from "../../context/GlobalState";
import request from "../../services/api.request";

function Planner () {
    const [ state, dispatch ] = useGlobalState();

    const [character, setCharacter] = useState({
        name: ""
    });

    function handleChange (key, value) {
        setCharacter({
            ...character,
            [key]: value
        })
    }

    return (
        <div className="container" id="planner-page">
            <div className="row m-3">
                <p>The planner page!</p>
                <div className="col-md">
                    <p>Column 1</p>
                    <input type="text" id="character-name" maxLength="16" onChange={(e) => handleChange("name", e.target.value)} />
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