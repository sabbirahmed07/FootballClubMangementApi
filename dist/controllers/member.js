"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.updateMember = exports.getMember = exports.createMember = exports.getmembers = void 0;
const members_1 = __importDefault(require("../models/members"));
const members_2 = require("../validations/members");
const getmembers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield members_1.default.find().populate('clubId');
        if (result) {
            res.status(200).json({
                message: 'Successfully fetched Members',
                data: result,
            });
        }
    }
    catch (error) {
        error.message = 'Could Not Fetch Members';
        return next(error);
    }
});
exports.getmembers = getmembers;
const createMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, firstName, lastName, dateOfBirth, wage, country, clubId, } = req.body;
        const image = req.file;
        const { errors, isError } = (0, members_2.memberInputValidation)(req);
        if (isError) {
            return res.status(400).json({
                errors: errors,
            });
        }
        if (!image) {
            return res.status(400).json({
                errors: {
                    imageUrl: 'Attached File Is Not An Image',
                },
            });
        }
        const imageUrl = image.path;
        const member = new members_1.default({
            userName,
            firstName,
            lastName,
            dateOfBirth,
            imageUrl,
            wage,
            country,
            clubId,
        });
        const result = yield member.save();
        if (result) {
            res.status(200).json({
                message: 'Successfully Created A Member',
                data: result,
            });
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.createMember = createMember;
const getMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memberId = req.params.memberId;
        const result = yield members_1.default.findById(memberId).populate('clubId');
        res.status(200).json({
            message: 'Member Fetched Successfully',
            data: result,
        });
    }
    catch (error) {
        error.message = 'Could Not Found The Member';
        return next(error);
    }
});
exports.getMember = getMember;
const updateMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = req.params.memberId;
    const { userName, firstName, lastName, dateOfBirth, wage, country, clubId } = req.body;
    let image = req.file;
    const { errors, isError } = (0, members_2.memberInputValidation)(req);
    if (isError) {
        return res.status(400).json({
            errors: errors,
        });
    }
    try {
        let member = yield members_1.default.findById(memberId);
        member.userName = userName;
        member.firstName = firstName;
        member.lastName = lastName;
        member.imageUrl = image ? image.path : member.imageUrl;
        member.dateOfBirth = dateOfBirth;
        member.wage = wage;
        member.clubId = clubId;
        member.country = country;
        const result = yield member.save();
        res.status(200).json({
            message: 'Successfully Updated A Member',
            data: result,
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.updateMember = updateMember;
const deleteMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memberId = req.params.memberId;
        const removeMember = yield members_1.default.findByIdAndRemove(memberId);
        if (removeMember) {
            res.status(200).json({
                message: 'Successfully deleted member',
            });
        }
    }
    catch (error) {
        error.message = 'Could Not Delete The Member';
        return next(error);
    }
});
exports.deleteMember = deleteMember;
