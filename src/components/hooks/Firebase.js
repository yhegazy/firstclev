import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs, addDoc} from 'firebase/firestore'

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

//get collection docs
let entry = []
getDocs(colRef)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      entry.push({...doc.data(), id: doc.id})
    })
  })
  .catch(error => console.log(error))


const addDocument = async(req, res) => {
  
   try {
    addDoc(collection(db, 'posts'), {
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

export { entry, addDocument, colRef};