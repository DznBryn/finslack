import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	memberIcon: {
		border: '1px solid #fff',
		padding: '1em',
		width: '16px',
		height: '16px',
		textAlign: 'center',
		borderRadius: '50px',
		marginLeft: '-2em',
		backgroundColor: '#212121',
	},
	userIcon: {
		border: '1px solid #009688',
		padding: '1em',
		width: '16px',
		height: '16px',
		textAlign: 'center',
		borderRadius: '50px',
		marginLeft: '-2em',
		backgroundColor: '#212121',
	},
}));

const Member = ({ member, online }) => {
	const classes = useStyles();
	const userIcon = member.username[0].toUpperCase();

	return online === null ? (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '1em 0'
			}}
		>
			<CircularProgress />
		</div>
	) : (
		online.map((onlineUser, id) =>
			onlineUser.userId !== member.userId ? (
				<div key={id} className={classes.memberIcon}>{userIcon}</div>
				
			) : (
				<div key={id} className={classes.userIcon}>
					{userIcon}
				</div>
			)
		)
		
	);
};

export default Member;
