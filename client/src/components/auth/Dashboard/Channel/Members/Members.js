import React from 'react';
import {
	Grid,
	makeStyles,
	Paper,
	Button,
	CircularProgress,
	Menu,
	withStyles,
} from '@material-ui/core';
import Member from './Member/Member';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { useState } from 'react';
import MembersList from './MembersList';

const useStyles = makeStyles((theme) => ({
	userIconContainer: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row-reverse',
		alignItems: 'center',
		backgroundColor: '#212121',
		padding: '1em 0em 1em 4em',
		borderBottom: '1px solid rgba(255, 255, 255, .1) ',
		color: '#fff',
	},
	smTextContainer: {
		marginRight: '-180px',
		position: '-webkit-sticky',
	},
}));

const StyledMenu = withStyles({
	paper: {
		top: '9.1em !important',
		background: '#212121',
		borderRadius: '0px',
		color: '#fff',
		border: '1px solid rgba(255, 255, 255, .1)',
		maxHeight: '280px',
	},
})((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'left',
		}}
		{...props}
	/>
));

const Members = ({ online, members }) => {
	const classes = useStyles();
	let numOfMembers = 0;
	const [anchorE1, setAnchorE1] = useState(null);
	const open = Boolean(anchorE1);
	const onClick = (event) => {
		setAnchorE1(event.currentTarget);
	};
	const closeMenu = () => setAnchorE1(null);

	return members === [] || members === null || members === undefined ? (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '1em 0',
			}}
		>
			<CircularProgress />
		</div>
	) : (
		<Grid item>
			<Paper elevation={0} square={true} className={classes.userIconContainer}>
				{members
					.map((member) => {
						numOfMembers++;
						return numOfMembers <= 5 ? (
							<Member key={member.userId} member={member} online={online} />
						) : null;
					})
					.reverse()}

				{numOfMembers > 5 ? (
					<div className={classes.smTextContainer}>
						<Button
							size='small'
							variant='outlined'
							color='primary'
							onClick={onClick}
							endIcon={<PeopleOutlineIcon />}
						>
							{numOfMembers++ - 5}00+
						</Button>
					</div>
				) : null}
			</Paper>

			<StyledMenu
				open={open}
				anchorEl={anchorE1}
				className={classes.memberListContainer}
				onClose={closeMenu}
			>
				<MembersList members={members} />
			</StyledMenu>
		</Grid>
	);
};

export default Members;
