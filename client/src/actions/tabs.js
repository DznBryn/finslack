import { COMPONENT_RECEIVED, COMPONENT_RECEIVED_FAIL } from './constants';

export const loadComponent = (component) => (dispatch) => {
	try {
		dispatch({
			type: COMPONENT_RECEIVED,
			payload: component.toLowerCase(),
		});
	} catch (error) {
		dispatch({
			type: COMPONENT_RECEIVED_FAIL,
			payload: {
				msg: error.message,
			},
		});
	}
};


