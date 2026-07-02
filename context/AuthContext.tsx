"use client";

import React from "react";

import { createClient } from "@/libs/supabase/client";

const AuthContext = React.createContext();

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const supabase = createClient();
  const [session, setSession] = React.useState<any>(undefined);

  React.useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        setSession(data.session);
      } catch (error) {
        console.error("Error getting session", error.message);
      }
    };
    getInitialSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Session changed", session);
    });
  }, [supabase]);

  const signInUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error("Supabase sign-in error: ", error.message);
        return { success: false, error: error.message };
      }
      console.log("Sign in was a success: ", data);
      return { success: true, data: data };
    } catch (error) {
      console.error("An unexpected sign in error: ", error.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  const signOutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Supabase couldn't sign you out", error.message);
        return { success: false, error: error.message }
      }
      console.log("User successfully logged out");
      return { success: true }

    } catch (error) {
      console.error("Unexpected error during sign-out", error.message);
      return { success: false, error: "An unexpected error occurred. Please try again." }
    }
  };

  const signUpUser = async (email: string, password: string, username: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password: password,
        options: {
          data: {
            display_name: username,
            account_type: "user",
            team_role: email === "odukwechiemeka@outlook.com" ? "admin" : "member",
          },
        },
      });
      if (error) {
        console.error("Supabase sign-up error: ", error.message);
        return { success: false, error: error.message };
      }
      console.log("Sign up was a success: ", data);
      return { success: true, data: data };
    } catch (error) {
      console.error("An unexpected sign up error: ", error.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ session, signInUser, signOutUser, signUpUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
