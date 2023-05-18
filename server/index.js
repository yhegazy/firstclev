const {Client} = require('node-appwrite')
const {Databases} = require('node-appwrite')

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
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


//MAILJECT API
//If email returns noemail@firstcleveland.org, use sms instead. SMS will have it's own link to newsletter
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
  if(data.length > 0) {
    //Filter through notifications to retrieve newsletter Only
    data[0].documents.map((person) => (person.notification === 'newsletter' || person.notification === 'both') && email.push(person.email))
  }

  const htmlMessage = `<div>
  <p>Friday's Live Stream:  <a href='https://youtube.com/live/wuNFM6ya1dQ'>https://youtube.com/live/wuNFM6ya1dQ</a></p>
  <ul>Donate: 
    <li>CashApp-$FirstCleveland</li>
    <li>PayPal - <a href='https://firstcleveland.org/'>https://firstcleveland.org/</a></li>
    <li>Zelle - firstclevelandmosque131@gmail.com</li>
    <li>Checks/Cash - 3613 East 131st Cleveland, OH 44120</li>
  </ul>
  <p>Received by mistake? Please text UNSUBSCRIBE to 2168006242</p> 
  <p>Lastly, I appreciate your sabr. Jazak Allahu Kheiryan -yahia</p>
</div> `
  
  email.map((recipient) => {
    mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [{
          From: { Email: "no-reply@firstcleveland.org", Name: "First Cleveland Masjid"},
          To: [{Email: recipient}],
          Subject: "Assalamualaikum warahmatullahi wabarakatuh everyone. Jummah Live Stream 1:30p ET",
          HTMLPart: htmlMessage
        }]
      }
    )
  })
});

//If sms comes back with noemail@firstcleveland.org, return email
//if both are noemail@firstcleveland.org, end; break;
app.post('/sms', async() => {
  const Mailjet = require('node-mailjet');
  const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE
  });


  let data = []
  let tel = []
  // Filter through notifications to retrieve liveStream Only
  data.push(await db.listDocuments("firstClevelandMasjidDB", "newsletter"))
  if(data.length > 0) {
    data[0].documents.map((person) => (person.notification === 'liveStream' || person.notification === 'both') && tel.push(person.sms))
  }

  const smsMessage = `
    Friday's Live Stream:  https://youtube.com/live/wuNFM6ya1dQ
    Donate: 
    CashApp - $FirstCleveland
    PayPal  - https://firstcleveland.org/
    Zelle   - firstclevelandmosque131@gmail.com
    Checks/Cash - 3613 East 131st Cleveland, OH 44120 
    Received by mistake? Please text UNSUBSCRIBE to 2168006242
  `

  tel.map((recipient) => {
    mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: { Email: "no-reply@firstcleveland.org", Name: "First Cleveland Masjid"},
            To: [{Email: recipient}],
            Subject: "Assalamualaikum warahmatullahi wabarakatuh everyone. Jummah Live Stream 1:30p ET",
            TextPart: smsMessage
          }
        ]
    })
  })
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
   
})
