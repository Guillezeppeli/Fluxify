import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Set initial state to null

useEffect(() => {
  // Move the localStorage logic inside a useEffect, which runs on the client side
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    setUser(storedUser);
  }
}, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
