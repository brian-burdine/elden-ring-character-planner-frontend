import { useGlobalState } from "../../context/GlobalState";

function PlannerDropdownItem ({menuName, sourceArray, nestedArray, keyName, index, empty}) {
    const [state, dispatch] = useGlobalState();

    function handleClickNoNestNoIndexNoEmp(key, value, e) {
        e.preventDefault();
        dispatch({
            ...state,
            currentCharacter: {
                ...state.currentCharacter,
                [key]: value
            }
        })
    }

    function handleClickNesting(key, index, value, e) {
        e.preventDefault();
        let newArray = state.currentCharacter[key].map((obj, i) => {
            if (i === index) {
                return {
                    ...obj,
                    equipId: value
                };
            } else {
                return obj;
            }
        })
        dispatch({
            ...state,
            currentCharacter: {
                ...state.currentCharacter,
                [key]: newArray
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
                    <div className={`${keyName}-drop-field`}>
                        <label htmlFor={keyName}>
                            {menuName}
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                {
                                    sourceArray.filter((obj) => {
                                        return obj.id == state.currentCharacter[keyName];
                                    })[0]?.name
                                }
                            </span>
                            <button 
                                className="btn dropdown-toggle" 
                                type="button"
                                id={`${keyName}-dropdown`}
                                data-bs-toggle="dropdown"
                            >
                            </button>
                            <ul className="dropdown-menu">
                                {sourceArray.map((obj, i) => {
                                    return (
                                        <li key={i}>
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
                        {/* <h5>
                            {
                                sourceArray.filter((obj) => {
                                    return obj.id == state.currentCharacter[keyName];
                                })[0]?.name
                            }
                        </h5>
                        <div className="dropdown">
                            <button 
                                className="btn btn-secondary dropdown-toggle" 
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                {menuName}
                            </button>
                            <ul className="dropdown-menu">
                                {sourceArray.map((obj, i) => {
                                    return (
                                        <li key={i}>
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
                        </div> */}
                    </div>
                )
            }
        }
    } else {    
        // Nested Array: weapons (inside weaponTypes)
        return (
            <div className={`${keyName}-drop-field m-1`}>
                <label htmlFor={`${keyName}-dropdown-${index}`}>{menuName}</label>
                <div className="input-group">
                    <span className="input-group-text">
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
                    <button 
                        className="btn dropdown-toggle"
                        type="button"
                        id={`${keyName}-dropdown-${index}`}
                        data-bs-toggle="dropdown"
                    >
                    </button>
                    <ul className="dropdown-menu">
                        <li key={-2}>
                            <a 
                                className="dropdown-item" 
                                href="#"
                                onClick={(e) => handleClickNesting(
                                    keyName, index, null, e
                                )}
                            >
                                --Empty--
                            </a>
                        </li>
                        <li key={-1}>
                            <hr className="dropdown-divider" />
                        </li>
                        {
                            nestedArray.map((cat) => {
                                return (
                                    <>
                                        <li key={cat}>
                                            <h6 className="dropdown-header">
                                                {cat}
                                            </h6>
                                        </li>
                                        {
                                            sourceArray.filter((obj) => {
                                                return (
                                                    cat === obj.data.category
                                                )
                                            }).map((obj) => {
                                                return (
                                                    <li key={obj.name}>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={(e) => handleClickNesting(keyName, index, obj.id, e)}
                                                        >
                                                            {obj.name}
                                                        </a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default PlannerDropdownItem;