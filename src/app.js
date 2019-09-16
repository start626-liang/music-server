const express = require('express')
const app = express()
const fs = require("fs")

app.use(express.static('public'))


app.get('/music/list', (req, res) => {
  const data = fs.readdirSync("public/CloudMusic");
  data.unshift(null)
  res.send(data)
})

app.listen(5000, () => console.log('Example app listening on port 5000!'))