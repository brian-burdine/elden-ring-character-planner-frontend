import { useState } from "react";
import { useGlobalState } from "../context/GlobalState";
import request from "../services/api.request";

function Planner () {
    const [ state, dispatch ] = useGlobalState();

    const [name, setName] = useState("");

    function handleNameChange (e) {}

    return (
        <p>The planner page!</p>
    )
}

export default Planner;