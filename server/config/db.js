const mongoose = require('mongoose')
const { DB_URI } = require('./env.js')

const connOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}

const ConnectDB = async () => {
    return new Promise(async (resolve, reject)=>{
        try {
            const conn = await mongoose.connect(DB_URI, connOptions)
            console.log(`mongodb connected to db: ${conn.connection.name}...`.green.bold.underline)
            resolve(conn)
    
        } catch (error) {
            console.log('mongodb connection error'.red.bold)
            console.error(error)
            process.exit(1)
            reject(error)
        }
    })
} 

module.exports = ConnectDB