import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase.js";

// helper para sync
const syncUserWithBackend = async (firebaseUser) => {
  const token = await firebaseUser.getIdToken();

  await fetch("/users/sync-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Registro con email y password
export const registerWithEmail = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await syncUserWithBackend(user);

  return user;
};

// Login con email y password
export const loginWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await syncUserWithBackend(user);

  return user;
};

// Login con Google
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  await syncUserWithBackend(user);

  return user;
};

// Logout
export const logout = async () => {
  await signOut(auth);
};

// Listener global del usuario logueado
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};
