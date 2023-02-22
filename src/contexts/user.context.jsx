import { createContext, useReducer } from 'react';
import USER_ACTION_TYPES from '../store/user/user.types';
import setCurrentUser from '../store/user/user.action';
//actual value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});



const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type {type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

//the component
export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;
  
  const value = { currentUser, setCurrentUser };


  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
