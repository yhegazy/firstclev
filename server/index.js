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
  //add ability in frontend to update dataDump
  const htmlMessage = await db.getDocument("firstClevelandMasjidDB", 'dataDump', "htmlMessage")
  if(data.length > 0) data[0].documents.map((person) => email.push(person.email))
  
  email.map((recipient) => {
    mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [{
          From: { Email: "no-reply@firstcleveland.org", Name: "First Cleveland Masjid"},
          To: [{Email: recipient}],
          Subject: "First Cleveland Masjid Newsletter ",
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
  const Mailjet = require('node-mailjet');
  const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE
  });


  let data = []
  let tel = []
  

  //retrieve live stream link 
  const video = await db.getDocument("firstClevelandMasjidDB", "youtube-api-link", "63a0c5d9a54a5c33c046")
  
  // Filter through notifications to retrieve liveStream Only
  data.push(await db.listDocuments("firstClevelandMasjidDB", "sms"))
  if(data.length > 0) data[0].documents.map((person) => tel.push(person.sms))

  //Have frontend choose to send liveStream, Eid, Test messages to community. 
    //Have test only see my, eppal's numbers

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
  //eventually have the dates changed from the front end instead of manually updating the backend
  const eidMessage = ` June 28th    Takbir: 8:30a ET     Prayer: 9a ET
    Donate: 
    CashApp - $FirstCleveland
    PayPal  - https://firstcleveland.org/
    Zelle   - firstclevelandmosque131@gmail.com
    Checks/Cash - 3613 East 131st Cleveland, OH 44120 
    (Make Checks payable to: First Cleveland Mosque)
    Received by mistake? Please text UNSUBSCRIBE to 2168006242
  `

  const test = `Salaam - This is just a test.`

  console.log(tel)

  tel.map((recipient) => {
    mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: { Email: "no-reply@firstcleveland.org", Name: "First Cleveland Masjid"},
            To: [{Email: recipient}],
            Subject: option === 'liveStream' ? smsSubject: option === 'eid' ? eidSubject : test,
            TextPart: option === 'liveStream' ? smsMessage: option === 'eid' ? eidMessage : test
          }
        ]
    })
  })
  
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
   
})
