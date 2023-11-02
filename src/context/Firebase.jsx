import { createContext, useContext,useState,useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,onAuthStateChanged
} from "firebase/auth";
const FirebaseContext = createContext(null);


const firebaseConfig = {
    apiKey: "AIzaSyCWF4-TWiOeLeZ-9uMXpGeciyR-CnMFMuE",
    authDomain: "bookify-b0ebb.firebaseapp.com",
    projectId: "bookify-b0ebb",
    storageBucket: "bookify-b0ebb.appspot.com",
    messagingSenderId: "310829966801",
    appId: "1:310829966801:web:624c16c090b3d041baecf0"
};

export const useFirebase = () => useContext(FirebaseContext)
const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider();


export const FirebaseProvider = (props) => {
    const [user,setUser]=useState(null);

    useEffect(()=> {
        onAuthStateChanged(firebaseAuth,user => {
            if(user) setUser(user)
            else setUser(null)
        })
    },[])
    const signupUserWithEmailandPassword = (email, password) =>
        createUserWithEmailAndPassword(firebaseAuth, email, password);
    const signInUserWithEmailandPassword = (email, password) =>
        signInWithEmailAndPassword(firebaseAuth, email, password);
    const signInUsingGoogle = () => signInWithPopup(firebaseAuth,googleProvider);
    const isLoggedIn = user ? true:false

    return (
        <FirebaseContext.Provider value={{ isLoggedIn,signInUsingGoogle,signupUserWithEmailandPassword, signInUserWithEmailandPassword }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}