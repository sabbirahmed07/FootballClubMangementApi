"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clubs_1 = require("../controllers/clubs");
const router = express_1.default.Router();
router.get('/', clubs_1.getClubs);
router.post('/', clubs_1.createClub);
router.get('/:clubId', clubs_1.getClub);
router.put('/:clubId', clubs_1.updateClub);
router.delete('/:clubId', clubs_1.deleteClub);
exports.default = router;
