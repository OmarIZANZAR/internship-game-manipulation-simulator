const mongoose = require('mongoose')

const BadgeSchema = mongoose.Schema({
    name: String,
    description: String,
    sportName: String,
    leagueName: String,
    coins: Number,
    level: { 
        type: Number, 
        enum: [1, 2, 3], 
        default: 1 
    },
    options: {},
    createdAt: { type: Date, default: Date.now }
})

const Badge = mongoose.model('Badge', BadgeSchema)
module.exports = { BadgeSchema, Badge}
