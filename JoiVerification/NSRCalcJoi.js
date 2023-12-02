const Joi = require('joi')

const calculateSRSharedValidation = Joi.number().min(1).required()

const calculateSRValuesJoi = Joi.object({

    open : calculateSRSharedValidation,

    close : calculateSRSharedValidation,

    high : calculateSRSharedValidation,

    low : calculateSRSharedValidation,
})

const calculateLatestNiftyValueJoi = Joi.object({

    gapDirection : Joi.number().valid(1,-1).required(),

    niftyPrevClose : Joi.number().min(1).required(),

    niftyCashGap : Joi.number().min(0).required()
})

const displaySharedValidation = Joi.array().items(Joi.number().required());

const displaySortedSRValuesJoi = Joi.object({

    oneEMA200: displaySharedValidation,
    fiveEMA200: displaySharedValidation,
    dayEMA200: displaySharedValidation,
    thirtyEMA200: displaySharedValidation,
    twoHEMA200: displaySharedValidation,
    P: displaySharedValidation,
    R1: displaySharedValidation,
    S1: displaySharedValidation,
    R2: displaySharedValidation,
    S2: displaySharedValidation,
    niftyFutures: displaySharedValidation
})

const niftyFuturesValueJoi = Joi.number().min(1).required()

module.exports = {calculateSRValuesJoi,calculateLatestNiftyValueJoi,displaySortedSRValuesJoi,niftyFuturesValueJoi}