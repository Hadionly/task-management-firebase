// src/config/firebase.config.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCE3RHC5LttShUTS-ry4hXBd_FQF87RMFc",
  authDomain: "task-management-app-665c1.firebaseapp.com",
  projectId: "task-management-app-665c1",
  storageBucket: "task-management-app-665c1.firebasestorage.app",
  messagingSenderId: "784070026074",
  appId: "1:784070026074:web:aa92d9772c3ea410dbc963",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
