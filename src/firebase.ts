import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import appletConfig from "../firebase-applet-config.json";

// Firebase configuration using Vite environment variables or applet config file
const firebaseConfig = {
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY || appletConfig.apiKey,
  authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain,
  projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId,
  storageBucket: (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket,
  messagingSenderId: (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId,
  appId: (import.meta as any).env.VITE_FIREBASE_APP_ID || appletConfig.appId,
};

const databaseId = (import.meta as any).env.VITE_FIREBASE_DATABASE_ID || appletConfig.firestoreDatabaseId;

// Check if Firebase is fully configured in the environment variables or applet config
export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== "MY_FIREBASE_API_KEY" &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

let app: any = null;
let auth: any = null;
let db: any = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);
    console.log("Firebase initialized successfully on frontend!");
  } catch (err) {
    console.error("Failed to initialize Firebase:", err);
  }
} else {
  console.warn(
    "Firebase configuration is missing! Please configure Firebase in your environment."
  );
}

export { app, auth, db };
export default app;

