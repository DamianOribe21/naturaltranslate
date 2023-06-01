const express = require('express')
const translateRouter = require('./translateRoutes')
const router = express.Router()

router.use('/translate', translateRouter)

module.exports = router;
