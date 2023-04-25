import { useNavigate } from "react-router-dom";
import request from "../services/api.request";
import { useGlobalState } from "../context/GlobalState";

function CharacterButton({ buttonType }) {
  let navigate = useNavigate();
  const [state, dispatch] = useGlobalState();

  function handleAddACharacter () {
    dispatch({
      ...state,
      currentCharacter: {
        id: "",
        name: ""
      }
    })
    navigate("/planner");
  }
  
  // This function saves character information to the the backend if logged in.
  // If this is the first time the function is called for a new character,
  //  a POST request is sent with all available information, and then the id
  //  of the newly-created entry in the characters table is associated with 
  //  the current character object.
  // Otherwise, a PUT request is sent to store the current state of the
  //  character
  // For all users, logged in or not, the current character is stored in local
  //  storage.
  async function handleSave() {
    if (state.currentUser) {
      if (state.currentCharacter?.id.length === 0) {
        try {
          const response = await request({
            url: 'characters/',
            method: 'POST',
            data: {
              "name": state.currentCharacter.name,
              "owner": state.currentUser.user_id
            },
          });
          dispatch({
            ...state,
            currentCharacter: {
              ...state.currentCharacter,
              id: response.data.id
            }
          });
        } catch (error) {
          return error.response;
        }
      }
      else {
        try {
          const response = await request({
            url: 'characters/' + state.currentCharacter.id + '/',
            method: 'PUT',
            data: {
              "name": state.currentCharacter.name,
              "owner": state.currentUser.user_id
            },
          })
        } catch (error) {
          return error.response;
        }
      }
    }
    localStorage.setItem('character', JSON.stringify(state.currentCharacter));
  }

  if (buttonType === "add") {
    return (
      <button 
        className="btn add-button"
        onClick={handleAddACharacter}
      >
        +
      </button>
    )
  }
  else if (buttonType === "save") {
    return (
      <button
        className="btn btn-secondary save-button"
        onClick={handleSave}
      >
        Save Character
      </button>
    )
  }
}

export default CharacterButton;