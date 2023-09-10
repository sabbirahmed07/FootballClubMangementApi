import express from 'express';
import {
	getmembers,
	createMember,
	getMember,
	updateMember,
	deleteMember,
} from '../controllers/member';
const router = express.Router();

router.get('/', getmembers);
router.post('/', createMember);
router.get('/:memberId', getMember);
router.put('/:memberId', updateMember);
router.delete('/:memberId', deleteMember);

export default router;
