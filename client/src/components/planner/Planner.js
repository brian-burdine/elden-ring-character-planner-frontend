import { useState } from "react";
import { useGlobalState } from "../../context/GlobalState";
import request from "../../services/api.request";
import CharacterNameField from "./CharacterNameField";
import CharacterButton from "../CharacterButton";

function Planner () {
    const [ state, dispatch ] = useGlobalState();

    return (
        <div className="container" id="planner-page">
            <div className="row m-3">
                <p>The planner page!</p>
                <div className="col-md">
                    <p>Column 1</p>
                    <CharacterNameField />
                </div>
                <div className="col-md-5">
                    <span>Column 2</span>
                </div>
                <div className="col-md">
                    <span>Column 3</span>
                </div>
            </div>
            <CharacterButton buttonType="save" />
        </div>
    )
}

export default Planner;