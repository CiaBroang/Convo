import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  user: { token: string | null };
  setUser: React.Dispatch<React.SetStateAction<{ token: string | null }>>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ token: string | null }>({
    token: localStorage.getItem('token'),
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};