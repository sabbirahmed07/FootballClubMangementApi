import express from 'express';
import {
	getClubs,
	createClub,
	getClub,
	updateClub,
	deleteClub,
} from '../controllers/clubs';
const router = express.Router();

router.get('/', getClubs);
router.post('/', createClub);
router.get('/:clubId', getClub);
router.put('/:clubId', updateClub);
router.delete('/:clubId', deleteClub);

export default router;
