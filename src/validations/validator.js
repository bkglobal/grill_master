import { validationResult } from 'express-validator';

const validator = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).json({status: 422, errors: errors.array() })
    } else {
        next();
    }
}

const jsonValidator = (obj) => {
    if(!typeof obj === 'object') return {isValid: false, message: 'This is not an object'};
    if(!obj.hasOwnProperty('grill')) return {isValid: false, message: 'grill field is rquired'};
    if(!typeof obj.grill === 'object') return {isValid: false, message: 'grill shoule be an object'};
    if(!obj.grill.hasOwnProperty('width')) return {isValid: false, message: 'grill.width field is rquired'};
    if(!obj.grill.hasOwnProperty('height')) return {isValid: false, message: 'grill.height field is rquired'};
    if(!obj.grill.hasOwnProperty('grillItems')) return {isValid: false, message: 'grill.grillItems field is rquired'};
    if(!Array.isArray(obj.grill.grillItems)) return {isValid: false, message: 'grillItems should be array of object'};
    if(!obj.grill.grillItems[0]) return {isValid: false, message: 'At least one item in grillItems is required'};
    if(obj.grill.grillItems.filter(e => (!e.hasOwnProperty('width') || !e.hasOwnProperty('height') || !e.hasOwnProperty('count') || !e.hasOwnProperty('title')))[0])
    return {isValid: false, message: 'Kindly ensure the width height count and title field in grillItems object'};
    return {isValid: true, message: ''};
}

export {validator, jsonValidator};