import { useGlobalState } from '../context/GlobalState';
import CharacterButton from './CharacterButton';
import { useEffect, useState } from 'react';
import request from '../services/api.request';

function CharacterList () {
    
    const [ state, dispatch ] = useGlobalState();
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        async function getCharacters () {
            if (state.currentUser) {
                try {
                    const response = await request({
                        url: 'characters/',
                        method: 'GET'
                    });
                    setCharacters(response.data);
                } catch (error) {
                    return error.response;
                }
            }
        }
        getCharacters();
    }, [state.currentUser])

    
    return (
        <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasCharacterList"
            aria-labelledby="offcanvasCharacterListLabel"
        >
            <div className="offcanvas-header">
                <h3 
                    className="offcanvas-title" 
                    id="offcanvasCharacterListLabel"
                >
                    Characters
                </h3>
                <button 
                    type="button" 
                    className="btn-close" 
                    data-bs-dismiss="offcanvas" 
                    aria-label="Close"
                >            
                </button>
            </div>
            <div className="offcanvas-body">
                <h3>Your Characters:</h3>
                <ul>
                {
                    (characters.length > 0 && characters.map((obj) => {
                        return (
                            <li key={obj.id}>
                                <h5>
                                    {`${obj.id}: ${obj.name.length > 0 ? obj.name : "Unnamed Character"}`}
                                </h5>
                                <div className='hstack gap-3'>
                                    <CharacterButton 
                                        buttonType="edit"
                                        character={obj}
                                    />
                                    <CharacterButton 
                                        buttonType="del"
                                        character={obj}
                                        characters={characters}
                                        setCharacters={setCharacters}
                                    />
                                </div>
                            </li>
                        )
                    }))
                    || <li><h5>No characters found</h5></li>
                }
                </ul>
            </div>
        </div>
    );
}

export default CharacterList;