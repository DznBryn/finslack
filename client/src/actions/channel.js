import axios from 'axios';
import {
	GET_CHANNEL,
	GET_CHANNELS,
	CHANNEL_JOIN_FAIL,
	CHANNEL_JOIN,
	CHANNEL_LEAVE,
    MESSAGE_SENT_FAIL,
    MESSAGE_SENT,
} from './constants';
import { set_alert } from './alert';





export const load_channels = () => async (dispatch) => {
	try {
		const channels = await axios.get('/api/channels/');
		dispatch({
			type: GET_CHANNELS,
			payload: channels.data,
		});
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(set_alert(error.msg, 'error')));
		}
	}
};
export const load_channel = (id) => async (dispatch) => {
	try {
		const channel = await axios.get(`/api/channels/${id}`);
		dispatch({
			type: GET_CHANNEL,
			payload: channel.data,
		});
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(set_alert(error.msg, 'error')));
		}
	}
};

export const join_channel = (id, channel_id) => async (
	dispatch
) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(
			`/api/channels/channel/${channel_id}/channel-members`,
			{ user: id },
			config
		);

		dispatch({
			type: CHANNEL_JOIN,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: CHANNEL_JOIN_FAIL,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

export const leave_channel = () => async (dispatch) => {
	try {
		dispatch({
			type: CHANNEL_LEAVE,
		});

	} catch (error) {
		dispatch({
			type: CHANNEL_JOIN_FAIL,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};


export const add_message =  ({username, message}, channel_id) => async dispatch => {
    try {
        const config = {
			headers: {
				'Content-Type': 'application/json',
			},
        };
        const res = await axios.post(`/api/channels/channel/${channel_id}/feed`,{ username, message }, config)
		console.log('data recived from add_message')
        dispatch({
            type: MESSAGE_SENT,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: MESSAGE_SENT_FAIL,
            payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
        })
    }
}