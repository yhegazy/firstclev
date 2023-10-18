//Setup Express Server
const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require("body-parser"); 

require('dotenv').config()
const PORT =  4000;

const app = express();
app.use(express.json())
app.use(cors());
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', function (_req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


const {Client, Databases, Query} = require('node-appwrite')

const client  = new Client()
  .setEndpoint('https://appwrite.firstcleveland.org/v1').setProject('fcm-appwrite').setKey(process.env.APPWRITE_KEY)
const db = new Databases(client, 'firstClevelandMasjidDB')


//Fetch YouTube last 30 days & Update DB
app.post('/edit', async(request, resolve) => {
  let results = 30
  let orderBy = 'date'
  const getData = []
  
  await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.CHANNEL_ID}&maxResults=${results}&order=${orderBy}&key=${process.env.YOUTUBE_API}`)
  .then((response) => response.json())
  .then((data) => data.items.forEach((item) => getData.push([item.id['videoId'], item.snippet['title']]))
  )
  .catch((error) => console.log(error))
  
 await db.updateDocument("firstClevelandMasjidDB","youtube-api-link", '63a0c5d9a54a5c33c046', {vID: request.body.vID, orderBy, results, id: getData.map((item) => item[0]), title: getData.map((item) => item[1].substring(0, 100))})
  
  return resolve.send("YouTube Archive Data Updated!")
})

//future implementation
//upload images to gallery
/*
app.post('/editGallery', async(request, resolve) => {
  await storage.createFile('images', request.imageName, request)
  await db.createDocument("firstClevelandMasjidDB","gallery", request.uuid, {imageName: request.imageName, submenu: request.submenu})

  return resolve.send("success")

})
*/


//MAILJECT API
app.post('/email', async() => {
  const Mailjet = require('node-mailjet');
  const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE
  });

  let data = []
  let email = []
  
  //BAD NAME:: class NewsletterSubscribers{}
  data.push(await db.listDocuments("firstClevelandMasjidDB", "newsletter"))
  //BAD NAME:: class Newsletter - add ability in frontend to update dataDump
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


//Pulling from sms table
app.post('/sms', async(request, response) => {
  //retrieve live stream for dynamic insertion to smsMessage
  const video = await db.getDocument("firstClevelandMasjidDB", "youtube-api-link", "63a0c5d9a54a5c33c046")
 
  //Frontend options messages are liveStream, Eid, Test. These msgs will eventually be stored in a db 
  const quickyMsg = `Live Stream: https://youtube.com/live/wuNFM6ya1dQ
    Donate at https://firstcleveland.org/
    Received by mistake? Please text 2168006242 w/UNSUBSCRIBE. 
  `
  const test = `Salaam - This is just a test.`
  const jummahMessage = `
    Jummah Live Stream 1:30pET :  ${video.vID}
    Donate: 
    CashApp - $FirstCleveland
    PayPal  - https://firstcleveland.org/
    Zelle   - firstclevelandmosque131@gmail.com
    Checks/Cash - 3613 East 131st Cleveland, OH 44120 
    (Make Checks payable to: First Cleveland Mosque)
    Received by mistake? Please text UNSUBSCRIBE to 2168006242
  `
  const eidMessage = ` ${request.body.date}    Takbir: ${request.body.takbir} ET     Prayer: ${request.body.salah} ET
    Live Stream : ${video.vID}
    Donate: 
    CashApp - $FirstCleveland
    PayPal  - https://firstcleveland.org/
    Zelle   - firstclevelandmosque131@gmail.com
    Checks/Cash - 3613 East 131st Cleveland, OH 44120 
    (Make Checks payable to: First Cleveland Mosque)
    Received by mistake? Please text UNSUBSCRIBE to 2168006242
  `  

  const TWILIO_API = require('twilio')(process.env.TWILIO_ID, process.env.TWILIO_TOKEN)
  const retrieve = async () => await db.listDocuments("firstClevelandMasjidDB", "sms", [Query.limit(100)])
  const TO_NUMBER = await (await retrieve()).documents.map((tel) => tel.sms)

  TWILIO_API.messages
  .create({
     body: jummahMessage,
     from: process.env.TWILIO_NUMBER,
     to: TO_NUMBER
   })
  .then(message => console.log(message.sid));


})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
   
})
