import { useEffect, useState } from "react";
import { useGlobalState } from "../../context/GlobalState";

function LevelField ({ startingClasses }) {
    const [state, dispatch] = useGlobalState();
    
    const [level, setLevel] = useState(0);

    let startingClass = {};
    if (startingClasses) {
        startingClass = startingClasses.filter((sc) => {
            return sc.id == state.currentCharacter.startingClass
        })[0];
        let startingLevel = -79;
        for (let attr of startingClass.attributes) {
            startingLevel += attr.base_value;
        }
        setLevel(startingLevel);
    }

    const levelTableHeaders = ["Attribute", "Base", "Level", "Total"];
    const mainAttributes = ["Vigor", "Mind", "Endurance", "Strength", 
        "Dexterity", "Intelligence", "Faith", "Arcane"];

    function handleChange (targetAttr, value) {
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
                                        {startingClass?.attributes[index]}
                                    </td>
                                    <td>
                                        <input
                                            id={`level-${attr}`}
                                            type="number"
                                            value={state.currentCharacter.leveledAttributes[attr]}
                                            onChange={(e) => handleChange( attr, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        {
                                            startingClass?.attributes[index]
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