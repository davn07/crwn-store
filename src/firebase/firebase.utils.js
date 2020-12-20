import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAInPAc-QlryQdDU3wA_meZ7qsQVqDL0I0",
    authDomain: "crwn-db-14d0e.firebaseapp.com",
    databaseURL: "https://crwn-db-14d0e.firebaseio.com",
    projectId: "crwn-db-14d0e",
    storageBucket: "crwn-db-14d0e.appspot.com",
    messagingSenderId: "901480358836",
    appId: "1:901480358836:web:c9c6f3e257b335a35d08e1",
    measurementId: "G-0P5XC2Q9YL"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get()

    // console.log(snapShot);
    if(!snapShot.exists){
        const { displayName, email} = userAuth;
        const createdAt = new Date();
         
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account'});
export const SignInWithGoogle = () =>auth.signInWithPopup(provider);


export default firebase;