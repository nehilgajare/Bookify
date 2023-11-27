import { createContext, useContext,useState,useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,onAuthStateChanged
} from "firebase/auth";
import { getFirestore,collection,addDoc,getDocs,doc, getDoc } from "firebase/firestore"
import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage"

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
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)
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
    console.log(user)
    const handleCreateNewListing = async(name,isbn,price,cover) => {
        const imageRef=ref(storage,`uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult = await uploadBytes(imageRef,cover);
        return await addDoc(collection(firestore,'books'),{
            name,
            isbn,
            price,
            imageURL: uploadResult.ref.fullPath,
            userID : user.uid,
            userEmail : user.email,
            displayName : user.displayName,
            photoURL : user.photoURL
        })
    }
    const listAllBooks = () => {
        return getDocs(collection(firestore,"books"))
    }
    const getBookById = async(id) => {
        const docRef = doc(firestore,"books",id);
        const result = await getDoc(docRef);
        return result
    }
    const getImageURL = (path) => {
        return getDownloadURL(ref(storage,path))
    }
    const isLoggedIn = user ? true:false

    return (
        <FirebaseContext.Provider value={{ isLoggedIn,getBookById,getImageURL,listAllBooks,handleCreateNewListing,signInUsingGoogle,signupUserWithEmailandPassword, signInUserWithEmailandPassword }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}