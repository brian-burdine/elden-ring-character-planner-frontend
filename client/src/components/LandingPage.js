import { Link, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalState';
import CharacterButton from './CharacterButton';
import { useEffect, useState } from 'react';
import request from '../services/api.request';

function LandingPage () {
    let navigate = useNavigate();

    const [ state, dispatch ] = useGlobalState();
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        async function getCharacters () {
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
        getCharacters();
    }, [state.currentUser])

    return (
        <>
            {!state.currentUser && (
                <>
                    <p><Link to ="/login">Sign-In</Link></p>
                    <p>or</p>
                    <p><Link to="/register">Register</Link></p>
                </>
            )}
            {state.currentUser && (
                <>
                    <h3>Your Characters:</h3>
                    <ul>
                    {
                        (characters.length > 0 && characters.map((obj) => {
                            return (
                                <li key={obj.id}>
                                    <p>
                                        {`${obj.id}: ${obj.name.length > 0 ? obj.name : "Unnamed Character"}`}
                                    </p>
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
                        || <li><p>No characters found</p></li>
                    }
                    </ul>
                </>
            )}
            <CharacterButton buttonType="add" />
        </>
    );
}

export default LandingPage;