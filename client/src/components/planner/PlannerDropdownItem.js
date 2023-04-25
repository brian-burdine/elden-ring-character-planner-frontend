import { useGlobalState } from "../../context/GlobalState";

function PlannerDropdownItem ({menuName, sourceArray, keyName}) {
    const [state, dispatch] = useGlobalState();

    function handleClick(key, value) {
        dispatch({
            ...state,
            currentCharacter: {
                ...state.currentCharacter,
                [key]: value
            }
        })
    }

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
                                    onClick={(e) => {handleClick(keyName, obj.id)}}
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

export default PlannerDropdownItem;