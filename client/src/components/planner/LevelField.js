import { useEffect, useState } from "react";
import { useGlobalState } from "../../context/GlobalState";

function LevelField ({ startingClasses }) {
    const [state, dispatch] = useGlobalState();

    const levelTableHeaders = ["Attribute", "Base", "Level", "Total"];
    const mainAttributes = ["Vigor", "Mind", "Endurance", "Strength", 
        "Dexterity", "Intelligence", "Faith", "Arcane"];

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
            // Calculating levels is going to require a different event handler 
            //  for leaving the input field or something, so I'll just calculate
            //  the starting level for now
            // for (let attr of mainAttributes) {
            //     level += state.currentCharacter.leveledAttributes[attr].value;
            // }
        }
        return level;
    }
    let startingLevel = calculateLevel();

    const [level, setLevel] = useState(startingLevel);

    function handleChange (targetAttr, e) {
        let newValue = Number(e.target.value);
        let baseValue = startingClass.attributes[mainAttributes.indexOf(targetAttr)].base_value;
        if (isNaN(newValue)) {
            newValue = 0;
        }
        let maxLevel = 99 - baseValue;
        if (newValue > maxLevel) {
            newValue = maxLevel;
            e.target.value = newValue;
        }
        dispatch({
            ...state,
            currentCharacter: {
                ...state.currentCharacter,
                leveledAttributes: {
                    ...state.currentCharacter.leveledAttributes,
                    [targetAttr]: {
                        ...state
                            .currentCharacter
                            .leveledAttributes[targetAttr],
                        value: newValue
                    }
                }
            }
        })
        let newLevel = calculateLevel();
        setLevel(newLevel);
    }

    return (
        <div className="level-field">
            <div className="hstack gap-5 justify-content-between">
                <h5>Starting Level</h5>
                <span className="align-self-center">{level}</span>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        {
                            levelTableHeaders.map((header, index) => {
                                return (
                                    <th 
                                        key={index} 
                                        scope="col"
                                        className={index > 0 ? "text-center" : ""}
                                    >{header}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {
                        mainAttributes.map((attr, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{attr}</th>
                                    <td className="text-center">
                                        {startingClass?.attributes[index].base_value}
                                    </td>
                                    <td className="text-center">
                                        <input
                                            id={`level-${attr}`}
                                            type="text"
                                            maxLength="2"
                                            value={state.currentCharacter.leveledAttributes[attr].value}
                                            onChange={(e) => handleChange( attr, e)}
                                        />
                                    </td>
                                    <td className="text-center">
                                        {
                                            startingClass?.attributes[index].base_value
                                                + state.currentCharacter.leveledAttributes[attr].value
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