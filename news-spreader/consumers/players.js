const { Kafka } = require('kafkajs')
const { BROKER } = require('../config/env.js')
const colors = require('colors')


const kafka = new Kafka({
    clientId: 'players-consumer',
    brokers: [BROKER]
})

const consumer = kafka.consumer({ groupId: 'players-journalists' })

async function consumePlayers(io) {
    await consumer.connect()
    await consumer.subscribe({ topic: 'db.simulateur_pari.players', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log("players event recieved".red.bold)
            // console.log(JSON.stringify(message))

            const decodedKey = JSON.parse(message.key.toString())
            const documentId = JSON.parse(decodedKey.payload.id)

            // console.log({
            //     decodedKey,
            //     documentId
            // })
            
            io.emit('player-changed', documentId.$oid)
        },
    })
}

module.exports = consumePlayers