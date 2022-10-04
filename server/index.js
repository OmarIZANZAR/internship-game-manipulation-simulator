const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv')
const ConnectDB = require("./config/db.js")

// server and database launch:
ConnectDB()
const app = express()
dotenv.config({path: './config/.env'})

// BODY PARSERS:
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS:
app.use(cors())

// PLAYERS ROUTER:
const PlayersRouter = require('./routes/players.js')
app.use('/players', PlayersRouter)

// SPORTS ROUTER:
const SportsRouter = require('./routes/sports.js')
app.use('/sports', SportsRouter)

// LEAGUES ROUTER:
const LeaguesRouter = require('./routes/leagues.js')
app.use('/leagues', LeaguesRouter)

// BADGES ROUTER:
const BadgesRouter = require('./routes/badges.js')
app.use('/badges', BadgesRouter)

// POPULATE DATABASE:
const populateDatabase = require('./config/demo.js')
// populateDatabase()

// REDIRECT TO FRONTEND:
app.get('/', (req, res)=>{
    res.redirect('http://localhost:3000')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server running on port ${PORT}...`.yellow.bold.underline))