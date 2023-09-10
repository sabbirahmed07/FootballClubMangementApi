import * as mongoose from 'mongoose';
import validator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const MemberSchema = new Schema(
	{
		userName: {
			type: String,
			required: [true, 'Username Required'],
			unique: true,
			minlength: [3, 'Min Length 3'],
			index: true,
		},
		firstName: {
			type: String,
			required: [true, 'First Name Required'],
			minlength: [3, 'Min Length 3'],
		},
		lastName: {
			type: String,
			required: [true, 'Last Name Required'],
			minlength: [3, 'Min Length 3'],
		},
		dateOfBirth: {
			type: Date,
			required: true,
		},
		imageUrl: {
			type: String,
			required: [true, 'Image Required'],
		},
		wage: {
			type: Number,
			required: [true, 'Wage Required'],
		},
		country: {
			type: String,
			required: [true, 'Country Required'],
		},
		clubId: {
			type: Schema.Types.ObjectId,
			ref: 'Club',
			required: [true, 'Club Required'],
		},
	},
	{
		collation: { locale: 'en', strength: 2 },
	}
);

MemberSchema.plugin(validator, { message: '{PATH} must be unique' });
const MemberModel = mongoose.model('Member', MemberSchema);

export default MemberModel;
