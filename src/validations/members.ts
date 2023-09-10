import { Request } from 'express';
import { maxLengthValidator, minLengthValidator } from '../utils/validators';
import { ErrorMembers } from '../types/errorTypes';

export const memberInputValidation = (req: Request) => {
	const { userName, firstName, lastName, dateOfBirth, wage, country, clubId } =
		req.body;

	let isError: boolean = false;
	let errors = {} as ErrorMembers;

	if (!userName) {
		isError = true;
		errors.userName = 'username required';
	} else {
		if (!minLengthValidator(userName) || !maxLengthValidator(userName)) {
			isError = true;
			errors.userName = 'club name needs to be between 3 and 20 Characters';
		}
	}

	if (!dateOfBirth) {
		isError = true;
		errors.dateOfBirth = 'date Of birth required';
	}

	if (!firstName) {
		isError = true;
		errors.firstName = 'first name required';
	} else {
		if (!minLengthValidator(firstName) || !maxLengthValidator(firstName)) {
			isError = true;
			errors.firstName =
				'first Name name needs to be between 3 and 20 Characters';
		}
	}

	if (!lastName) {
		isError = true;
		errors.lastName = 'lastName required';
	} else {
		if (!minLengthValidator(lastName) || !maxLengthValidator(lastName)) {
			isError = true;
			errors.lastName = 'last name needs to be between 3 and 20 Characters';
		}
	}

	if (!wage) {
		isError = true;
		errors.wage = 'wage name required';
	}

	if (!country) {
		isError = true;
		errors.country = 'country name required';
	} else {
		if (!minLengthValidator(country) || !maxLengthValidator(country)) {
			isError = true;
			errors.country = 'country needs to be between 3 and 20 Characters';
		}
	}

	if (!clubId) {
		isError = true;
		errors.clubId = 'club required';
	}

	return {
		isError,
		errors,
	};
};
