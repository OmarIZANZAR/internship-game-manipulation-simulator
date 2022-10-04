const http = require('http')
const colors = require('colors')
const { Kafka } = require('kafkajs')
const { BROKER } = require('./config/env.js')
const connectDB = require('./config/db.js')
const { Server } = require("socket.io");

connectDB()

const kafka = new Kafka({
    clientId: 'news-spreader',
    brokers: [BROKER]
})

const admin = kafka.admin()

async function listTopics(){
    let topics;
    
    try {
        await admin.connect()
        topics = await admin.listTopics()
        await admin.disconnect()
    } catch (error) {
        console.log(`FAILED TO LIST TOPICS: ${error.error}`.bold.red)
    }

    return topics
}

// Badges consumer:
const consumeBadges = require('./consumers/badges.js')
consumeBadges()

// Leagues consumer:
const consumeLeagues = require('./consumers/leagues.js')
consumeLeagues()

// sports consumer:
const consumeSports = require('./consumers/sports.js')
consumeSports()

// server:
const server = http.createServer(async (req, res) => {
    if(req.url == "/topics"){
        let topics = await listTopics()
        console.log(topics)

        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200
        res.end(JSON.stringify({ topics }))
    }
})

const io = new Server(server);

// player consumer:
const consumePlayers = require('./consumers/players.js')
consumePlayers(io)

const PORT = 5050 || process.env.PORT
server.listen( PORT, () => console.log(`server running on http://localhost:${PORT}`.blue.bold.underline) )