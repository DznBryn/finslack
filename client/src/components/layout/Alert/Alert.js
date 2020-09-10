import React from 'react';
import PropTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';

const Alert = (props) => {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const Alerts = ({ alerts }) => {
	return (
		alerts !== null &&
		alerts.length > 0 &&
		alerts.map((alert) => (
			<Alert
				key={alert.id}
				severity='error'
				className={`alert alert-${alert.alert_type}`}
			>
				{alert.message}
			</Alert>
		))
	);
};

Alerts.propTypes = {
	alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps)(Alerts);
