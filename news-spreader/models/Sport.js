const mongoose = require('mongoose')

const SportSchema = mongoose.Schema({
    name: String,
    leagues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'League' }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Sport = mongoose.model('Sport', SportSchema)
module.exports = { SportSchema, Sport}