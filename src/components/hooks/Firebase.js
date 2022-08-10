import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkPFI92O_bORCOH1Ty-yhHxRCV5b_t1P0",
  authDomain: "annoucementdb.firebaseapp.com",
  projectId: "annoucementdb",
  storageBucket: "annoucementdb.appspot.com",
  messagingSenderId: "1078788514134",
  appId: "1:1078788514134:web:4418d66ac64887854eb6f7"
};

// Initialize Firebase
initializeApp(firebaseConfig)

// Use these for db & auth
const db = getFirestore()

//collection ref
const colRef = collection(db, 'annoucements')

//get collection docs
let entry = []
getDocs(colRef)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      entry.push({...doc.data(), id: doc.id})
    })
  })
  .catch(error => console.log(error))

export { entry};