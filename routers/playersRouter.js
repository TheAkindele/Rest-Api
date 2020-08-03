const express = require('express')
const playersController = require('../controllers/playersController')
const router = express.Router()

router.post('/postPlayer', playersController.createPlayer)
router.get('/getAll', playersController.getAllPlayers)
router.get('/:id', playersController.getOnePlayer)
router.patch('/:id', playersController.updatePlayer)
router.delete('/:id', playersController.deletePlayer)

module.exports = router