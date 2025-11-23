import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Configuracion
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREABSE,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN_FIREBASE,
  projectId: import.meta.env.VITE_PROJECT_ID_FIREBASE,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET_FIREABSE,
  messagingSenderId: import.meta.env.VITE_MESSAGER_SENDER_ID_FIREBASE,
  appId: import.meta.env.VITE_APP_ID_FIREBASE
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()