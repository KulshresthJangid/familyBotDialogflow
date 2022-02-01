const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const dfff = require('dialogflow-fulfillment')
const botController = require('../controllers/dialogflow')

router.post('/bot', botController.answers)
module.exports = router
