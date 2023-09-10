import { Request } from 'express';
import { maxLengthValidator, minLengthValidator } from '../utils/validators';
import { ErrorClub } from '../types/errorTypes';

export const clubInputValidation = (req: Request, edit: boolean = false) => {
	const { name, establishedAt, owner, venue, description, manager, chairman } =
		req.body;

	const image = req.file;

	let isError: boolean = false;
	let errors = {} as ErrorClub;

	if (!name) {
		isError = true;
		errors.name = 'club name required';
	} else {
		if (!minLengthValidator(name) || !maxLengthValidator(name)) {
			isError = true;
			errors.name = 'club name needs to be between 3 and 20 Characters';
		}
	}

	if (!establishedAt) {
		isError = true;
		errors.name = 'establish date required';
	}

	if (!owner) {
		isError = true;
		errors.owner = 'owner name required';
	} else {
		if (!minLengthValidator(owner) || !maxLengthValidator(owner)) {
			isError = true;
			errors.owner = 'owner name needs to be between 3 and 20 Characters';
		}
	}

	if (!venue) {
		isError = true;
		errors.venue = 'venue required';
	} else {
		if (!minLengthValidator(venue) || !maxLengthValidator(venue)) {
			isError = true;
			errors.venue = 'venue needs to be between 3 and 20 Characters';
		}
	}

	if (!manager) {
		isError = true;
		errors.manager = 'manager name required';
	} else {
		if (!minLengthValidator(manager) || !maxLengthValidator(manager)) {
			isError = true;
			errors.manager = 'manager name needs to be between 3 and 20 Characters';
		}
	}

	if (!chairman) {
		isError = true;
		errors.chairman = 'chairman name required';
	} else {
		if (!minLengthValidator(chairman) || !maxLengthValidator(chairman)) {
			isError = true;
			errors.chairman = 'chairman name needs to be between 3 and 20 Characters';
		}
	}

	if (!description) {
		isError = true;
		errors.description = 'moto required';
	} else {
		if (!minLengthValidator(description) || !maxLengthValidator(description)) {
			isError = true;
			errors.description = 'moto needs to be between 3 and 20 Characters';
		}
	}

	if (!edit && !image) {
		isError = true;
		errors.clubLogoUrl = 'attach file not an image';
	}

	return {
		isError,
		errors,
	};
};
