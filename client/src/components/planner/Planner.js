import { useEffect, useState } from "react";
import { useGlobalState } from "../../context/GlobalState";
import request from "../../services/api.request";
import CharacterNameField from "./CharacterNameField";
import PlannerDropdownItem from "./PlannerDropdownItem";
import CharacterButton from "../CharacterButton";

function Planner () {
    const [ state, dispatch ] = useGlobalState();
    const [startingClasses, setStartingClasses] = useState([]);

    useEffect(() => {
        async function getERData () {
            let options = {
                url: 'starting_classes/',
                method: 'GET'
            }
            let response = await request(options);
            setStartingClasses(response.data);
        }
        getERData();
    }, [])

    return (
        <div className="container" id="planner-page">
            <div className="row m-3">
                <p>The planner page!</p>
                <div className="col-md">
                    <h3 className="column-header">Basic Characteristics</h3>
                    <CharacterNameField />
                    <PlannerDropdownItem 
                        menuName="Starting Class"
                        sourceArray={startingClasses} 
                        keyName="starting_class"  
                    />
                </div>
                <div className="col-md-5">
                    <h3 className="column-header">Equipment</h3>
                </div>
                <div className="col-md">
                    <h3 className="column-header">Derived Statistics</h3>
                </div>
            </div>
            <CharacterButton buttonType="save" />
        </div>
    )
}

export default Planner;