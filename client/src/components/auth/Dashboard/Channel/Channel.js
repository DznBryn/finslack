import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Messages from './Messages/Messages';
import {
	Grid,
	Paper,
	makeStyles,
	TextField,
	Button,
	Icon,
	CircularProgress,
} from '@material-ui/core';
import Members from './Members/Members';

const useStyles = makeStyles((theme) => ({
	outContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: '#212121',
	},
	innerContainer: {
		width: ' 90%',
		margin: '0 auto',
	},
	paperContainers: {
		background: '#212121',
		color: '#fff',
	},
	inputField: {
		'& .MuiFormLabel-root': {
			color: 'rgba(225,225,225,0.5)',
		},
		'& .MuiInputBase-input': {
			color: '#fff',
		},
	},
	InputForm: {
		display: 'flex',
		alignItems: 'center',
	},
	bttnSubmit: {
		marginLeft: '1em',
	},
}));

const Channel = ({ user, channel, socket }) => {
	const classes = useStyles();
	const [members, setMembers] = useState(user.current_channel.channel_members);
	const [message, setMessage] = useState({
		message: '',
	});
	const [messages, setMessages] = useState(user.current_channel.channel_feed);
	const [online, setOnline] = useState([]);

	useEffect(() => {
		if (channel !== null && socket !== undefined) {
			const { _id: userId } = user;
			const { _id: userChannelId } = channel;
			socket.emit('join', { userId, userChannelId }, (error) => {
				// TODO: Redux action and reduce needed
				if (error) {
					alert(error);
				}

				socket.on('load_channel_members', (res) => {
					setMembers(res);
				});

				socket.on('load_online_members', (online_member) => {
					setOnline(online_member);
				});
			});
		}
		return () => {
			if (socket !== undefined) {
				socket.emit('disconnect');
				socket.off();
			}
		};
	}, [socket, user, channel]);

	useEffect(() => {
		if (socket !== undefined) {
			socket.on('message', (message) => {
				setMessages([...messages, message]);
			});
			socket.on('refresh_channel_list', (member) => {
				setMembers([...members, member]);
			});
		}
	}, [socket, messages, members]);

	const sendMessage = (e) => {
		e.preventDefault();
		if (message.message) {
			socket.emit('send_message', message.message, user._id, () => {
				setMessage({ ...message, message: '' });
			});
		}
	};

	return user === null && online === [] && channel === null ? (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '90vh',
			}}
		>
			<CircularProgress />
		</div>
	) : (
		<div className={classes.outContainer}>
			<div className={classes.innerContainer}>
				<Grid item xs={12}>
					<Paper
						elevation={0}
						className={classes.paperContainers}
						square={true}
					>
						<Members
							online={online}
							members={members}
							socket={socket}
							user={user}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper
						elevation={0}
						className={classes.paperContainers}
						square={true}
					>
						<Messages messages={messages} authUser={user} />
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper
						elevation={0}
						className={classes.paperContainers}
						square={true}
					>
						<form onSubmit={(e) => sendMessage(e)}>
							<Grid
								container
								className={classes.InputForm}
								justify='center'
								spacing={0}
							>
								<Grid item xs={10}>
									<TextField
										className={classes.inputField}
										label='Send Message'
										multiline
										rows={2}
										name='message'
										value={message.message}
										onChange={(e) =>
											setMessage({
												...message,
												[e.target.name]: e.target.value,
											})
										}
										onKeyPress={(e) =>
											e.key === 'Enter' ? sendMessage(e) : null
										}
										fullWidth
									/>
								</Grid>
								<Grid item xs={2}>
									<Button
										className={classes.bttnSubmit}
										type='submit'
										variant='outlined'
										color='primary'
									>
										<Icon>send</Icon>
									</Button>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</Grid>
			</div>
		</div>
	);
};

Channel.propTypes = {
	channel: PropTypes.object,
};

const mapStateToProp = (state) => ({
	channel: state.channel.channel,
});

export default connect(mapStateToProp)(Channel);
