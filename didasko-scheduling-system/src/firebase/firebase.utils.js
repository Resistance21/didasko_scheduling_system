import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAw6YU0bhhPRgyHRZTpmM1HfLc-ltfu0qM",
    authDomain: "didasko-schedule-system.firebaseapp.com",
    databaseURL: "https://didasko-schedule-system.firebaseio.com",
    projectId: "didasko-schedule-system",
    storageBucket: "didasko-schedule-system.appspot.com",
    messagingSenderId: "522753985129",
    appId: "1:522753985129:web:cab09ee24c0fb5b82f30f8",
    measurementId: "G-7Z3Q2WKRPW"
};
  
export const createUserProfileDocument = async (userAuth, displayName, email, accountType, subjects) => {
    if (!userAuth) {
        return
    }

    const userRef = firestore.doc(`user/${userAuth.uid}`);
    console.log("Inside crate profile")
    const snapShot = await userRef.get()

/*     if (!snapShot.exists) {
        //const { email } = userAuth;
        console.log("DISPLAYNAME: " + displayName)
        console.log("EMAIL: " + email)
        let subject1 = {}
        let subject2 = {}      
        let subject3 = {}
        const createdAt = new Date();
        let schedules = [];
        let currentYear = createdAt.getFullYear();
        let firstSchedule = [
            [currentYear] = [
                subject1 = {
                    name: "MATH"
                }, subject2 = {
                    name: "ENGLISH"
                },
                subject3 = {
                    name: "SCIENCE"
                },
            ]
        ]

        schedules.push(firstSchedule);

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                accountType,
                subjects,
                schedules
                    
            }
            )
        }
        catch (err) {
            console.log("error making user: " + err);
        }
    
        return userRef;
        //console.log(snapShot)
    
    } */
}

  



  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;