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
exports.deleteClub = exports.updateClub = exports.getClub = exports.createClub = exports.getClubs = void 0;
const clubs_1 = __importDefault(require("../models/clubs"));
const getClubs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield clubs_1.default.find();
        if (response) {
            res.status(200).json({
                message: 'Successfully fetched club',
                data: response,
            });
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.getClubs = getClubs;
const createClub = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, establishedAt, owner, venue, description, manager, chairman, } = req.body;
        const image = req.file;
        if (!image) {
            return res.status(400).json({
                errors: {
                    clubLogoUrl: 'Attached File Is Not An Image',
                },
            });
        }
        const clubLogoUrl = image.path;
        const club = new clubs_1.default({
            name,
            establishedAt,
            owner,
            venue,
            clubLogoUrl,
            description,
            chairman,
            manager,
        });
        const saveClub = yield club.save();
        if (saveClub) {
            res.status(200).json({
                message: 'Successfully Created A Club',
                data: saveClub,
            });
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.createClub = createClub;
const getClub = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clubId = req.params.clubId;
        const getClub = yield clubs_1.default.findById(clubId);
        res.status(200).json({
            message: 'Club Fetched Successfully',
            data: getClub,
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.getClub = getClub;
const updateClub = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clubId = req.params.clubId;
        const { name, establishedAt, owner, venue, description, manager, chairman, } = req.body;
        let image = req.file;
        let club = yield clubs_1.default.findById(clubId);
        club.name = name;
        club.establishedAt = establishedAt;
        club.owner = owner;
        club.manager = manager;
        club.chairman = chairman;
        club.venue = venue;
        club.description = description;
        club.clubLogoUrl = image ? image.path : club.clubLogoUrl;
        const saveClub = yield club.save();
        if (saveClub) {
            res.status(200).json({
                message: 'Successfully Created A Club',
                data: saveClub,
            });
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.updateClub = updateClub;
const deleteClub = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clubId = req.params.clubId;
        const removeClub = yield clubs_1.default.findByIdAndRemove(clubId);
        if (removeClub) {
            res.status(200).json({
                message: 'Successfully deleted club',
            });
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.deleteClub = deleteClub;
