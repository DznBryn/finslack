const router = require('express').Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

router.post(
	'/',
	[
		check('email', 'Please input valid email').isEmail().normalizeEmail(),
		check('password', 'Password required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({
					errors: [
						{
							msg: 'Invalid Credentials',
						},
					],
				});
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({
					errors: [
						{
							msg: 'Invalid Credentials',
						},
					],
				});
			}

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

router.get('/:id', auth, async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('-password, -__v');
		res.json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('500 Server Error');
	}
});

router.get('/', auth, async (req, res) => {
	try {
		await User.find({ _id: req.user.id }, function (err, user) {
			User.populate(user, { path: 'current_channel' }, function (err, user) {
				res.send(user);
			});
		}).select('-password');
	} catch (error) {
		console.error(error.message);
		res.status(500).send('500 Server Error');
	}
});

module.exports = router;
