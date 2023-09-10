import { Request, Response, NextFunction } from 'express';

import ClubModel from '../models/clubs';

export const getClubs = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const response = await ClubModel.find();
		if (response) {
			res.status(200).json({
				message: 'Successfully fetched club',
				data: response,
			});
		}
	} catch (error) {
		return next(error);
	}
};

export const createClub = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			name,
			establishedAt,
			owner,
			venue,
			description,
			manager,
			chairman,
		} = req.body;

		const image = req.file;

		if (!image) {
			return res.status(400).json({
				errors: {
					clubLogoUrl: 'Attached File Is Not An Image',
				},
			});
		}

		const clubLogoUrl = image.path;

		const club: any = new ClubModel({
			name,
			establishedAt,
			owner,
			venue,
			clubLogoUrl,
			description,
			chairman,
			manager,
		});

		const saveClub = await club.save();

		if (saveClub) {
			res.status(200).json({
				message: 'Successfully Created A Club',
				data: saveClub,
			});
		}
	} catch (error) {
		return next(error);
	}
};

export const getClub = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const clubId = req.params.clubId;
		const getClub = await ClubModel.findById(clubId);
		res.status(200).json({
			message: 'Club Fetched Successfully',
			data: getClub,
		});
	} catch (error) {
		return next(error);
	}
};

export const updateClub = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const clubId = req.params.clubId;

		const {
			name,
			establishedAt,
			owner,
			venue,
			description,
			manager,
			chairman,
		} = req.body;

		let image = req.file;

		let club: any = await ClubModel.findById(clubId);

		club.name = name;
		club.establishedAt = establishedAt;
		club.owner = owner;
		club.manager = manager;
		club.chairman = chairman;
		club.venue = venue;
		club.description = description;
		club.clubLogoUrl = image ? image.path : club.clubLogoUrl;

		const saveClub = await club.save();

		if (saveClub) {
			res.status(200).json({
				message: 'Successfully Created A Club',
				data: saveClub,
			});
		}
	} catch (error) {
		return next(error);
	}
};

export const deleteClub = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const clubId = req.params.clubId;
		const removeClub = await ClubModel.findByIdAndRemove(clubId);
		if (removeClub) {
			res.status(200).json({
				message: 'Successfully deleted club',
			});
		}
	} catch (error) {
		return next(error);
	}
};
