const mongoose = require('mongoose')

const connect = () => {
    mongoose.connect('mongodb+srv://aadityaneve:aadityaneve12$@cluster0.aiizm.mongodb.net/test')
}

module.exports = { connect }