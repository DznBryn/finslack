import React, {  Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../../actions/auth';
import Login from '../../auth/Login/Login';

const Landing = ({ login, isAuth, onlineStatus }) => {

	if (isAuth) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Fragment>
			<section className='landing'>
				<Login />
			</section>
		</Fragment>
	);
};

Landing.propTypes = {
	isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	onlineStatus: state.auth.onlineStatus,
});

export default connect(mapStateToProps, { login })(Landing);
