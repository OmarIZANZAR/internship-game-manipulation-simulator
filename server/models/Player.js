const mongoose = require('mongoose')
const { BadgeSchema } = require('./Badge.js')

const PlayerSchema = mongoose.Schema({
    name: String,
    email: { type: String, index: "text" },
    sports: [{
        name: String,
        leagues: [{
            name: String,
            description: String,
            sportName: String,
            levels: { 
                type: [ Number ],
                default: [1]
            },
            badges: [ BadgeSchema ],
        }]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Player = mongoose.model('Player', PlayerSchema)
Player.createIndexes([ { name: "text" } ])

module.exports = { PlayerSchema, Player}
