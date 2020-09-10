import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT,
	USER_LOADED,
	USER_AUTH_ERROR,
} from '../actions/constants';

const initState = {
	token: localStorage.getItem('token'),
	isAuth: null,
	isJustRegistered: false,
	onlineStatus: false,
	loading: true,
	user: null,
};

export default function (state = initState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuth: true,
				onlineStatus: true,
				loading: false,
				user: payload,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuth: true,
				onlineStatus: true,
				loading: false,
			};
		case LOGIN_FAIL:
		case REGISTER_FAIL:
		case USER_AUTH_ERROR:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				...payload,
				token: null,
				isAuth: false,
				onlineStatus: false,
				loading: false,
				user: null,
			};
		case REGISTER_SUCCESS:
			localStorage.removeItem('token');
			return {
				...state,
				...payload,
				token: null,
				isAuth: false,
				isJustRegistered: true,
				loading: false,
			};
		default:
			return state;
	}
}
