require('dotenv').config()
const express = require('express')
const path = require("path");
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env || 4004
const {} = require('./controller.js')
const baseURL = `/api/map.html`
const {getHorses,createHorse,updateHorse,seed,moveHorse,changeSearchValues}= require('./controller')
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "/../public")));
app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/landing.html"));
  });

app.post('/seed', seed)
app.get(`${baseURL}`,getHorses)
app.put(`${baseURL}`,moveHorse)
app.post(`${baseURL}`,createHorse)
app.post('/api/landing.html',changeSearchValues)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))