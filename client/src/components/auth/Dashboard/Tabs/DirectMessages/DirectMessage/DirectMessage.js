import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const DirectMessage = ({ user, socket, receiverId }) => {
	useEffect(() => {
		if (socket !== undefined && user !== null) {
			// socket.emit(
			// 	'joinPrivate',
			// 	{ sender: user._id, receiver: receiverId },
			// 	(error) => {
			// 		if (error) return alert(error);
			// 	}
			// );
		}
		return () => {
			if (socket !== undefined) {
			}
		};
	}, [socket, user]);
	return <div>1 to 1 Direct Messaging</div>;
};

DirectMessage.propTypes = {};
const mapStateToProps = (state) => ({
	receiverId: state.privateChannel.receiver,
});
export default connect(mapStateToProps)(DirectMessage);
