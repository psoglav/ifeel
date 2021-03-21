require('dotenv/config')

const chat = require('../models/chat')

var currentStage = 1

const stage = () => {
    const total = Object.keys(log).length
    return `[${currentStage++}/${total}]`
}

const error = (s) => {
    console.log(`❌ ${stage()} ${s}`)
    process.exit(1)
}

const success = (s) => console.log(`✔ ${stage()} ${s}`)

const log = {
    init() {
        const port = process.env.PORT || 8080
        success('iFeel'.cyan + ` is running on http://localhost:${port}`)
    },
    databaseConnection(err) {
        if (err) {
            error(err.message)
        } else {
            success('Database connected')
        }
    },
}


module.exports = log