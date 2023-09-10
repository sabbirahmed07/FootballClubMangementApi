"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const Schema = mongoose.Schema;
const ClubSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Club Name Required'],
        unique: true,
        minlength: [3, 'Min Length 3'],
    },
    establishedAt: {
        type: Date,
        required: [true, 'Established Date Required'],
    },
    owner: {
        type: String,
        required: [true, 'Owner Required'],
        minlength: [3, 'Min Length 3'],
    },
    manager: {
        type: String,
        required: [true, 'Manager Required'],
        minlength: [3, 'Min Length 3'],
    },
    venue: {
        type: String,
        required: [true, 'Venue Required'],
        minlength: [3, 'Min Length 3'],
    },
    chairman: {
        type: String,
        required: [true, 'Chairman Required'],
        minlength: [3, 'Min Length 3'],
    },
    description: {
        type: String,
        required: [true, 'Description Required'],
        unique: true,
        minlength: [3, 'Min Length 3'],
    },
    clubLogoUrl: {
        type: String,
        required: [true, 'Logo Required'],
    },
}, {
    collation: { locale: 'en', strength: 2 },
});
ClubSchema.plugin(mongoose_unique_validator_1.default, {
    message: '{PATH} field must be unique.',
});
const ClubModel = mongoose.model('Club', ClubSchema);
exports.default = ClubModel;
