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
const MemberSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'Username Required'],
        unique: true,
        minlength: [3, 'Min Length 3'],
        index: true,
    },
    firstName: {
        type: String,
        required: [true, 'First Name Required'],
        minlength: [3, 'Min Length 3'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name Required'],
        minlength: [3, 'Min Length 3'],
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    imageUrl: {
        type: String,
        required: [true, 'Image Required'],
    },
    wage: {
        type: Number,
        required: [true, 'Wage Required'],
    },
    country: {
        type: String,
        required: [true, 'Country Required'],
    },
    clubId: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, 'Club Required'],
    },
}, {
    collation: { locale: 'en', strength: 2 },
});
MemberSchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH} must be unique' });
const MemberModel = mongoose.model('Member', MemberSchema);
exports.default = MemberModel;
