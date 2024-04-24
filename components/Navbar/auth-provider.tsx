"use client";
import auth from "@/firebase/client";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  currentUser: User | null;
  isAdmin: boolean;
  isPro: boolean;
  loginGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isPro, setIsPro] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (!auth) return;
    return auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setCurrentUser(null);
      }
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  function loginGoogle(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!auth) {
        reject();
        return;
      }
      signInWithPopup(auth, new GoogleAuthProvider())
        .then((user) => {
          console.log("Signed In");
          resolve();
        })
        .catch(() => {
          console.error("Something went wrong when signing");
          reject();
        });
    });
  }

  function logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!auth) {
        resolve();
        return;
      }
      auth
        .signOut()
        .then(() => {
          console.log("Signed Out");
          resolve();
        })
        .catch(() => {
          console.error("Something went wrong");

          reject();
        });
    });
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        isPro,
        loginGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
