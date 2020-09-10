import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './constants';

export const set_alert = (message, alert_type) => (dispatch) => {
	const id = uuid();

	dispatch({
		type: SET_ALERT,
		payload: { id, message, alert_type },
	});

	setTimeout(() => {
		dispatch({ type: REMOVE_ALERT, payload: id });
	}, 2000);
};
