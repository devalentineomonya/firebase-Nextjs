"use client";

import { getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

let auth: Auth | undefined = undefined;

const firebaseConfig = {
  apiKey: "AIzaSyAQb0Zth72D6yAJzKQjtk7pS_QpTyCQ0jc",
  authDomain: "learningfirebasewithmiguel.firebaseapp.com",
  projectId: "learningfirebasewithmiguel",
  storageBucket: "learningfirebasewithmiguel.appspot.com",
  messagingSenderId: "787142665910",
  appId: "1:787142665910:web:335660dcc3b453b43d6817",
  measurementId: "G-QVX7YN5286",
};

const currentApps = getApps();
if (currentApps.length <= 0) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} else {
  auth = getAuth(currentApps[0]);
}
export default auth;
