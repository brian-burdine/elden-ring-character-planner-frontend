function CharacterNameField ({character, setCharacter}) {
  
    function handleChange (key, value) {
        setCharacter({
            ...character,
            [key]: value
        })
    }

    return (
        <>
            <label htmlFor="character-name">Name: </label>
            <input 
                type="text" 
                id="character-name" 
                maxLength="16" 
                onChange={(e) => handleChange("name", e.target.value)} 
            />
            <span>{character?.name?.length} / 16 characters</span>
        </>
    )
}

export default CharacterNameField;