const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Channels = require('../../models/Channels');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

// @route   GET api/channels/
// @desc    Get all channels
// @access  Private

router.get('/', auth, async (req, res) => {
	try {
		const channels = await Channels.find().sort({ date: -1 });
		res.json(channels);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('500 Server Error');
	}
});

// @route   GET api/channels/:id
// @desc    Get channel by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {
		const channel = await Channels.findOne({
			_id: req.params.id,
		});


		if (!channel) {
			console.log('Channel not found');
			return res.status(400).json({ msg: 'Channel not found' });
		}

		res.json(channel);
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			console.log('Channel not found');
			return res.status(400).json({ msg: 'Channel not found' });
		}
		res.status(500).send('500 Server Error');
	}
});

// @route   POST api/channels/
// @desc    Create a channel
// @access  Private
router.post(
	'/',
	[auth, [check('channel_name', 'Channel name required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { channel_name } = req.body;

		try {
			let channel = await Channels.findOne({ channel_name });

			if (channel) {
				console.log('Channel exists');
				return res.status(400).json({
					errors: [
						{
							msg: 'Channel exists',
						},
					],
				});
			}

			channel = new Channels({
				channel_name,
			});
			channel.channel_admins.unshift({ user: req.user.id });
			await channel.save();
			res.json(channel);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('500 Server Error');
		}
	}
);

// @route   UPDATE api/channels/channel/:id
// @desc    UPDATE channel
// @access  Private
router.put(
	'/channel/:id',
	[auth, [check('channel_name', 'Must not leave blank.').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { channel_name } = req.body;

		const updateChannel = {};

		updateChannel._id = req.params.id;

		if (channel_name.trim()) updateChannel.channel_name = channel_name;

		try {
			let channel = await Channels.findById({ _id: req.params.id });
			if (channel) {
				channel = await Channels.findByIdAndUpdate(
					{ _id: req.params.id },
					{ $set: updateChannel },
					{ new: true }
				);
				return res.json(channel);
			}
		} catch (error) {
			console.error(error.message);
			if (error.keyValue.channel_name === updateChannel.channel_name) {
				console.log('Channel name exist');
				return res.status(400).json({ msg: 'Channel name exist' });
			}
			res.status(500).send('500 Server Error');
		}
	}
);

// @route   UPDATE api/channels/channel/:id/channel_admin
// @desc    UPDATE channel admins
// @access  Private
router.put(
	'/channel/:id/channel-admin',
	[auth, [check('user', 'Must not leave blank.').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { user } = req.body;

		try {
			if (!user.trim()) {
				console.log('User does not exist');
				return res.status(400).json({ msg: 'User does not exist' });
			}

			const existing_user = await User.findById({ _id: user });

			if (!existing_user) {
				console.log('User does not exist');
				return res.status(400).json({ msg: 'User does not exist' });
			}

			const channel = await Channels.findById({ _id: req.params.id });

			await channel.channel_admins.map((admin, index) => {
				if (admin.user == user) {
					console.log('User already an admin');
					return res.status(400).json({ msg: 'User already an admin' });
				}
			});

			channel.channel_admins.unshift({ user });

			await channel.save();
			res.json(channel.channel_admins);
		} catch (error) {
			console.error(error.message);
			if (error.kind === 'ObjectId') {
				console.log('Channel does not exist');
				return res.status(400).json({ msg: 'Channel does not exist' });
			}
			res.status(500).send('500 Server Error');
		}
	}
);

// @route   DELETE api/channels/channel/:id/channel_admin/:admin_id
// @desc    REMOVE channel admin
// @access  Private
router.delete(
	'/channel/:id/channel-admin/:admin_id',
	auth,
	async (req, res) => {
		try {
			const channel = await Channels.findOne({ _id: req.params.id });
			const removeAdmin = channel.channel_admins
				.map((admin) => admin.user)
				.indexOf(req.params.admin_id);

			if (removeAdmin === -1) {
				console.log('User is not an admin');
				return res.status(400).json({ msg: 'User is not an admin' });
			}
			channel.channel_admins.splice(removeAdmin, 1);

			if (channel.channel_admins.length < 1) {
				console.log('There must be atleast 1 admin');
				return res.status(400).json({ msg: 'There must be atleast 1 admin' });
			}

			await channel.save();

			console.log('Admin removed');
			res.json(channel.channel_admins);
		} catch (error) {
			console.error(error.message);
			if (error.kind === 'ObjectId') {
				console.log('Channel or User does not exist');
				return res.status(400).json({ msg: 'Channel or User does not exist' });
			}
			res.status(500).send('500 Server Error');
		}
	}
);

// @route   GET api/channels/channel/:id/channel_members
// @desc    Add member to chat
// @access  Private
router.put(
	'/channel/:id/channel-members',
	[auth, [check('user', 'Must not leave blank.').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { user } = req.body;

		try {
			if (!user.trim()) {
				console.log('User does not exist');
				return res.status(400).json({ msg: 'User does not exist' });
			}
			const existing_user = await User.findById({ _id: user });

			if (!existing_user) {
				console.log('User does not exist');
				return res.status(400).json({ msg: 'User does not exist' });
			}

			const channel = await Channels.findById({ _id: req.params.id });

			await channel.channel_members.map((admin) => {
				if (admin.user == user) {
					console.log('User exist');
					return res.status(400).json({ msg: 'User exist' });
				} else {
					channel.channel_members.unshift({ user });
				}
			});

			await channel.save();
			res.json(channel);
		} catch (error) {
			console.error(error.message);
			if (error.kind === 'ObjectId') {
				console.log('Channel does not exist');
				return res.status(400).json({ msg: 'Channel does not exist' });
			}
			res.status(500).send('500 Server Error');
		}
	}
);

// @route   DELETE api/channels/channel/:id/channel_memebers/:member_id
// @desc    Remove member from channel
// @access  Private
router.delete(
	'/channel/:id/channel-members/:member_id',
	auth,
	async (req, res) => {
		try {
			const channel = await Channels.findOne({ _id: req.params.id });
			const removeAdmin = channel.channel_members
				.map((member) => member.user)
				.indexOf(req.params.member_id);

			if (removeAdmin === -1) {
				console.log('User is not in channel');
				return res.status(400).json({ msg: 'User is not in channel' });
			}
			channel.channel_members.splice(removeAdmin, 1);

			await channel.save();

			console.log('Member left');
			res.json(channel.channel_members);
		} catch (error) {
			console.error(error.message);
			if (error.kind === 'ObjectId') {
				console.log('Channel or user does not exist');
				return res.status(400).json({ msg: 'Channel or User does not exist' });
			}
			res.status(500).send('500 Server Error');
		}
	}
);

// @route   Get api/channels/channel/:id/feed
// @desc    Get Channel feed
// @access  Private
router.get('/channel/:id/feed', auth, async (req, res) => {
	try {
		const feed = await Channels.findOne({ _id: req.params.id });
		res.json(feed.channel_feed);
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			console.log('Channel does not exist');
			return res.status(400).json({ msg: 'Channel does not exist' });
		}
		res.status(500).json('500 Server Error');
	}
});

// @route   POST api/channels/channel/:id/feed
// @desc    User Send message to feed
// @access  Private
router.post(
	'/channel/:id/feed',
	[
		auth,
		[
			check('username', 'Must not be left blank').not().isEmpty(),
			check('message', 'Cannot leave blank').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let { username, message } = req.body;

		try {
			const feed = await Channels.findOne({ _id: req.params.id });
			const user = await User.findOne({ _id: req.user.id });

			// const salt = await bcrypt.genSalt(10);
			// message = await bcrypt.hash(message, salt);

			const sender_message = {
				user: req.user.id,
				username,
				message,
			};
			console.log(user);
			feed.channel_feed.push(sender_message);
			await feed.save();
			res.json(feed);
		} catch (error) {
			console.error(error.message);
			if (error.kind === 'ObjectId') {
				console.log('Channel does not exist');
				return res.status(400).json({ msg: 'Channel does not exist' });
			}
			res.status(500).json('500 Server Error');
		}
	}
);

// @route   DELETE api/channels/channel/:id/feed/:message_id
// @desc    User delete their message from feed
// @access  Private

router.delete('/channel/:id/feed/:message_id', auth, async (req, res) => {
	try {
		const feed = await Channels.findOne({ _id: req.params.id });
		const removeMessage = feed.channel_feed
			.map((item) => item.id)
			.indexOf(req.params.message_id);

		feed.channel_feed.filter((item) => {
			if (removeMessage == -1) {
				return res.status(400).json({ msg: 'Message not found' });
			}
			if (item.user == req.user.id && removeMessage !== -1) {
				return feed.channel_feed.splice(removeMessage, 1);
			}
			if (item.user !== req.user.id && removeMessage !== -1) {
				return res
					.status(400)
					.json({ msg: 'This User cannot remove another Auth User message' });
			}
		});
		await feed.save();
		res.json(feed);
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			console.log('Channel does not exist');
			return res.status(400).json({ msg: 'Channel does not exist' });
		}
		res.status(500).json('500 Server Error');
	}
});

module.exports = router;
