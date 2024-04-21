"use client";
import { auth } from "@/firebase/client";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export function getAuthToken(): string | undefined {
    return Cookies.get("firebaseIdToken");
}

export function setAuthToken(token: string): string | undefined {
    return Cookies.set("firebaseIdToken", token, { secure: true });
}

export function removeAuthToken(): void {
    return Cookies.remove("firebaseIdToken");
}

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
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isPro, setIsPro] = useState<boolean>(false);

    // Triggers when App is started
    useEffect(() => {
        if (!auth) return;

        return auth.onAuthStateChanged(async (user) => {
            // Triggers when user signs out
            if (!user) {
                setCurrentUser(null);
                setIsAdmin(false);
                setIsPro(false);
                removeAuthToken();
                return;
            }

            const token = await user.getIdToken();
            if (user) {
                setCurrentUser(user);
                setAuthToken(token);

                // Check if is admin
                const tokenValues = await user.getIdTokenResult();
                setIsAdmin(tokenValues.claims.role === "admin");

                // Check if is pro
                const userResponse = await fetch(`/api/users/${user.uid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (userResponse.ok) {
                    const userJson = await userResponse.json();
                    if (userJson?.isPro) setIsPro(true);
                } else {
                    console.error("Could not get user info");
                }
            }
        });
    }, []);

    function loginGoogle(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!auth) {
                reject();
                return;
            }
            signInWithPopup(auth, new GoogleAuthProvider())
                .then((user) => {
                    console.log("Signed in!");
                    resolve();
                })
                .catch(() => {
                    console.error("Something went wrong");
                    reject();
                });
        });
    }

    function logout(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!auth) {
                reject();
                return;
            }
            auth.signOut()
                .then(() => {
                    console.log("Signed out");
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
