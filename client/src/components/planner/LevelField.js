import { useEffect, useState } from "react";
import { useGlobalState } from "../../context/GlobalState";

function LevelField ({ startingClasses }) {
    const [state, dispatch] = useGlobalState();

    let startingClass = {};
    if (startingClasses.length > 0) {
        startingClass = startingClasses.filter((sc) => {
            return sc.id == state.currentCharacter.startingClass
        })[0];
    }
    
    function calculateLevel () {
        let level = -79;
        if (startingClass) {    
            for (let attr of startingClass.attributes) {
                level += attr.base_value;
            }
        }
        return level;
    }
    let startingLevel = calculateLevel();

    const [level, setLevel] = useState(startingLevel);

    const levelTableHeaders = ["Attribute", "Base", "Level", "Total"];
    const mainAttributes = ["Vigor", "Mind", "Endurance", "Strength", 
        "Dexterity", "Intelligence", "Faith", "Arcane"];

    function handleChange (targetAttr, e) {
        let value = Number(e.target.value);
        if (isNaN(value)) {
            value = 0;
        }
        let maxLevel = 99 - state.currentCharacter.leveledAttributes[targetAttr];
        if (value > maxLevel) {
            value = maxLevel;
            e.target.value = value;
        }
        dispatch({
            ...state,
            currentCharacter: {
                ...state.currentCharacter,
                leveledAttributes: {
                    ...state.currentCharacter.leveledAttributes,
                    [targetAttr]: value
                }
            }
        })
        let newLevel = calculateLevel();
        setLevel(newLevel);
    }

    return (
        <div className="level-field">
            <h5>Level</h5>
            <span className="ms-4">{level}</span>
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
                <tbody>
                    {
                        mainAttributes.map((attr, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{attr}</th>
                                    <td>
                                        {startingClass?.attributes[index].base_value}
                                    </td>
                                    <td>
                                        <input
                                            id={`level-${attr}`}
                                            type="text"
                                            maxlength="2"
                                            value={state.currentCharacter.leveledAttributes[attr]}
                                            onChange={(e) => handleChange( attr, e)}
                                        />
                                    </td>
                                    <td>
                                        {
                                            startingClass?.attributes[index].base_value
                                                + state.currentCharacter.leveledAttributes[attr]
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default LevelField;