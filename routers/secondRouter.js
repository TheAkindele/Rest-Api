const express = require('express')
const router = express.Router()
const playerSchema = require('../models/playersModel')

//to post
router.post('/create', async (req, res) => {
    const newPlayer = new playerSchema({
        name: req.body.name,
        age: req.body.age,
        club: req.body.club,
        uclChampion: req.body.uclChampion,
        country: req.body.country
    })

    try {
        await newPlayer.save()
        res.json(newPlayer)
    } catch (error) {
        res.status(404).json({ msg: 'unable to add player' }, error)
    }
})

//get all documents
router.get('/all', async (req, res) => {
    const allPlayers = await playerSchema.find({})
    try {
        await res.json(allPlayers)
    } catch (error) {
        res.status(404).json({ msg: 'Error in request', error })
    }
})

//get single document
router.get('/:id', async (req, res) => {
    const player = await playerSchema.find({ _id: req.params.id })
    try {
        res.json(player)
    } catch (error) {
        res.status(404).json({ msg: `No player with ID ${req.params.id} found`, error })
    }
})

//patch a document
router.patch('/:id', async (req, res) => {
    const playerToUpdate = await playerSchema.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name, age: req.body.age, uclChampion: req.body.uclChampion } },
        { upsert: true }
    )
    try {
        res.json(playerToUpdate)
    } catch (error) {
        res.status(404).json({ msg: 'Error in request', error })
    }
})

//using put
router.put('/:id', async (req, res) => {
    const playerToUpdate = await playerSchema.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name, age: req.body.age, uclChampion: req.body.uclChampion } },
        { upsert: true }
    )
    try {
        res.json(playerToUpdate)
    } catch (error) {
        res.status(404).json({ msg: 'Error in request', error })
    }
})

router.delete('/:id', async (req, res) => {
    const deletePlayer = await playerSchema.findByIdAndDelete({ _id: req.params.id })
    if (deletePlayer) {
        res.json({ msg: 'player deleted' })
    }
    else {
        res.status(404).json({ msg: 'cannot delete invalid player', error })
    }
})

module.exports = router
