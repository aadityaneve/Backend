const { connect } = require('./configs/db')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())

const start = async () => {
    await connect()
    app.listen(PORT, async () => {
        console.log(`LISTENING ON PORT ${PORT}`)
    })
}

module.exports = {
    app,
    start
}