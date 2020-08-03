const playersSchema = require('../models/playersModel')
const { findById } = require('../models/playersModel')

// to create
const createPlayer = async (req, res) => {
    const player = req.body
    const addPlayer = new playersSchema({
        name: player.name,
        age: player.age,
        club: player.club,
        uclChampion: player.uclChampion,
        country: player.country
    })
    try {
        await addPlayer.save()
        res.json(addPlayer)
    } catch (error) {
        res.status(400).json({ msg: 'error in data creation', error })
    }
}

// To get all data
const getAllPlayers = async (req, res) => {
    const allPlayers = await playersSchema.find({})

    try {
        res.json(allPlayers)
    } catch (error) {
        res.status(400).json({ msg: 'cannot fetch data', error })
    }
}

//To get a single player
const getOnePlayer = async (req, res) => {
    const singlePlayer = await playersSchema.findById({ _id: req.params.id })

    try {
        res.json(singlePlayer)
    } catch (error) {
        res.status(400).json({ msg: `Player with ID ${req.params.id} not found`, error })
    }
}

//To update a player
const updatePlayer = async (req, res) => {
    try {
        const updatedPlayer = await playersSchema.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    age: req.body.age,
                    club: req.body.club,
                    uclChampion: req.body.uclChampion,
                    country: req.body.country
                }
            },
            { upsert: true }
        )
        playersSchema.save()
        res.json(updatedPlayer)
    } catch (error) {
        res.status(400).json({ msg: `No player with ID ${req.params.id} found`, error })
    }
}

const deletePlayer = async (req, res) => {

    try {
        const playerToDelete = await playersSchema.findByIdAndDelete({ _id: req.params.id })
        if (playerToDelete) {
            return res.json({ msg: 'player has been deleted' })
        }
    } catch (error) {
        res.status(400).json({ msg: `invalid player ID `, error })
    }
}

module.exports = { createPlayer, getAllPlayers, getOnePlayer, updatePlayer, deletePlayer }