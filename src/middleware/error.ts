import { NextFunction, Request, Response } from 'express';
export const errorMiddleWare = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(error);

	if (error && error.errors) {
		let newErrors = {};
		let errors = error.errors;
		for (const key in errors) {
			newErrors = {
				...newErrors,
				[key]: errors[key].message,
			};
		}
		res.status(400).json({
			errors: newErrors,
		});
	} else {
		res.status(400).json({
			errors: error,
		});
	}
};
