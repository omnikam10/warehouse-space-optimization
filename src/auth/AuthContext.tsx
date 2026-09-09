import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  type AuthUser,
} from "./authService";


/* =========================================================
   AUTH CONTEXT TYPE
   ========================================================= */

interface AuthContextType {
  user: AuthUser | null;

  isAuthenticated: boolean;

  isLoading: boolean;

  login: (
    username: string,
    password: string,
    rememberMe: boolean
  ) => boolean;

  logout: () => void;
}


/* =========================================================
   CREATE CONTEXT
   ========================================================= */

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );


/* =========================================================
   AUTH PROVIDER
   ========================================================= */

interface AuthProviderProps {
  children: ReactNode;
}


export function AuthProvider({
  children,
}: AuthProviderProps) {

  const [user, setUser] =
    useState<AuthUser | null>(null);


  const [isLoading, setIsLoading] =
    useState(true);


  /* =======================================================
     RESTORE EXISTING SESSION
  ======================================================= */

  useEffect(() => {

    const currentUser =
      getCurrentUser();

    setUser(currentUser);

    setIsLoading(false);

  }, []);


  /* =======================================================
     LOGIN
  ======================================================= */

  const login = (
    username: string,
    password: string,
    rememberMe: boolean
  ): boolean => {

    const authenticatedUser =
      loginUser(
        username,
        password,
        rememberMe
      );


    if (!authenticatedUser) {

      return false;

    }


    setUser(
      authenticatedUser
    );

    return true;
  };


  /* =======================================================
     LOGOUT
  ======================================================= */

  const logout = () => {

    logoutUser();

    setUser(null);

  };


  /* =======================================================
     AUTHENTICATED STATE
  ======================================================= */

  const isAuthenticated =
    user !== null;


  /* =======================================================
     PROVIDER
  ======================================================= */

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


/* =========================================================
   USE AUTH HOOK
   ========================================================= */

export function useAuth() {

  const context =
    useContext(AuthContext);


  if (!context) {

    throw new Error(
      "useAuth must be used within an AuthProvider"
    );

  }


  return context;
}