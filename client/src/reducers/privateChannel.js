import {
	START_PRIVATE_MESSAGE,
	START_PRIVATE_MESSAGE_FAIL,
} from '../actions/constants';

const initState = {
	receiver: null,
	loading: true,
	errors: {},
};

export default (state = initState, action) => {
	const { type, payload } = action;

	switch (type) {
		case START_PRIVATE_MESSAGE:
			return {
				...state,
				receiver: payload,
				loading: false,
			};
		case START_PRIVATE_MESSAGE_FAIL:
			return {
				...state,
				loading: false,
				errors: {},
			};
		default:
			return state;
	}
};
