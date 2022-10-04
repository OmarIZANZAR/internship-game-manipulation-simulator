// envirenment variables:
const PORT = 5000
const DB_USER = 'omar'
const DB_USER_PASSWORD = 'omar123'

const DB_URI = "mongodb://omar:omar123456@localhost:27019/simulateur_pari?authSource=admin&readPreference=primary&directConnection=true&ssl=false"

module.exports = {
    PORT,
    DB_USER,
    DB_USER_PASSWORD,
    DB_URI,
}