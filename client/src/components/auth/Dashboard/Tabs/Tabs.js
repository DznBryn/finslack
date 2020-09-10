import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DirectMessage from './DirectMessages/DirectMessage/DirectMessage';

const Tabs = ({ component, socket }) => {
	switch (component) {
		case 'dm-component':
			return <DirectMessage socket={socket} />;
		default:
			return <div>Tabs</div>;
	}
};

Tabs.propTypes = {};
const mapStateToProps = (state) => ({
	component: state.tabs.component,
});
export default connect(mapStateToProps)(Tabs);
