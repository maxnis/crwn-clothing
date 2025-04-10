import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FBASE_API_KEY,
  projectId: process.env.REACT_APP_FBASE_PROJECT_ID,
  authDomain: process.env.REACT_APP_FBASE_PROJECT_ID + ".firebaseapp.com",
  storageBucket:
    process.env.REACT_APP_FBASE_PROJECT_ID + ".firebasestorage.app",
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

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  if (!collectionKey) {
    console.warn("No collection key provided.");
    return;
  }

  if (
    !objectsToAdd ||
    !Array.isArray(objectsToAdd) ||
    objectsToAdd.length === 0
  ) {
    console.warn("No objects collection to add.");
    return;
  }

  const objectsArray = Array.isArray(objectsToAdd)
    ? objectsToAdd
    : Object.values(objectsToAdd);
  console.log(objectsArray);
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsArray.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, doc) => {
    const { title, items } = doc.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocFromAuth = async (authUser, additional) => {
  if (!authUser) {
    return null;
  }
  const userDocRef = doc(db, "users", authUser.uid);
  //console.log("userDocRef:", userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  //console.log("userSnapshot:", userSnapshot);
  //console.log("userSnapshot.exists():", userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = authUser;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additional,
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
