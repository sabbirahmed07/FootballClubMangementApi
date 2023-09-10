"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxLengthValidator = exports.minLengthValidator = void 0;
const minLengthValidator = (value) => value.length >= 3;
exports.minLengthValidator = minLengthValidator;
const maxLengthValidator = (value) => value.length <= 20;
exports.maxLengthValidator = maxLengthValidator;
