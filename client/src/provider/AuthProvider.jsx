import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
  sendEmailVerification,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail, // Import reset password method
} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAJObCFRnCmL9drJuKxz4DBjnCZb5tVkcc",
  authDomain: "book-store-c6491.firebaseapp.com",
  projectId: "book-store-c6491",
  storageBucket: "book-store-c6491.appspot.com",
  messagingSenderId: "893532102193",
  appId: "1:893532102193:web:324c90f37b26791d9bbf10",
  // databaseURL: "https://book-store-c6491-default-rtdb.firebaseio.com",
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

// Firebase Authentication and Firestore instances
const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Create a context for Firebase
const FirebaseContext = createContext(null);

// Custom hook to use Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// FirebaseProvider component to provide Firebase-related functions
export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to sign up using email and password
  const signUpWithUserNameandPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // Function to sign in using email and password
  const signInWithEmailAndPasswordHandler = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  // Function to reset password using email
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        console.log("Password reset email sent");
      })
      .catch((error) => {
        console.error("Error sending password reset email", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Function to log in with Google
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(firebaseAuth, googleProvider)
      .then((result) => {
        setUser(result.user);
        console.log("Google Sign-in successful", result.user);
      })
      .catch((error) => {
        console.error("Google Sign-in failed", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Function to log out
  const logOut = () => {
    setUser(null);
    signOut(firebaseAuth)
      .then(() => {
        console.log("Sign-out successful");
      })
      .catch((error) => {
        console.error("Sign-out failed", error);
      });
  };

  // Function to save user data in Firestore
  // const userDb = async (firstName, lastName) => {
  //   try {
  //     // Set user document in Firestore with user's info
  //     await setDoc(doc(db, "users", user.uid), {
  //       firstName,
  //       lastName,
  //       email: user.email,
  //       createdAt: new Date(),
  //     });
  //   } catch (err) {
  //     console.error("Error saving user data to Firestore:", err);
  //     throw err;
  //   }
  // };

  // Use effect to handle authentication state changes
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(
      firebaseAuth,
      async (currentUser) => {
        setUser(currentUser);
        // console.log(currentUser);
        setLoading(true);

        if (currentUser) {
          try {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              console.log("User data:", docSnap.data());
            } else {
              // console.log("No such document!");
            }
          } catch (error) {
            console.error("Error getting user document:", error);
          }
        } else {
          console.log("No user is signed in");
        }

        setLoading(false);
      }
    );

    return () => unSubscribe();
  }, [firebaseAuth, db]);

  return (
    <FirebaseContext.Provider
      value={{
        user,
        loading,
        signUpWithUserNameandPassword,
        signInWithEmailAndPasswordHandler,
        loginWithGoogle,
        logOut,
        sendEmailVerification,
        resetPassword, // Provide resetPassword function
        // userDb,
        db,firebaseAuth
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
