//Setup Express Server
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8080;


const app = express();
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

//Post document to test
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
   
})