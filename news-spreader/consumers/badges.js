const mongoose = require('mongoose')
const { Kafka } = require('kafkajs')
const { BROKER } = require('../config/env.js')
const { Player } = require('../models/Player.js')
const { Badge } = require('../models/Badge.js')
const colors = require('colors')

const kafka = new Kafka({
    clientId: 'badges-consumer',
    brokers: [BROKER]
})

const consumer = kafka.consumer({ groupId: 'journalists' })

async function consumeBadges() {
    await consumer.connect()
    await consumer.subscribe({ 
        topic: 'db.simulateur_pari.badges', 
        fromBeginning: true 
    })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log("badges event recieved".red.bold)
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

            let badge = await Badge.findById(evData.documentId)

            let playersIds = await Player.find().select('_id')
            playersIds.map( async ( id ) => {
                let res = await updatePlayer(id._id, badge, evData.update)
            })
        },
    })
}

async function updatePlayer( id, targetBadge, data){
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
            if( sport.name == targetBadge.sportName ){
                sport.leagues.forEach( league => {
                    if( league.name == targetBadge.leagueName ){
                        league.badges.forEach( badge => {
                            if( badge._id.toString() == targetBadge._id.toString() ){
                                keys.map( ( key, i ) => {
                                    badge[key] = values[i]
                                })
                            }
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

module.exports = consumeBadges