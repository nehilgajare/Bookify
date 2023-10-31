import {createContext,useContext} from "react";
import {initializeApp} from "firebase/app";
const FirebaseContext = createContext(null);


const firebaseConfig = {
    apiKey: "AIzaSyCWF4-TWiOeLeZ-9uMXpGeciyR-CnMFMuE",
    authDomain: "bookify-b0ebb.firebaseapp.com",
    projectId: "bookify-b0ebb",
    storageBucket: "bookify-b0ebb.appspot.com",
    messagingSenderId: "310829966801",
    appId: "1:310829966801:web:624c16c090b3d041baecf0"
  };

export const useFirebase= () => useContext(FirebaseContext)
const firebaseApp = initializeApp(firebaseConfig)

export const FirebaseProvider = (props) => {
    return(
        <FirebaseContext.Provider>
            {props.children}
        </FirebaseContext.Provider>
    )
}