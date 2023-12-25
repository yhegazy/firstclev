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

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (_req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const {Client, Databases} = require('node-appwrite')

const client  = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1').setProject('6585ce45185a5ef8b25e').setKey(process.env.APPWRITE_KEY)
const db = new Databases(client, 'fcmdb')


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

  
  await db.updateDocument("fcmdb","archives", '6586ad389ff1f7159562', {link: request.body.vID, ytid: getData.map((item) => item[0]), title: getData.map((item) => item[1])})
  
  return resolve.send("YouTube Archive Data Updated!")
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
   
})
