const mongoose = require('mongoose');
const db_config = require('config').get('mongoURI');
const socketio = require('./socket');

const connect_db = async (server) => {
	try {
		await mongoose.connect(
			db_config,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false,
			},
			(error, db) => {
				console.log('Database Connected.');

				// let channels = await Channels.findById('5f161440306c151cc4263cb3');
				const channels = db.model('channel')
				const users = db.model('user')

				
				const config = {
					server,
					channels,
					users
				}
				
				
				socketio(config)

				
			}
		);
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

module.exports = connect_db;
