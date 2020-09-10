import {
	GET_CHANNELS,
	GET_CHANNEL,
	LOGOUT,
	CHANNEL_JOIN_FAIL,
	CHANNEL_JOIN,
	CHANNEL_LEAVE,
	MESSAGE_SENT,
	MESSAGE_SENT_FAIL,
} from '../actions/constants';

const initState = {
	channel: null,
	channels: [],
	loading: true,
	error: {},
};

export default (state = initState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_CHANNELS:
			return {
				...state,
				channels: payload,
				loading: false,
			};
		case GET_CHANNEL:
		case CHANNEL_JOIN:
		case CHANNEL_LEAVE:
		case MESSAGE_SENT:
			return {
				...state,
				channel: payload,
				loading: false,
			};
		case CHANNEL_JOIN_FAIL:
		case MESSAGE_SENT_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				...payload,
				channel: null,
				channels: [],
			};
		default:
			return state;
	}
};
