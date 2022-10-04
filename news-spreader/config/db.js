const mongodb = require('mongodb')
const mongoose = require('mongoose')
const { DB_URI } = require('./env.js')

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

async function connectDB(){
    let connection;
    try {
        connection = await mongoose.connect(DB_URI, connectOptions)
        console.log(`DB connected to ${connection.connection.name}`.green.bold.underline)
    } catch (error) {
        console.log(`FAILED TO CONNECT TO DB ${error}`.red.bold)
    }
}

module.exports = connectDB