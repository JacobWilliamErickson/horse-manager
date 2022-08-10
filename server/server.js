require('dotenv').config()
const express = require('express')
const path = require("path");
const app = express()
const cors = require('cors')
const {} = require('./controller.js')
const baseURL = `/api/map.html`
const {getHorses,createHorse,seed,moveHorse,searchHorses,getJournals,submitentry}= require('./controller')
app.use(express.json())
app.use(cors())
app.use(express.static("public"));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/landing.html'))
})
app.post('/seed', seed)
app.get(`${baseURL}`,getHorses)
app.get(`/api/journal.html`,getJournals)
app.put(`${baseURL}`,moveHorse)
app.post(`/api/map.html`,createHorse)
app.post(`/api/journal.html`,submitentry)
app.get('/api/landing.html',searchHorses)
const port = process.env.PORT || 4004
app.listen(port, () => console.log(`up on ${port}`))