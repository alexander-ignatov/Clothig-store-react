import { createContext, useState, useEffect } from 'react';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';
//actual value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//the component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      if (user) createUserDocumentFromAuth(user);
      else setCurrentUser(user);
    });
    return unsubscribe; //returns when unmounts
  }, []); //runs on mount

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};