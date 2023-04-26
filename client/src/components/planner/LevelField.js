import { useEffect, useState } from "react";
import { useGlobalState } from "../../context/GlobalState";

function LevelField ({ startingClasses }) {
    const [state, dispatch] = useGlobalState();
    
    // const [level, setLevel] = useState(0);

    // let startingClass = startingClasses.filter((sc) => {
    //     return sc.id == state.currentCharacter.startingClass
    // })[0];
    // let startingLevel = -79;
    // for (let attr of startingClass?.attributes) {
    //     startingLevel += attr.base_value;
    // }
    // setLevel(startingLevel);

    const levelTableHeaders = ["Attribute", "Base", "Level", "Total"];
    const mainAttributes = ["Vigor", "Mind", "Endurance", "Strength", 
        "Dexterity", "Intelligence", "Faith", "Arcane"];

    return (
        <div className="level-field">
            <h5>Level</h5>
            <span className="ms-4">level</span>
            <table className="table">
                <thead>
                    <tr>
                        {
                            levelTableHeaders.map((header, index) => {
                                return (
                                    <th key={index} scope="col">{header}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    )
}

export default LevelField;