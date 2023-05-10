const {Client} = require('node-appwrite')
const {Databases} = require('node-appwrite')

const client  = new Client()
  .setEndpoint('https://appwrite.firstcleveland.org/v1').setProject('fcm-appwrite')
const db = new Databases(client, 'firstClevelandMasjidDB')


//Setup Express Server
const express = require('express');
const path = require('path');
const cors = require('cors')

const PORT =  4000;


const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.post('/email', () => {
  const sgMail = require('@sendgrid/mail')

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  //Filter through notifications to correctly send email only items
  const msg = {
    to: ['yahia.hegazy@gmail.com', 'firstclevelandmasjid@gmail.com'], // Use array to send to multiple recipients
    from: 'no-reply@firstcleveland.org', // Change to your verified sender
    subject: 'First Cleveland Masjid Newsletter',
    text: 'Bismillah Ar-rahman Ar-Raheem, Assalamualaikum warahmatullahi wabarakatuh everyone!',
    html: '<strong>Newsletter here we come</strong>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent', msg)
    })
    .catch((error) => {
      console.error(error)
    })
});

app.post('/sms', async() => {
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  let data = []
  let tel = []
 
  //Filter through notifications to retrieve liveStream Only
  data.push(await db.listDocuments("firstClevelandMasjidDB", "newsletter"))

  if(data.length > 0) {
    data[0].documents.map((person) => (person.notification === 'liveStream' || person.notification === 'both') && tel.push(person.sms))
  }
  
  const sms = {
    to: tel,
    from: 'no-reply@firstcleveland.org', 
    subject: `Assalamualaikum warahmatullahi wabarakatuh everyone. Jummah Live Stream 1:30p ET`, //2nd iteration need to pass drop down values from frontend for backend to determine the subject message
    text: `Please LIKE! and SUBSCRIBE!! to our YouTube channel. 
    Live Stream:  https://youtube.com/live/nyqrIDqdzkU?feature=share  
    Donate to:    https://firstcleveland.org/
    Lastly, thank you for being patient as well as part of the journey. 
    Jazak Allahu Kheiryan -yahia`
  }
  
  sgMail
    .send(sms)
    .then(() => console.log('SMS Sent'))
    .catch((error) => console.error(error))
  
  //BACKEND
  //we'll need to pass variables to insert to html to pass as an email
  //build newsletter content through html

})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
   
})
