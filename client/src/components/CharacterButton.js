import { useNavigate } from "react-router-dom";
import request from "../services/api.request";
import { useGlobalState } from "../context/GlobalState";

function CharacterButton({ buttonType, character, characters, setCharacters }) {
  let navigate = useNavigate();
  const [state, dispatch] = useGlobalState();

  const mainAttributes = ["Vigor", "Mind", "Endurance", "Strength", 
        "Dexterity", "Intelligence", "Faith", "Arcane"];

  function handleReset () {
    dispatch({
      ...state,
      currentCharacter: {
        id: null,
        name: "",
        startingClass: 1,
        leveledAttributes: {
          "Vigor": {
            id: null,
            value: 0
          },
          "Mind": {
            id: null,
            value: 0
          },
          "Endurance": {
            id: null,
            value: 0
          },
          "Strength": {
            id: null,
            value: 0
          },
          "Dexterity": {
            id: null,
            value: 0
          },
          "Intelligence": {
            id: null,
            value: 0
          },
          "Faith": {
            id: null,
            value: 0
          },
          "Arcane": {
            id: null,
            value: 0
          }
        },
        weapons: [
          {
            id: null,
            equipId: null
          }, 
          {
            id: null,
            equipId: null
          }, 
          {
            id: null,
            equipId: null
          }, 
          {
            id: null,
            equipId: null
          }, 
          {
            id: null,
            equipId: null
          }, 
          {
            id: null,
            equipId: null
          }
        ]
      }
    })
    localStorage.removeItem("character");
  }
  
  async function characterMainPost () {
    try {
      const response = await request({
        url: 'characters/',
        method: 'POST',
        data: {
          "name": state.currentCharacter.name,
          "starting_class": state.currentCharacter.startingClass,
          "owner": state.currentUser.user_id
        },
      });
      return response.data.id;
    } catch (error) {
      return error.response;
    }
  }

  async function characterMainPut () {
    try {
      const response = await request({
        url: 'characters/' + state.currentCharacter.id + '/',
        method: 'PUT',
        data: {
          "name": state.currentCharacter.name,
          "starting_class": state.currentCharacter.startingClass,
          "owner": state.currentUser.user_id
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async function characterAttributePost (characterId) {
    let charAttrIds = [];
    for (let i=1; i <= mainAttributes.length; i++) {
      try {
        const response = await request({
          url: 'character_attributes/',
          method: 'POST',
          data: {
            "character": characterId,
            "attribute": i,
            "value": state
              .currentCharacter
              .leveledAttributes[mainAttributes[i - 1]]
              .value
          }
        });
        charAttrIds.push(response.data.id);
        dispatch({
          ...state,
          currentCharacter: {
            ...state.currentCharacter,
            leveledAttributes: {
              ...state.currentCharacter.leveledAttributes,
              [mainAttributes[i - 1]]: {
                ...state
                  .currentCharacter
                  .leveledAttributes[mainAttributes[i - 1]],
                id: response.data.id
              }
            }
          }
        });
      } catch (error) {
        return error.response;
      }
    }
    return charAttrIds;
  }

  async function characterAttributePatch () {
    for (let i=1; i <= mainAttributes.length; i++) {
      try {
        const response = await request({
          url: 'character_attributes/' 
            + state
              .currentCharacter
              .leveledAttributes[mainAttributes[i - 1]]
              .id 
            + '/',
          method: 'PATCH',
          data: {
            "value": state
              .currentCharacter
              .leveledAttributes[mainAttributes[i - 1]]
              .value
          }
        });
      } catch (error) {
        return error.response;
      }
    }
  }

  async function characterWeaponUpdate (characterId) {
    let charWeaponsIds = [];
    for (let i=0; i < state.currentCharacter.weapons.length; i++) {
      if (!state.currentCharacter.weapons[i].id 
          && !state.currentCharacter.weapons[i].equipId) {
        // Weapon slot was empty and stayed empty, make no changes
            charWeaponsIds.push(null);
      } else if (!state.currentCharacter.weapons[i].id
          && state.currentCharacter.weapons[i].equipId) {
        // Weapon was added to a slot that was empty, create a new record
        try {
          const response = await request({
            url: 'character_weapons/',
            method: 'POST',
            data: {
              character: characterId,
              armament: state.currentCharacter.weapons[i].equipId,
              slot: i + 1
            }
          });
          charWeaponsIds.push(response.data.id);
        } catch (error) {
          return error.response;
        }
      } else if (state.currentCharacter.weapons[i].id 
          && !state.currentCharacter.weapons[i].equipId) {
        // Weapon previously equipped was removed, delete record
        try {
          const response = await request({
            url: 'character_weapons/'
              + state.currentCharacter.weapons[i].id
              + '/',
            method: 'DELETE'
          });
          charWeaponsIds.push(null);
        } catch (error) {
          return error.response;
        }
      } else {
        // Weapon was equipped, may or may not have changed, update record
        // TODO: Figure out how to skip this if the record was unchanged
        // (Have to track what equipId was last posted somehow)
        try {
          const response = await request({
            url: 'character_weapons/'
              + state.currentCharacter.weapons[i].id
              + '/',
            method: 'PUT',
            data: {
              character: characterId,
              armament: state.currentCharacter.weapons[i].equipId,
              slot: i + 1
            }
          });
          charWeaponsIds.push(response.data.id);
        } catch (error) {
          return error.response;
        }
      }
    }
    return charWeaponsIds;
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
  async function handleNewSave() {
    if (state.currentUser) {
      const newCharId = await characterMainPost();
      const newCharAttrIds = await characterAttributePost(newCharId);
      const newCharArmaIds = await characterWeaponUpdate(newCharId);
      console.log(newCharArmaIds);

      let newCharArmaArray = state.currentCharacter.weapons.map((obj, i) => {
        return {
          ...obj,
          id: newCharArmaIds[i]
        }
      })

      await dispatch({
        ...state,
        currentCharacter: {
          ...state.currentCharacter,
          id: newCharId,
          leveledAttributes: {
            ...state.currentCharacter.leveledAttributes,
            [mainAttributes[0]]: {
              ...state.currentCharacter.leveledAttributes["Vigor"],
              id: newCharAttrIds[0]
            },
            [mainAttributes[1]]: {
              ...state.currentCharacter.leveledAttributes["Mind"],
              id: newCharAttrIds[1]
            },
            [mainAttributes[2]]: {
              ...state.currentCharacter.leveledAttributes["Endurance"],                
              id: newCharAttrIds[2]
            },
            [mainAttributes[3]]: {
              ...state.currentCharacter.leveledAttributes["Strength"],
              id: newCharAttrIds[3]
            },
            [mainAttributes[4]]: {
              ...state.currentCharacter.leveledAttributes["Dexterity"],                
              id: newCharAttrIds[4]
            },
            [mainAttributes[5]]: {
              ...state.currentCharacter.leveledAttributes["Intelligence"],
              id: newCharAttrIds[5]
            },
            [mainAttributes[6]]: {
              ...state.currentCharacter.leveledAttributes["Faith"],
              id: newCharAttrIds[6]
            },
            [mainAttributes[7]]: {
              ...state.currentCharacter.leveledAttributes["Arcane"],
              id: newCharAttrIds[7]
            }
          },
          weapons: newCharArmaArray
        }
      })
    }
    localStorage.setItem('character', JSON.stringify(state.currentCharacter));
    alert(`Character ${state.currentCharacter.name ? state.currentCharacter.name + " " : " "}saved!`);
  }

  async function handleExistingSave () {
    if (state.currentUser) {
      await characterMainPut();
      await characterAttributePatch();
      let newCharArmaIds = await characterWeaponUpdate(state.currentUser.user_id)

      let newCharArmaArray = state.currentCharacter.weapons.map((obj, i) => {
        return {
          ...obj,
          id: newCharArmaIds[i]
        }
      })

      await dispatch({
        ...state,
        currentCharacter: {
          ...state.currentCharacter,
          weapons: newCharArmaArray
        }
      })
    }
    localStorage.setItem('character', JSON.stringify(state.currentCharacter));
    alert(`Character ${state.currentUser ? state.currentCharacter.id : ""} saved!`);
  }

  // When an 'Edit' button is clicked, the character associated with that button
  //  needs to be put into the global state. Top-level information for that
  //  character already has been fetched and is stored in the 'character' 
  //  object passed to this function, but information from the bridge tables
  //  to a character's many-to-many relationships needs to fetched and formatted
  //  to match the global state currentCharacter object's structure
  async function handleEditACharacter (character) {
    let currCharAttrsList = [];
    let currCharAttrsObj = {};
    let currCharWeaps = [];
    let currCharWeapsSorted = [];

    // RETRIEVING
    // get the levels for each attribute for a character
    try {
      const response = await request({
        url: 'character_attributes/',
        method: 'GET'
      });
      currCharAttrsList = response.data.filter((obj) => {
        return obj.character === character.id;
      });
    } catch (error) {
      return error.response;
    }

    // get the weapons the character has equipped and what slot they're in
    try {
      const response = await request({
        url: 'character_weapons/',
        method: 'GET'
      });
      // TODO: Check and make sure this is how this looks
      currCharWeaps = response.data.filter((obj) => {
        return obj.character === character.id;
      });
    } catch (error) {
      return error.response;
    }

    // FORMATTING
    // Assign attributes to correct object
    for (let i = 0; i < mainAttributes.length; i++) {
      currCharAttrsObj[mainAttributes[i]] = {
        id: null,
        value: 0
      };
    }
    for (let i = 0; i < currCharAttrsList.length; i++) {
      let attr = mainAttributes[currCharAttrsList[i].attribute - 1];
      currCharAttrsObj[attr].id = currCharAttrsList[i].id;
      currCharAttrsObj[attr].value = currCharAttrsList[i].value;
    }

    // Assign weapons to correct slot
    for (let i = 0; i < 6; i++) {
      currCharWeapsSorted.push({
        id: null,
        equipId: null
      });
    }
    for (let i = 0; i < currCharWeaps.length; i++) {
      let slot = currCharWeaps[i].slot - 1;
      currCharWeapsSorted[slot].id = currCharWeaps[i].id;
      currCharWeapsSorted[slot].equipId = currCharWeaps[i].armament;
    }

    await dispatch({
      ...state,
      currentCharacter: {
        ...state.currentCharacter,
        id: character.id,
        name: character.name,
        startingClass: character.starting_class,
        leveledAttributes: currCharAttrsObj,
        weapons: currCharWeapsSorted
      }
    });
    localStorage.setItem('character', JSON.stringify(state.currentCharacter));
    navigate("/planner");
  }

  async function handleDelete (character, characters, setCharacters) {
    const response = await request({
      url: 'characters/' + character.id + '/',
      method: 'DELETE'
    });
    let newCharacters = characters.filter((obj) => {
      return obj.id !== character.id;
    });
    setCharacters(newCharacters);
  }

  if (buttonType === "reset") {
    return (
      <button 
        className="btn btn-secondary reset-button"
        type="button"
        onClick={handleReset}
      >
        Reset
      </button>
    )
  }
  else if (buttonType === "save-new") {
    return (
      <button
        className="btn btn-secondary save-button"
        type="button"
        onClick={handleNewSave}
      >
        Save
      </button>
    )
  }
  else if (buttonType === "save-existing") {
    return (
      <button 
        className="btn btn-secondary save-button"
        type="button"
        onClick={handleExistingSave}
      >
        Save
      </button>
    )
  }
  else if (buttonType === "edit") {
    return (
      <button
        className="btn btn-primary edit-button"
        type="button"
        onClick={(e) => handleEditACharacter(character)}
      >
        Edit
      </button>
    )
  }
  else if (buttonType === "del") {
    return (
      <button
        className="btn btn-danger del-button"
        type="button"
        onClick={(e) => handleDelete(character, characters, setCharacters)}
      >
        Delete
      </button>
    )
  }
}

export default CharacterButton;