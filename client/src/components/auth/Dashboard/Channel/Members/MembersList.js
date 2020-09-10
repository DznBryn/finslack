import React from 'react';
import PropTypes from 'prop-types';
import {
	CircularProgress,
	MenuItem,
	withStyles,
	ListItemIcon,
	IconButton,
} from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';
import { loadComponent } from '../../../../../actions/tabs';
import { startPrivateChannel } from '../../../../../actions/privateChannel';
import { connect } from 'react-redux';

const StyleMenuItem = withStyles((theme) => ({
	root: {
		fontSize: ' 14px',
		padding: '.5em 1em',
	},
}))(MenuItem);

const MembersList = ({ members, loadComponent, startPrivateChannel }) => {
	const showDirectMessageComponent = () => {
		console.log('reviced');

		// loadComponent('dm-component');
		// startPrivateChannel(receiver.userId);
	};

	return members ? (
		// members.map((member) => (
		// 	<StyleMenuItem elevation={0} key={member.userId}>
		// 		{member.username}
		// 		<ListItemIcon>
		// 			<IconButton onClick={() => showDirectMessageComponent()}>
		// 				<MessageIcon fontSize='small' style={{ color: '#fff' }} />
		// 			</IconButton>
		// 		</ListItemIcon>
		// 	</StyleMenuItem>
		// ))
		<div></div>
	) : (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '1em 0',
				width: '100%',
			}}
		>
			<CircularProgress />
		</div>
	);
};

MembersList.propTypes = {
	loadComponent: PropTypes.func.isRequired,
	startPrivateChannel: PropTypes.func.isRequired,
};

export default connect(null, { loadComponent, startPrivateChannel })(
	MembersList
);
