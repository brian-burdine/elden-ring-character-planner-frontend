import React, {
    createContext,
    useReducer,
    useContext,
  } from 'react';
  
  import jwtDecode from 'jwt-decode'
  
  let user = JSON.parse(localStorage.getItem('user'))
  let character = JSON.parse(localStorage.getItem('character'))
  
  const initialState = {
    currentUser: user ? jwtDecode(user.access) : null,
    currentUserToken: user ? user.access : null,
    currentCharacter: character ? character : {
      id: "",
      name: "",
      startingClass: 1,
      leveledAttributes: {
        "Vigor": 0,
        "Mind": 0,
        "Endurance": 0,
        "Strength": 0,
        "Dexterity": 0,
        "Intelligence": 0,
        "Faith": 0,
        "Arcane": 0
      }
    }
  }
  
  const GlobalStateContext = createContext(initialState);
  const DispatchStateContext = createContext(undefined)
  
  export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
      (state, newValue) => ({ ...state, ...newValue }),
      initialState
    );
  
    return (
      <GlobalStateContext.Provider value={state}>
        <DispatchStateContext.Provider value={dispatch}>
          {children}
        </DispatchStateContext.Provider>
      </GlobalStateContext.Provider>
    )
  }
  
  export const useGlobalState = () => [
    useContext(GlobalStateContext),
    useContext(DispatchStateContext)
  ];