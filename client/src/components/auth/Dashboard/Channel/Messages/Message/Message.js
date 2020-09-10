import React from 'react';

import ReactEmoji from 'react-emoji';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
	adminPaperContainers: {
		background: 'inherit',
		color: '#fff',
		padding: ' .5em',
		width: '100%',
		fontSize: '14px',
		display: 'flex',
		justifyContent: 'flex-start',
	},
	paperContainers: {
		background: 'inherit',
		color: '#fff',
		padding: ' .5em',
		width: '80%',
		fontSize: '14px',
		display: 'flex',
		justifyContent: 'flex-start',
	},
	paperContainersEnd: {
		background: 'inherit',
		color: '#fff',
		padding: '  .5em',
		width: '80%',
		fontSize: '14px',
		display: 'flex',
		justifyContent: 'flex-end',
		marginLeft: '17%',
	},
	username: {
		display: 'flex',
		fontSize: '11px',
		opacity: '.5',
		margin: '0 0 0 7px',
	},
	messageContainer: {
		lineHeight: '22px',
		wordBreak: 'break-all',
	},
	messageContainerEnd: {
		lineHeight: '22px',
		wordBreak: 'break-all',
	},
	adminMessageWrapper: {
		padding: '8px 14px',
		display: 'inline-flex',
		fontSize: '11px',
		opacity: '.5',
		margin: '0 auto',
		fontStyle: 'italic',
	},
	messageWrapper: {
		padding: '8px 14px',
		background: '#37474f',
		borderRadius: '20px',
	},
	messageWrapperEnd: {
		padding: '8px 14px',
		background: '#009688',
		borderRadius: '20px',
		display: 'inline-flex',
		float: 'right',
	},
	message: {
		wordBreak: 'break-all',
		margin: '0',
	},
	adminMessage: {
		margin: '0',
	},
	messageDate: {
		opacity: '0.5',
		fontSize: '9px',
		margin: '0px 0 0 7px',
	},
	messageDateEnd: {
		opacity: '0.5',
		fontSize: '9px',
		textAlign: 'right',
		clear: 'both',
		margin: '3px 7px 0 0 ',
	},
}));

const Message = ({
	user: { date, user: userId, username, message },
	authUser,
}) => {
	const classes = useStyles();

	return userId !== authUser._id && userId == null ? (
		<Grid item xs={12}>
			<Paper
				elevation={0}
				className={classes.adminPaperContainers}
				square={true}
			>
				<div className={classes.adminMessageWrapper}>
					<p className={classes.adminMessage}>{ReactEmoji.emojify(message)}</p>
				</div>
			</Paper>
		</Grid>
	) : userId !== authUser._id ? (
		<Grid item xs={12}>
			<Paper elevation={0} className={classes.paperContainers} square={true}>
				<div className={classes.messageContainer}>
					<p className={classes.username}>{username}</p>
					<div className={classes.messageWrapper}>
						<p className={classes.message}>{ReactEmoji.emojify(message)}</p>
					</div>
					<div className={classes.messageDate}>
						<Moment format='MMM DD H:mma'>{date}</Moment>
					</div>
				</div>
			</Paper>
		</Grid>
	) : (
		<Grid item xs={12}>
			<Paper elevation={0} className={classes.paperContainersEnd} square={true}>
				<div className={classes.messageContainerEnd}>
					<div className={classes.messageWrapperEnd}>
						<p className={classes.message}>{ReactEmoji.emojify(message)}</p>
					</div>
					<div className={classes.messageDateEnd}>
						<Moment format='h:mm a, MMM DD '>{date}</Moment>
					</div>
				</div>
			</Paper>
		</Grid>
	);
};

export default Message;
