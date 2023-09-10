import * as mongoose from 'mongoose';
import validator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const ClubSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Club Name Required'],
			unique: true,
			minlength: [3, 'Min Length 3'],
		},
		establishedAt: {
			type: Date,
			required: [true, 'Established Date Required'],
		},
		owner: {
			type: String,
			required: [true, 'Owner Required'],
			minlength: [3, 'Min Length 3'],
		},
		manager: {
			type: String,
			required: [true, 'Manager Required'],
			minlength: [3, 'Min Length 3'],
		},
		venue: {
			type: String,
			required: [true, 'Venue Required'],
			minlength: [3, 'Min Length 3'],
		},
		chairman: {
			type: String,
			required: [true, 'Chairman Required'],
			minlength: [3, 'Min Length 3'],
		},
		description: {
			type: String,
			required: [true, 'Description Required'],
			unique: true,
			minlength: [3, 'Min Length 3'],
		},
		clubLogoUrl: {
			type: String,
			required: [true, 'Logo Required'],
		},
	},
	{
		collation: { locale: 'en', strength: 2 },
	}
);

ClubSchema.plugin(validator, {
	message: '{PATH} field must be unique.',
});

const ClubModel = mongoose.model('Club', ClubSchema);

export default ClubModel;
