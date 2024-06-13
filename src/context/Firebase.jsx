import { createContext, useContext,useState,useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,onAuthStateChanged,signOut
} from "firebase/auth";
import { getFirestore,collection,addDoc,getDocs,doc, getDoc,query,where } from "firebase/firestore"
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
// const navigate = useNavigate();

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
    // console.log("User",user)
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
    const placeOrder = async(bookId,qty) => {
        const collectionRef = collection(firestore,"books",bookId,"orders");
        const result = await addDoc(collectionRef,{
            userID : user.uid,
            userEmail : user.email,
            displayName : user.displayName,
            photoURL : user.photoURL ,   
            qty:Number(qty),
        })
        return result;
    }

    const fetchMyBooks = async(userID) => {
        if(!user) return null;
        const colRef = collection(firestore,"books")
        const q = query(colRef,where("userID" ,"==", userID));

        const result = await getDocs(q);
        // console.log(result)
        return result;
    }
    const getOrders = async(bookId) => {
        const collectionRef = collection(firestore,"books",bookId,"orders");
        const result = await getDocs(collectionRef);
        return result
    }
    const getImageURL = (path) => {
        return getDownloadURL(ref(storage,path))
    }
    const sigNOut = () => {
        signOut(firebaseAuth).then((e)=> console.log("Successfully signed out")).catch(error => console.log(error))
    }
    const isLoggedIn = user ? true:false

    return (
        <FirebaseContext.Provider value={{ user,sigNOut,isLoggedIn,getOrders,fetchMyBooks,placeOrder,getBookById,getImageURL,listAllBooks,handleCreateNewListing,signInUsingGoogle,signupUserWithEmailandPassword, signInUserWithEmailandPassword }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}