const express = require('express')
const app = express()
const fs = require("fs")

app.use(express.static('public'))
const musicList = []
musicList.push(null)
fs.readdir("public/CloudMusic",function(err, files){
   if (err) {
       return console.error(err);
   }
   files.forEach( function (file){
        musicList.push(file)
   });
});
app.get('/music/list', (req, res) => res.send(musicList))

app.listen(5000, () => console.log('Example app listening on port 5000!'))