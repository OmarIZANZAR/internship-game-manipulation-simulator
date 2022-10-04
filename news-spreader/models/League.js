const mongoose = require('mongoose')

const LeagueSchema = mongoose.Schema({
    name: String,
    description: String,
    sportName: String,
    levels: { 
        type: [ Number ],
        default: [1]
    },
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const League = mongoose.model('League', LeagueSchema)
module.exports = { LeagueSchema, League}