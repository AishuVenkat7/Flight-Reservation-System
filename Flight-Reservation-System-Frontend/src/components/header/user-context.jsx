import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserSessionProvider = ({ children }) => {
  const [userInfoSession, setUserInfoSession] = useState(JSON.parse(sessionStorage.getItem('userInfo')) || null);

  const updateUserInfoSession = (newUserInfo) => {
    console.log("User Context Updated Info: ", newUserInfo);
    setUserInfoSession(newUserInfo);
    sessionStorage.setItem('userInfo', JSON.stringify(newUserInfo));
  };

  const removeUserInfoSession = () => {
    setUserInfoSession(null);
    sessionStorage.removeItem('userInfo');
  }

  const appendToUserInfoSession = (info) => {
    const newUserInfo = {
      ...userInfoSession,
      ...info,
    }
    updateUserInfoSession(newUserInfo);
  }

  const removeItemFromUserInfoSession = (key) => {
    const newUserInfo = {
      ...userInfoSession,
    }
    delete newUserInfo.key;
    updateUserInfoSession(newUserInfo);
  }

  return (
    <UserContext.Provider value={{ userInfoSession, updateUserInfoSession, removeUserInfoSession, appendToUserInfoSession }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserInfoSession = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserSession must be used within a UserProvider');
  }
  return context;
};
