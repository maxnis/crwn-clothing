import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMRwECwzw7-aykJfLKRwlJ7XuY7zdhN2o",
  authDomain: "crwn-db-29665.firebaseapp.com",
  projectId: "crwn-db-29665",
  storageBucket: "crwn-db-29665.firebasestorage.app",
  messagingSenderId: "580145608190",
  appId: "1:580145608190:web:8f1239e5a0614a19f57caf",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const firestoreDb = getFirestore();

export const createUserDocFromAuth = async (authUser, additional) => {
  if (!authUser) {
    return null;
  }
  const userDocRef = doc(firestoreDb, "users", authUser.uid);
  console.log("userDocRef:", userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log("userSnapshot:", userSnapshot);
  console.log("userSnapshot.exists():", userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = authUser;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additional
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return null;
  }
  return await createUserWithEmailAndPassword(auth, email, password);
};