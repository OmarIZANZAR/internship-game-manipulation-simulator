const mongoose = require('mongoose')
const { Kafka } = require('kafkajs')
const { BROKER } = require('../config/env.js')
const { Player } = require('../models/Player.js')
const { League } = require('../models/League.js')
const colors = require('colors')

const kafka = new Kafka({
    clientId: 'leagues-consumer',
    brokers: [BROKER]
})

const consumer = kafka.consumer({ groupId: 'leagues-journalists' })

async function consumeLeagues() {
    await consumer.connect()
    await consumer.subscribe({ 
        topic: 'db.simulateur_pari.leagues', 
        fromBeginning: true 
    })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log("leagues event recieved".red.bold)
            // console.log(JSON.stringify(message))
            
            const decodedKey = JSON.parse(message.key.toString())
            const decodedValue = JSON.parse(message.value.toString())

            // console.log({
            //     decodedKey,
            //     decodedValue,
            // })

            const documentId = JSON.parse(decodedKey.payload.id)
            const patch = JSON.parse(decodedValue.payload.patch)

            const evData = { 
                documentId: documentId.$oid, 
                update: patch.diff.u,
                source: decodedValue.payload.source,
            }

            let league = await League.findById(evData.documentId)

            let playersIds = await Player.find().select('_id')
            playersIds.map( async ( id ) => {
                let res = await updatePlayer(id._id, league, evData.update)
                // console.log(res)
            })
        },
    })
}

async function updatePlayer( id, targetLeague, data){
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return {isError: true, message: "player not found"}
    }

    try {
        const player = await Player.findById(id)

        if( player === null ){
            return {isError: true, message: "player not found"}
        }

        const keys = Object.keys(data)
        const values = Object.values(data)

        player.sports.forEach( sport => {
            if( sport.name == targetLeague.sportName ){
                sport.leagues.forEach( league => {
                    if( league._id.toString() == targetLeague._id.toString() ){
                        keys.map( ( key, i ) => {
                            league[key] = values[i]
                        })
                    }
                })
            }
        })
        
        const updatedPlayer = await Player.findByIdAndUpdate( player._id, player, { new: true} )

        return { isError: false, message: "player updated", player: updatedPlayer }
    } catch (err) {
        return {isError: true, message: "player not updated", info: err}
    }
}

module.exports = consumeLeagues