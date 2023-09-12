const {Client, Databases} = require('node-appwrite')

const client  = new Client()
  .setEndpoint('https://appwrite.firstcleveland.org/v1').setProject('fcm-appwrite')
const db = new Databases(client, 'firstClevelandMasjidDB')


//Setup Express Server
const express = require('express');
const path = require('path');
const cors = require('cors')
require('dotenv').config({path: './.env'})

const PORT =  4000;

const app = express();
app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

//MAILJECT API
const quickyMsg = `Live Stream: https://youtube.com/live/wuNFM6ya1dQ
Donate at https://firstcleveland.org/
Received by mistake? Please text 2168006242 w/UNSUBSCRIBE. 
`

app.post('/email', async() => {
  const Mailjet = require('node-mailjet');
  const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE
  });

  let data = []
  let email = []

  
  data.push(await db.listDocuments("firstClevelandMasjidDB", "newsletter"))
  const htmlMessage = await db.getDocument("firstClevelandMasjidDB", 'dataDump', "htmlMessage")
  if(data.length > 0) data[0].documents.map((person) => email.push(person.email))
  
  email.map((recipient) => {
    mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [{
          From: { Email: "no-reply@firstcleveland.org", Name: "First Cleveland Masjid"},
          To: [{Email: recipient}],
          Subject: "First Cleveland Masjid Monthly Newsletter ",
          HTMLPart: htmlMessage.htmlMessage
        }]
      }
    )
  })

});


//Retrieve data from frontend SMS DDL
let option = ''
app.post('/ddl', async(req) => {
  const choice = req.body
  option = choice.option
})

//Created a new table called sms in appwrite.
app.post('/sms', async() => {
  const SERVICE_PLAN_ID = 'SERVICE_PLAN_ID';
  const API_TOKEN = 'API_TOKEN';
  const SINCH_NUMBER = 'SINCH_NUMBER';

  //retrieve live stream for dynamic insertion to smsMessage
  const video = await db.getDocument("firstClevelandMasjidDB", "youtube-api-link", "63a0c5d9a54a5c33c046")

 
  //Frontend options messages are liveStream, Eid, Test 
  const test = `Salaam - This is just a test.`
  const smsSubject = `Assalamualaikum warahmatullahi wabarakatuh! Jummah Live Stream 1:30p ET`
  const smsMessage = `
    Jummah Live Stream:  ${video.vID}
    Donate: 
    CashApp - $FirstCleveland
    PayPal  - https://firstcleveland.org/
    Zelle   - firstclevelandmosque131@gmail.com
    Checks/Cash - 3613 East 131st Cleveland, OH 44120 
    (Make Checks payable to: First Cleveland Mosque)
    Received by mistake? Please text UNSUBSCRIBE to 2168006242
  `

  const eidSubject = `Assalamualaikum warahmatullahi wabarakatuh! Eid Mubarak!`
  
  const eidMessage = ` June 28th    Takbir: 8:30a ET     Prayer: 9a ET
    Donate: 
    CashApp - $FirstCleveland
    PayPal  - https://firstcleveland.org/
    Zelle   - firstclevelandmosque131@gmail.com
    Checks/Cash - 3613 East 131st Cleveland, OH 44120 
    (Make Checks payable to: First Cleveland Mosque)
    Received by mistake? Please text UNSUBSCRIBE to 2168006242
  `  
 
  //default query limit is 25, calling [Query.lmit(N)] allows you to customize.
  const retrieveSMS = async () => {
    const result = await db.listDocuments("firstClevelandMasjidDB", "sms", [Query.limit(100)])
    return result
  }
  const TO_NUMBER = await (await retrieveSMS()).documents.map((tel) => tel.sms)
  
  // SINCH API
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  const  run = async() => {
    const resp = await fetch(
      'https://us.sms.api.sinch.com/xms/v1/' + SERVICE_PLAN_ID + '/batches',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + API_TOKEN
        },
        body: JSON.stringify({
          from: SINCH_NUMBER,
          to: TO_NUMBER,
          subject: smsSubject,
          body: smsMessage
        })
      }
    );
  }

  run();
  
})

//LISTEN
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
   
})
