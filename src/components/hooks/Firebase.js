import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs, addDoc, setDoc, doc} from 'firebase/firestore'

// Detect if Firebase connection is lost/regained - Stack Overflow

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh4_2OzLdAPnv0dNnOmTnSNDVvJAiV9Bc",
  authDomain: "fcmdb-a8ff4.firebaseapp.com",
  projectId: "fcmdb-a8ff4",
  storageBucket: "fcmdb-a8ff4.appspot.com",
  messagingSenderId: "1032479093788",
  appId: "1:1032479093788:web:9a7559d0a6a4d7a5889bd9"
};
// Initialize Firebase
initializeApp(firebaseConfig)

// Use these for db & auth
const db = getFirestore()

//collection ref
const colRef = collection(db, 'posts')
const videoID = collection(db, 'vID')

//get collection docs
let entry = []
getDocs(colRef)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      entry.push({...doc.data(), id: doc.id})
    })
  })
  .catch(error => console.log(error))

let vID = []
getDocs(videoID)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      vID.push({...doc.data(), id: doc.id})
    })
  })
  .catch(error => console.log(error))


const addDocument = async(req, res) => {  
   try {
    addDoc(colRef, {
      greeting:'As-Salamu Aalikum, ٱلسَّلَامُ عَلَيْكُمْ‎',
      body: document.getElementById('body').value,
      subject: document.getElementById('subject').value,
      email: document.getElementById('email').value,
      telephone: document.getElementById('telephone').value,
      image: document.getElementById('image').value,
      hrefURL: document.getElementById('hrefURL').value,
      
    })

    
  } catch (error) {console.log("Error: ", error)} 
}

const updateVideoID = async(req, res) => {
   try {
      await setDoc(doc(videoID, 'SlIILXXbqNbRhy09ac3D' ), {
        ID: document.getElementById('youtube').value
      });    
  } catch (error) {console.log("Error: ", error)} 
}

export { entry, addDocument, colRef, vID, updateVideoID,};