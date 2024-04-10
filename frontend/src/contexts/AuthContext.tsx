import React, { useEffect, useState } from "react";
import { FormValues } from "../types";
import axios from "axios";

type User = FormValues & {
  id: any;
  tokens: [];
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  getCurrentUser: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setUser: () => null,
  getCurrentUser: () => null,
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    alert("rumaisa");
    const storedToken = localStorage.getItem("token");
    console.log(storedToken);

    axios
      .get("http://localhost:5001/api/users/current", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(
        (response) => {
          console.log(response);
          setUser(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    getCurrentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
