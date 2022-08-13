// Step 1 - Setup Express Server
const express = require('express');

const app = express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Step 2 - Import Firebase & Credentials
const fs = require('firebase-admin')
const serviceAccount = require('./fcmdb-a8ff4-firebase-adminsdk-u5y93-591957a5d9.json')

// Step 3 - Initialize
fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
  databaseURL: process.env.databaseURL
});
const db = fs.firestore();

// Step 4- Retrieve document through get method
// app.get('/annoucementsDB', (req, res) => {
//     (async (docID = '9xwYb78vynekLccxECgO') => {
//         try{
//             const annoucementDB = db.collection('annoucements').doc(docID)
//             let item = await annoucementDB.get()
//             console.log(item.data())
//             return res.send(item.data())
//         } catch (error) {
//             console.log(error);
//         }
//     })()
// })

const allDocs = []
app.get('/fcmDB', (req, res) => {
    (async () => {
        try{
            const fcmDB = db.collection('posts');
            const snapshot = await fcmDB.get();
            
            snapshot.forEach(doc =>  allDocs.push(doc.data()))

            res.send(allDocs)

        } catch (error) {
            console.log(error);
        }
    })()
})

const videoID = []
app.get('/fcmDB', (req, res) => {
    (async () => {
        try{
            const fcmDB = db.collection('vID');
            const snapshot = await fcmDB.get();
            
            snapshot.forEach(doc =>  videoID.push(doc.data()))

            res.send(videoID)

        } catch (error) {
            console.log(error);
        }
    })()
})


// Step 5 - Post document to test
app.listen(8080, () => {
    console.log('listening on port 8080')
   
})