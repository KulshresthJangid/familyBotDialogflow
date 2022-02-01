const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const familyController = require('../controllers/familyControllers')
const Family = require('../models/familySchema')

router.get('/family', familyController.hello)

router.post('/addSuperParents', familyController.addSuperParents)

module.exports = router