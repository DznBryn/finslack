const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const Channels = require('../../models/Channels');

router.post(
	'/',
	[
		check('first_name', 'Please enter your first name').not().isEmpty(),
		check('last_name', 'Please enter your last name').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail().normalizeEmail(),
		check('phone', 'Please enter your phone number')
			.not()
			.isEmpty()
			.trim()
			.isLength({ min: 10 }),

		check('password', 'Password must be 8 characters long').isLength({
			min: 8,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(401).json({ errors: errors.array() });
		}

		const { first_name, last_name, email, phone, password } = req.body;

		try {
			let user = await User.findOne({ email });
			const isPhoneExist = await User.findOne({ phone });
			const channels = await Channels.find();

			if (user || isPhoneExist) {
				return res.status(400).json({
					errors: [
						{
							msg: 'User exists',
						},
					],
				});
			}

			user = new User({
				first_name,
				last_name,
				email,
				phone,
				password,
				current_channel: channels[0],
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			// TODO: if user email does not exist, must send them an verification email before registering user to the database

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwt_Key'),
				{ expiresIn: 3600 },
				(error, token) => {
					if (error) throw error;
					res.json({ token });
				}
			);
		} catch (error) {
			console.log(error.message);
			res.status(500).send('500 Server Error');
		}
	}
);

module.exports = router;
