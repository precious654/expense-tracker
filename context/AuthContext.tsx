"use client";

import React from "react";

const AuthContext = React.createContext();

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = React.useState(undefined);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
	return React.useContext(AuthContext);
}