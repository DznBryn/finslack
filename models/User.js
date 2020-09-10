const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	last_login: [
		{
			type: Date,
		},
	],
	current_channel: {
		type: Schema.ObjectId,
		ref: 'channel',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model('user', UserSchema);
