import {
	COMPONENT_RECEIVED,
	COMPONENT_RECEIVED_FAIL,
} from '../actions/constants';

const initState = {
	component: '',
	componentData:{},
	loading: true,
	error: {},
};

export default (state = initState, action) => {
	const { type, payload } = action;
	switch (type) {
		case COMPONENT_RECEIVED:
			return {
				...state,
				component: payload,
				loading: false,
			};
		case COMPONENT_RECEIVED_FAIL:
			return {
				...state,
				component: '',
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};
