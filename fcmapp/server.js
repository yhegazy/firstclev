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

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
   
})
