const serverio = require('socket.io');
const {
	addMember,
	getMember,
	isOnline,
	getMembers,
	removeMember,
} = require('./handlers');

const socketio = (config) => {
	io = serverio(config.server);
	io.on('connection', (socket) => {
		console.log('New Client Connection ', socket.id);

		socket.on('join', ({ userId, userChannelId }, callback) => {
			config.users.findOne({ _id: userId }, (err, user) => {
				if (err) throw err;

				const userConfig = {
					id: socket.id,
					userId: user._id,
					firstName:
						user.first_name.toLowerCase()[0].toUpperCase() +
						user.first_name.slice(1),
					lastName:
						user.last_name.toLowerCase()[0].toUpperCase() +
						user.last_name.slice(1),
					channel: user.current_channel,
				};

				const { error, channelMember } = addMember(userConfig);

				if (error) return callback(error);

				socket.join(channelMember.channel);
				isOnline(userId);
				config.channels.findOne(
					{
						_id: channelMember.channel,
					},
					(error, channel) => {
						if (error) throw error;

						// socket.emit('load_messages', channel.channel_feed);

						const memberExist = channel.channel_members.find(
							(currentMember) => userId == currentMember.userId
						);

						if (!memberExist) {
							const newMember = {
								userId,
								username: userConfig.firstName + ' ' + userConfig.lastName,
								email: user.email,
								phone: user.phone,
							};

							channel.channel_members.push(newMember);

							channel.save();

							socket.broadcast
								.to(userChannelId)
								.emit('refresh_channel_list', newMember);
							socket.broadcast.to(userChannelId).emit('message', {
								username: 'Black Wall St',
								message: `${channelMember.username} has join the channel`,
							});
							console.log('user saved to channel');
						} else {
							socket.broadcast.to(userChannelId).emit('message', {
								username: 'Black Wall St',
								message: `${channelMember.username} is online`,
							});
						}

						socket.emit('load_channel_members', channel.channel_members);

						socket.emit(
							'load_online_members',
							getMembers(channelMember.channel)
						);
						console.log(getMembers(channelMember.channel));
					}
				);

				callback();
			});

			socket.on('send_message', (message, user_id, callback) => {
				const channelMember = getMember(user_id);
				config.channels.findOne(
					{
						_id: channelMember.channel._id,
					},
					(error, channel) => {
						if (error) throw error;

						channel.channel_feed.push({
							user: channelMember.userId,
							username: channelMember.username,
							message,
						});
						channel.save();
						io.sockets.emit('message', {
							user: channelMember.userId,
							username: channelMember.username,
							message,
						});
						console.log(channelMember.username);
					}
				);

				callback();
			});
		});

		socket.on('joinPrivate', ({ sender, receiver }, callback) => {
			socket.join(receiver);
			console.log('Socket: ', socket.rooms, sender, receiver);
			socket.emit('send_private_message');
		});

		socket.on('disconnect', () => {
			const channelMember = removeMember(socket.id);

			// config.channels.findOne(
			// 	{
			// 		_id: channelMember.channel,
			// 	},
			// 	(error, channel) => {
			// 		if (error) throw error;

			// 		channel.channel_members.map((savedMember) => {});
			// 	}
			// );

			if (channelMember) {
				console.log('Client has disconnected.');
			}
		});
	});
};

module.exports = socketio;
