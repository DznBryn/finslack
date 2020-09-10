const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
	channel_name: {
		type: String,
		required: true,
		unique: true,
	},
	channel_admins: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
		},
	],
	channel_members: [],
	channel_feed: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
			username: {
				type: String,
			},
			message: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now(),
			},
		},
	],
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = Channel = mongoose.model('channel', ChannelSchema);
