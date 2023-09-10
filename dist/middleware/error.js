"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleWare = void 0;
const errorMiddleWare = (error, req, res, next) => {
    console.log(error);
    if (error && error.errors) {
        let newErrors = {};
        let errors = error.errors;
        for (const key in errors) {
            newErrors = Object.assign(Object.assign({}, newErrors), { [key]: errors[key].message });
        }
        res.status(400).json({
            errors: newErrors,
        });
    }
    else {
        res.status(400).json({
            errors: error,
        });
    }
};
exports.errorMiddleWare = errorMiddleWare;
