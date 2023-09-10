"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clubInputValidation = void 0;
const validators_1 = require("../utils/validators");
const clubInputValidation = (req, edit = false) => {
    const { name, establishedAt, owner, venue, description, manager, chairman } = req.body;
    const image = req.file;
    let isError = false;
    let errors = {};
    if (!name) {
        isError = true;
        errors.name = 'club name required';
    }
    else {
        if (!(0, validators_1.minLengthValidator)(name) || !(0, validators_1.maxLengthValidator)(name)) {
            isError = true;
            errors.name = 'club name needs to be between 3 and 20 Characters';
        }
    }
    if (!establishedAt) {
        isError = true;
        errors.name = 'establish date required';
    }
    if (!owner) {
        isError = true;
        errors.owner = 'owner name required';
    }
    else {
        if (!(0, validators_1.minLengthValidator)(owner) || !(0, validators_1.maxLengthValidator)(owner)) {
            isError = true;
            errors.owner = 'owner name needs to be between 3 and 20 Characters';
        }
    }
    if (!venue) {
        isError = true;
        errors.venue = 'venue required';
    }
    else {
        if (!(0, validators_1.minLengthValidator)(venue) || !(0, validators_1.maxLengthValidator)(venue)) {
            isError = true;
            errors.venue = 'venue needs to be between 3 and 20 Characters';
        }
    }
    if (!manager) {
        isError = true;
        errors.manager = 'manager name required';
    }
    else {
        if (!(0, validators_1.minLengthValidator)(manager) || !(0, validators_1.maxLengthValidator)(manager)) {
            isError = true;
            errors.manager = 'manager name needs to be between 3 and 20 Characters';
        }
    }
    if (!chairman) {
        isError = true;
        errors.chairman = 'chairman name required';
    }
    else {
        if (!(0, validators_1.minLengthValidator)(chairman) || !(0, validators_1.maxLengthValidator)(chairman)) {
            isError = true;
            errors.chairman = 'chairman name needs to be between 3 and 20 Characters';
        }
    }
    if (!description) {
        isError = true;
        errors.description = 'moto required';
    }
    else {
        if (!(0, validators_1.minLengthValidator)(description) || !(0, validators_1.maxLengthValidator)(description)) {
            isError = true;
            errors.description = 'moto needs to be between 3 and 20 Characters';
        }
    }
    if (!edit && !image) {
        isError = true;
        errors.clubLogoUrl = 'attach file not an image';
    }
    return {
        isError,
        errors,
    };
};
exports.clubInputValidation = clubInputValidation;
