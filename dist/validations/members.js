"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberInputValidation = void 0;
const validators_1 = require("../utils/validators");
const memberInputValidation = (req) => {
    const { userName, firstName, lastName, dateOfBirth, wage, country, clubId } = req.body;
    let isError = false;
    let errors = {};
    if (!userName) {
        isError = true;
        errors.userName = 'username required';
    }
    else {
        if (!(0, validators_1.minLengthValidator)(userName) || !(0, validators_1.maxLengthValidator)(userName)) {
            isError = true;
            errors.userName = 'club name needs to be between 3 and 20 Characters';
        }
    }
    if (!dateOfBirth) {
        isError = true;
        errors.dateOfBirth = 'date Of birth required';
    }
    if (!firstName) {
        isError = true;
        errors.firstName = 'first name required';
    }
    else {
        if (!(0, validators_1.minLengthValidator)(firstName) || !(0, validators_1.maxLengthValidator)(firstName)) {
            isError = true;
            errors.firstName =
                'first Name name needs to be between 3 and 20 Characters';
        }
    }
    if (!lastName) {
        isError = true;
        errors.lastName = 'lastName required';
    }
    else {
        if (!(0, validators_1.minLengthValidator)(lastName) || !(0, validators_1.maxLengthValidator)(lastName)) {
            isError = true;
            errors.lastName = 'last name needs to be between 3 and 20 Characters';
        }
    }
    if (!wage) {
        isError = true;
        errors.wage = 'wage name required';
    }
    if (!country) {
        isError = true;
        errors.country = 'country name required';
    }
    else {
        if (!(0, validators_1.minLengthValidator)(country) || !(0, validators_1.maxLengthValidator)(country)) {
            isError = true;
            errors.country = 'country needs to be between 3 and 20 Characters';
        }
    }
    if (!clubId) {
        isError = true;
        errors.clubId = 'club required';
    }
    return {
        isError,
        errors,
    };
};
exports.memberInputValidation = memberInputValidation;
