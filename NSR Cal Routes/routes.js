const router = require('express').Router()

const {calculateSRValues,calculateLatestNiftyValue,displaySortedSRValues,readCSV} = require('../NSRControllers/controller')

router.post('/calculateSRValues' , calculateSRValues);
router.post('/calculateLatestNiftyValue',calculateLatestNiftyValue);
router.post('/displaySortedSRValues' , displaySortedSRValues);


module.exports = router