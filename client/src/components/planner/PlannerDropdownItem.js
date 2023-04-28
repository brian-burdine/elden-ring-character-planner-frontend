import { useGlobalState } from "../../context/GlobalState";

function PlannerDropdownItem ({menuName, sourceArray, nestedArray, keyName, index, empty}) {
    const [state, dispatch] = useGlobalState();

    function handleClickNoNestNoIndexNoEmp(key, value, event) {
        event.preventDefault();
        dispatch({
            ...state,
            currentCharacter: {
                ...state.currentCharacter,
                [key]: value
            }
        })
    }

    if (!nestedArray) {
        // Not Nested: startingClass, armor, talismans, greatRune, spells 
        if (index > -1) {
            // Indexed (array): armor, talismans, spells
            // return ()
        } else {
            // Not Indexed: startingClass, greatRune
            if (empty) {
                //Emptyable: greatRune
                // return ()
            } else {
                //Not Emptyable: startingClass
                return (
                    <div className="drop-field">
                        <span>
                            {
                                sourceArray.filter((obj) => {
                                    return obj.id == state.currentCharacter[keyName];
                                })[0]?.name
                            }
                        </span>
                        <div className="dropdown">
                            <button 
                                className="btn btn-secondary dropdown-toggle" 
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                {menuName}
                            </button>
                            <ul className="dropdown-menu">
                                {sourceArray.map((obj, index) => {
                                    return (
                                        <li key={index}>
                                            <a 
                                                className="dropdown-item"
                                                href="#"
                                                onClick={(e) => {handleClickNoNestNoIndexNoEmp(keyName, obj.id, e)}}
                                            >
                                                {obj.name}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                )
            }
        }
    } else {    
        // Nested Array: weapons (inside weaponTypes)
        return (
            <div className="drop-field">
                <span>
                    {
                        (
                            !state.currentCharacter[keyName][index].equipId
                                && "--Empty--"
                        )
                        || 
                        (
                            sourceArray.filter((obj) => {
                                return obj.id == state.currentCharacter[keyName][index].equipId
                            })[0]?.name
                        )
                    }
                </span>
            </div>
        )
    }
}

export default PlannerDropdownItem;