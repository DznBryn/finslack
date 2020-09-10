import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { logout } from '../../../actions/auth';
import { Redirect } from 'react-router-dom';
import Channel from './Channel/Channel';
import { load_channel } from '../../../actions/channel';
import { makeStyles, Grid, Paper, CircularProgress } from '@material-ui/core';
import Header from './Header/Header';
import Tabs from './Tabs/Tabs';
let socket;
const ENDPOINT = 'http://localhost:3001/';

const useStyles = makeStyles((theme) => ({
	dashboard: {
		fontFamily: "'Roboto', Arial, Helvetica, sans-serif",
		fontWeight: '100',
		height: '93vh',
	},
	columnGrid: {
		height: '90vh',
	},
	paperContainers: {
		background: '#212121',
		color: '#fff',
		padding: '0 0 1em 0',
	},
}));

const Dashboard = ({ logout, auth, user, load_channel }) => {
	const classes = useStyles();

	useEffect(() => {
		socket = io(ENDPOINT);
		if (!auth.loading && user !== null) {
			load_channel(user[0].current_channel._id);
		}
	}, [ auth.loading, user, load_channel]);

	const onClickLogout = () => {
		logout();
	};

	if (!auth.isAuth) {
		return <Redirect to='/' />;
	}

	return auth.user === null ? (
		// TODO: Need to add loading component here
		<div
			style={{
				position: 'relative',
				top: '50%',
				left: '50%',
			}}
		>
			<CircularProgress />
		</div>
	) : (
		<Grid container className={classes.dashboard} justify='center'>
			<Grid item xs={12}>
				<Paper elevation={0} square={true}>
					<Header auth={auth} user={user[0]} onClickLogout={onClickLogout} />
				</Paper>
			</Grid>
			{/* <Grid item className={classes.columnGrid} sm={1}>
				<Paper elevation={0} className={classes.paperContainers} square={true}>
					Nav Component
				</Paper>
			</Grid>*/}
			<Grid item className={classes.columnGrid} sm={3}>
				<Paper elevation={0} className={classes.paperContainers} square={true}>
					<Tabs socket={socket} />
				</Paper>
			</Grid>
			<Grid item className={classes.columnGrid} xs={12} sm={5}>
				<Paper className={classes.paperContainers} elevation={0} square={true}>
					<Channel user={user[0]} onlineStatus={auth.online_status} socket={socket}/>
				</Paper>
			</Grid>
			<Grid className={classes.columnGrid} item sm={3}>
				<Paper elevation={0} className={classes.paperContainers} square={true}>
					NewAPIComponent
				</Paper>
			</Grid>
		</Grid>
	);
};

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	user: PropTypes.array,
	load_channel: PropTypes.func.isRequired,
	channel: PropTypes.object,
	logout: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => ({
	auth: state.auth,
	channel: state.channel.channel,
	user: state.auth.user,
});

export default connect(mapStateToProp, { logout, load_channel })(Dashboard);
