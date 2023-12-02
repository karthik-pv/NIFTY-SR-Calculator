const {calculateSRValuesJoi,calculateLatestNiftyValueJoi,displaySortedSRValuesJoi,niftyFuturesValueJoi} = require('../JoiVerification/NSRCalcJoi')
const {serverError , joiError} = require('../utils/errorHandler')

const color = { oneEMA200 : 'blue',
                fiveEMA200 : 'green',
                thirtyEMA200 : 'gray',
                twoHEMA200 : 'brown',
                dayEMA200 : 'red',
                niftyFutures : 'yellow'}

const name = {
    P: "P",
    R1: "R1",
    R2: "R2",
    S1: "S1",
    S2: "S2",
    oneEMA200: "1m EMA 200",
    fiveEMA200: "5m EMA 200",
    thirtyEMA200: "30m EMA 200",
    twoHEMA200: "2H EMA 200",
    dayEMA200: "D EMA 200",
    niftyFutures: "Nifty Futures"
}

const emaOrderedTags = [
    '1ema200',
    '5ema200',
    '3ema200',
    '2ema200',
    'dema200',
]

const ochlOrderedTags = [
    'open',
    'close',
    'high',
    'low'
]

module.exports.calculateSRValues = async (req,res)=>{
    try{
        let {open,close,high,low} = await calculateSRValuesJoi.validateAsync(req.body , {abortEarly : false})
        let SRValues = {}; 
        SRValues.P = Math.trunc((high+close+low)/3)
        SRValues.R1=Math.trunc((2*SRValues.P)-low);
        SRValues.S1=Math.trunc((2*SRValues.P)-high);
        SRValues.R2=Math.trunc(SRValues.P+(high-low));
        SRValues.S2=Math.trunc(SRValues.P-(high-low));
        res.status(200).json({
            SRValues
        })
    }
    catch(error){
        // sending joi validation error messages
        if(joiError(res,error))
            return;
        //unhandled server errors
        serverError(res,error);
    }
}

module.exports.calculateLatestNiftyValue = async (req,res)=> {
    try{
        let{gapDirection , niftyCashGap , niftyPrevClose} = await calculateLatestNiftyValueJoi.validateAsync(req.body)
        let newNiftyFutures = niftyPrevClose + (niftyCashGap*gapDirection)
        let niftyVal = {latestNiftyValue : newNiftyFutures}
        res.status(200).json({
            niftyVal
        })
    }

    catch(error){
        // sending joi validation error messages
        if(joiError(res,error))
            return;
        //unhandled server errors
        serverError(res,error);
    }
}

module.exports.displaySortedSRValues = async(req,res)=>{
    try{
        let SRValues = await displaySortedSRValuesJoi.validateAsync(req.body.SRV)
        let niftyFutures = await niftyFuturesValueJoi.validateAsync(req.body.nifty)
        for (let key in SRValues) {
            // Check if the value is an array
            if (Array.isArray(SRValues[key])) {
                let gap = SRValues[key][0] - niftyFutures;
                SRValues[key].push(gap);
                if(key in color){
                    SRValues[key].push(color[key]);
                }
                else{
                    SRValues[key].push("");
                }
                SRValues[key].push(name[key])
                
            } else {
                // If it's not an array, convert it to an array
                SRValues[key] = [SRValues[key]];
            }
        }
        //sortedSRValues = SRValues.values(SRValues).sort()

        const sortedKeys = Object.keys(SRValues).sort((a, b) => {
            return SRValues[a][0] - SRValues[b][0];
        });
        
        // Create a new object with sorted properties
        const sortedSRValues = {};
        sortedKeys.forEach(key => {
            sortedSRValues[key] = SRValues[key];
        });

        res.status(200).json({
            sortedSRValues
        }) 
    }
    catch(error){
        // sending joi validation error messages
        if(joiError(res,error))
            return;
        //unhandled server errors
        serverError(res,error);
    }
}