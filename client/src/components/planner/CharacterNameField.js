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
        <>
            <label htmlFor="character-name">Name: </label>
            <input 
                type="text" 
                id="character-name" 
                maxLength="16"
                value={state.currentCharacter.name} 
                onChange={(e) => handleChange("name", e.target.value)} 
            />
            <div className="form-text">
                {state.currentCharacter?.name?.length} / 16 characters
            </div>
        </>
    )
}

export default CharacterNameField;