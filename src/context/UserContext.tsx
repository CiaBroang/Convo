import React, { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  user: {
    id: string | null;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string | null;
    }>
  >;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ id: string | null }>({
    id: null,
  });

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser === null) return setUser({ id: null });
    const userId = JSON.parse(localUser).userId;
    console.log("Fetched user ID from localStorage:", localUser);
    if (localUser) {
      setUser({ id: userId });
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