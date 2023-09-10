"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const member_1 = require("../controllers/member");
const router = express_1.default.Router();
router.get('/', member_1.getmembers);
router.post('/', member_1.createMember);
router.get('/:memberId', member_1.getMember);
router.put('/:memberId', member_1.updateMember);
router.delete('/:memberId', member_1.deleteMember);
exports.default = router;
