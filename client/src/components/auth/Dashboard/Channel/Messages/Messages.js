import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
	messages: {
		padding: '0 0 1em 0',
		overflow: 'auto',
		flex: 'auto',
		height: '60vh',
		display: 'flex',
	},
}));

const Messages = ({ messages, authUser }) => {
	const classes = useStyle();
	return (
		<ScrollToBottom className={classes.messages} id='messages'>
			{messages.map((ctx, id) => (
				<div key={id}>
					<Message user={ctx} authUser={authUser} />
				</div>
			))}
		</ScrollToBottom>
	);
};

export default Messages;
