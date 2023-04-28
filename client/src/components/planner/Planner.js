import { useEffect, useState } from "react";
import { useGlobalState } from "../../context/GlobalState";
import request from "../../services/api.request";
import CharacterNameField from "./CharacterNameField";
import PlannerDropdownItem from "./PlannerDropdownItem";
import CharacterButton from "../CharacterButton";
import LevelField from "./LevelField";
import WeaponsField from "./WeaponsField";

function Planner () {
    const [ state, dispatch ] = useGlobalState();
    const [startingClasses, setStartingClasses] = useState([]);
    const [weapons, setWeapons] = useState([]);

    useEffect(() => {
        async function getERData () {
            function getLocal (storageName) {
                const saved_data = localStorage.getItem(storageName);
                if (saved_data && saved_data.length > 0) {
                    return JSON.parse(saved_data);
                } else {
                    return [];
                }
            }

            function setLocal (storageName, data) {
                localStorage.setItem(storageName, JSON.stringify(data));
            }

            const ERData = [
                {
                    storage: "startingClasses",
                    endpoint: "starting_classes/",
                    setter: setStartingClasses
                }, 
                {
                    storage: "weapons",
                    endpoint:"weapons/",
                    setter: setWeapons
                }
            ]

            for (let table of ERData) {
                let data = getLocal(table.storage);
                if (data.length > 0) {
                    table.setter(data);
                } else {
                    let options = {
                        url: table.endpoint,
                        method: 'GET'
                    }
                    let response = await request(options);
                    table.setter(response.data);
                    setLocal(table.storage, response.data)
                }
            } 
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
                        keyName="startingClass"
                        index={-1}
                        empty={false}  
                    />
                    {
                        startingClasses.length > 0 
                            && <LevelField startingClasses={startingClasses} /> 
                    }
                </div>
                <div className="col-md-5">
                    <h3 className="column-header">Equipment</h3>
                    <h5>Weapons</h5>
                    {
                        weapons.length > 0
                            && <WeaponsField weapons={weapons} />
                    }   
                </div>
                <div className="col-md">
                    <h3 className="column-header">Derived Statistics</h3>
                </div>
            </div>
            {
                !state.currentCharacter.id 
                    && <CharacterButton buttonType="save-new" />
            }
            {
                state.currentCharacter.id 
                    && <CharacterButton buttonType="save-existing" />
            }
        </div>
    )
}

export default Planner;