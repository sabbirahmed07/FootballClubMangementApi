import { Request, Response, NextFunction } from 'express';
import MemberModel from '../models/members';
import { memberInputValidation } from '../validations/members';

export const getmembers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await MemberModel.find().populate('clubId');

		if (result) {
			res.status(200).json({
				message: 'Successfully fetched Members',
				data: result,
			});
		}
	} catch (error: any) {
		error.message = 'Could Not Fetch Members';
		return next(error);
	}
};

export const createMember = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			userName,
			firstName,
			lastName,
			dateOfBirth,
			wage,
			country,
			clubId,
		} = req.body;

		const image = req.file;
		const { errors, isError } = memberInputValidation(req);
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

		const member: any = new MemberModel({
			userName,
			firstName,
			lastName,
			dateOfBirth,
			imageUrl,
			wage,
			country,
			clubId,
		});

		const result = await member.save();

		if (result) {
			res.status(200).json({
				message: 'Successfully Created A Member',
				data: result,
			});
		}
	} catch (error) {
		return next(error);
	}
};

export const getMember = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const memberId = req.params.memberId;

		const result = await MemberModel.findById(memberId).populate('clubId');

		res.status(200).json({
			message: 'Member Fetched Successfully',
			data: result,
		});
	} catch (error: any) {
		error.message = 'Could Not Found The Member';
		return next(error);
	}
};

export const updateMember = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const memberId = req.params.memberId;

	const { userName, firstName, lastName, dateOfBirth, wage, country, clubId } =
		req.body;

	let image = req.file;

	const { errors, isError } = memberInputValidation(req);
	if (isError) {
		return res.status(400).json({
			errors: errors,
		});
	}

	try {
		let member: any = await MemberModel.findById(memberId);
		member.userName = userName;
		member.firstName = firstName;
		member.lastName = lastName;
		member.imageUrl = image ? image.path : member.imageUrl;
		member.dateOfBirth = dateOfBirth;
		member.wage = wage;
		member.clubId = clubId;
		member.country = country;

		const result = await member.save();

		res.status(200).json({
			message: 'Successfully Updated A Member',
			data: result,
		});
	} catch (error) {
		return next(error);
	}
};

export const deleteMember = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const memberId = req.params.memberId;
		const removeMember = await MemberModel.findByIdAndRemove(memberId);
		if (removeMember) {
			res.status(200).json({
				message: 'Successfully deleted member',
			});
		}
	} catch (error: any) {
		error.message = 'Could Not Delete The Member';
		return next(error);
	}
};
