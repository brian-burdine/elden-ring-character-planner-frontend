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
      // weapons: {
      //   rightHand: [
      //     {
      //       id: 0
      //     }, 
      //     {
      //       id: 0
      //     }, 
      //     {
      //       id: 0
      //     }
      //   ],
      //   leftHand: [
      //     {
      //       id: 0
      //     }, 
      //     {
      //       id: 0
      //     }, 
      //     {
      //       id: 0
      //     }
      //   ]
      // }
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