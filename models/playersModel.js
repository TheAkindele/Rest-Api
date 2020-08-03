const mongoose = require('mongoose')

const PlayersSchema = new mongoose.Schema({
    name: String,
    age: Number,
    club: String,
    uclChampion: Boolean,
    country: String
})

module.exports = mongoose.model('Players', PlayersSchema)