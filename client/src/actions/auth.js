import axios from 'axios';
import { set_alert } from './alert';
import { setAuthToken } from '../components/utils/setAuthToken';
import {
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT,
	USER_AUTH_ERROR,
	USER_LOADED,
} from './constants';
import { leave_channel } from './channel';

export const load_user = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: USER_AUTH_ERROR,
		});
	}
};

export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('/api/auth', body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(load_user());

		// dispatch(joinChannel())
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(set_alert(error.msg, 'error')));
		}
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

export const register = ({
	first_name,
	last_name,
	email,
	phone,
	password,
}) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({
		first_name,
		last_name,
		email,
		phone,
		password,
	});

	try {
		const res = await axios.post('/api/users', body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(set_alert(error.msg, 'error')));
		}

		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

export const logout = () => (dispatch) => {
	window.location.reload()
	dispatch({
		type: LOGOUT,
	});
};
