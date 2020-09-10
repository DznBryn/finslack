import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../../actions/auth';
import BWSicon from '../../../bwsIcon.svg';
import {
	Container,
	Grid,
	makeStyles,
	TextField,
	Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	loginContainer: {
		height: '93vh',
	},

	loginInnerContainer: {
		position: 'relative',
		top: '15%',
		left: '20%',
		bottom: 0,
		right: 0,
	},
	iconContainer: {
		width: '100px',
        margin: '0em auto',
        paddingBottom: '4em'
	},
	formContainer: {
		marginBottom: '3rem',
	},
	inputField: {
		marginBottom: '2rem',
		border: 'none',
	},
	inputFieldText: {
		color: '#fff !important',
	},
	loginButton: {},
        
	smallText: {
		fontSize: '16px',
		letterSpacing: '.5px',
		opacity: '0.7',
		textAlign: 'center',
	},
}));



const Login = ({ login }) => {
	const classes = useStyles();

	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = loginData;

	const onChange = (e) =>
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
		});

	const onSubmit = async (e) => {
		e.preventDefault();
		login(email, password);
	};

	return (
		<Fragment>
			<Container className={classes.loginContainer} maxWidth='sm'>
				<Grid className={classes.loginInnerContainer} item xs={6}>
					<div className={classes.iconContainer}>
						<img src={BWSicon} alt='BWS-Icon' />
					</div>
					<form
						onSubmit={(event) => onSubmit(event)}
						className={classes.formContainer}
						autoComplete='off'
					>
						<div className='form-group'>
							<TextField
								type='email'
								placeholder='Email Address'
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
						</div>
						<div className='form-group'>
							<TextField
								type='password'
								placeholder='Password'
								name='password'
								minLength='8'
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
						</div>
						<Button
							className={classes.loginButton}
							type='submit'
                            variant='outlined'
                            color='primary'
							
						>
							Login
						</Button>
					</form>
					<p className={classes.smallText}>
						<small>
							Don't have an account? <Link to='/register'>Sign Up</Link>
						</small>
					</p>
				</Grid>
			</Container>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
