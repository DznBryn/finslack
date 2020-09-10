import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MaskedInput from 'react-text-mask';
import { Redirect, Link } from 'react-router-dom';
import { set_alert } from '../../../actions/alert';
import { register } from '../../../actions/auth';
import BWSicon from '../../../bwsIcon.svg';
import {
	makeStyles,
	Grid,
	Paper,
	Container,
	TextField,
	Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: '93vh',
	},

	registerInnerContainer: {},
	iconPaperContainer: {
		width: '100px',
		background: '#212121',
		margin: '0 auto',
		padding: '1rem 0 2rem',
	},
	paperContainers: {
		background: '#212121',
		color: '#fff',
		padding: '1em',
		textAlign: 'center',
	},
	iconContainer: {
		width: '100px',
		margin: '0em auto',
		paddingBottom: '4em',
	},
	formContainer: {
		marginBottom: '0rem',
		width: '100%',
	},
	inputField: {
		marginBottom: '1rem',
		border: 'none',
	},
	inputFieldText: {
		color: '#fff !important',
	},
	registerButton: {},

	smallText: {
		fontSize: '16px',
		letterSpacing: '.5px',
		opacity: '0.7',
		textAlign: 'center',
	},
}));

const TextMaskCustom = ({ inputRef, ...other }) => {
	return (
		<MaskedInput
			{...other}
			ref={(ref) => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={[
				'(',
				/[1-9]/,
				/\d/,
				/\d/,
				')',
				' ',
				/\d/,
				/\d/,
				/\d/,
				'-',
				/\d/,
				/\d/,
				/\d/,
				/\d/,
			]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
};

TextMaskCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
};

const Register = ({ isAuth, set_alert, register, isJustRegistered }) => {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		phone: '(1  )    -    ',
		password: '',
		verify_password: '',
	});

	const {
		first_name,
		last_name,
		email,
		phone,
		password,
		verify_password,
	} = formData;

	const onChange = (e) =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== verify_password) {
			set_alert('Password do not match', 'error');
		}
		register({ first_name, last_name, email, phone, password });
	};

	if (isAuth) {
		return <Redirect to='/dashboard' />;
	}
	if (isJustRegistered) {
		return <Redirect to='/' />;
	}
	return (
		<Container maxWidth='sm' className={classes.root}>
			<form className={classes.formContainer} onSubmit={(e) => onSubmit(e)}>
				<Grid
					container
					justify='center'
					className={classes.registerInnerContainer}
					spacing={0}
				>
					<Grid item xs={12} sm={12}>
						<Paper
							className={classes.iconPaperContainer}
							elevation={0}
							square={true}
						>
							<img src={BWSicon} alt='BWS-Icon' />
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper
							className={classes.paperContainers}
							elevation={0}
							square={true}
						>
							<TextField
								type='text'
								placeholder='First Name'
								name='first_name'
								value={first_name}
								onChange={(e) => onChange(e)}
								className={classes.inputField}
								InputProps={{
									classes: {
										input: classes.inputFieldText,
									},
								}}
								fullWidth
								required
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper
							className={classes.paperContainers}
							elevation={0}
							square={true}
						>
							<TextField
								type='text'
								placeholder='Last Name'
								name='last_name'
								value={last_name}
								onChange={(e) => onChange(e)}
								className={classes.inputField}
								InputProps={{
									classes: {
										input: classes.inputFieldText,
									},
								}}
								fullWidth
								required
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper
							className={classes.paperContainers}
							elevation={0}
							square={true}
						>
							<TextField
								type='email'
								placeholder='Email'
								name='email'
								value={email}
								onChange={(e) => onChange(e)}
								className={classes.inputField}
								InputProps={{
									classes: {
										input: classes.inputFieldText,
									},
								}}
								fullWidth
								required
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper
							className={classes.paperContainers}
							elevation={0}
							square={true}
						>
							<TextField
								name='phone'
								value={phone}
								onChange={(e) => onChange(e)}
								InputProps={{
									inputComponent: TextMaskCustom,
								}}
								className={classes.inputField}
								fullWidth
								required
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Paper
							className={classes.paperContainers}
							elevation={0}
							square={true}
						>
							<TextField
								type='password'
								placeholder='Password'
								name='password'
								value={password}
								onChange={(e) => onChange(e)}
								className={classes.inputField}
								InputProps={{
									classes: {
										input: classes.inputFieldText,
									},
								}}
								fullWidth
								required
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Paper
							className={classes.paperContainers}
							elevation={0}
							square={true}
						>
							<TextField
								type='password'
								placeholder='Verify Password'
								name='verify_password'
								value={verify_password}
								onChange={(e) => onChange(e)}
								className={classes.inputField}
								InputProps={{
									classes: {
										input: classes.inputFieldText,
									},
								}}
								fullWidth
								required
							/>
						</Paper>
					</Grid>

					<Grid item xs={6}>
						<Paper
							className={classes.paperContainers}
							elevation={0}
							square={true}
						>
							<Button type='submit' variant='outlined' color='primary'>
								Sign Up
							</Button>
						</Paper>
					</Grid>
				</Grid>
			</form>
			<Grid item xs={12}>
				<Paper className={classes.paperContainers} elevation={0} square={true}>
					<p className='sign-up-text-container'>
						<small>
							Already have an account? <Link to='/login'>Login</Link>{' '}
						</small>
					</p>
				</Paper>
			</Grid>
		</Container>
	);
};

Register.propTypes = {
	set_alert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	isJustRegistered: state.auth.isJustRegistered,
});

export default connect(mapStateToProps, { set_alert, register })(Register);
