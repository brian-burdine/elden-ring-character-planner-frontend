import { useGlobalState } from "../../context/GlobalState";

function CharacterNameField () {
    const [state, dispatch] = useGlobalState();
  
    function handleChange (key, value) {
        dispatch({
            ...state,
            currentCharacter: {
                ...state.currentCharacter,
                [key]: value
            }
        })
    }

    return (
        <div className="character-name-field">
            <label htmlFor="character-name">Name</label>
            <div className="input-group">
                <input 
                    type="text" 
                    id="character-name" 
                    maxLength="16"
                    value={state.currentCharacter.name} 
                    onChange={(e) => handleChange("name", e.target.value)} 
                />
                <span className="input-group-text">
                    {state.currentCharacter?.name?.length} characters (max 16)
                </span>    
            </div>
        </div>
    )
}

export default CharacterNameField;