const channelMembers = [];

const addMember = ({ id, userId, firstName, lastName, channel }) => {
	let channelMember = {};
	const username = firstName + ' ' + lastName;

	const memberExist = channelMembers.find(
		(member) =>
			member.userId.toString() == userId.toString() &&
			member.channel.toString() == channel.toString()
	);

	// TODO: memberExist returns undefined need to return a boolean value

	if (memberExist) {
		channelMember = memberExist;

		return { channelMember };
	}

	channelMember = { id, userId, username, channel, onlineStatus: false };

	channelMembers.push(channelMember);

	return { channelMember };
};

const removeMember = (id) => {
	const memberExist = channelMembers.findIndex((member) => member.id === id);
	if (memberExist !== -1) {
		memberExist.onlineStatus = false;
		return channelMembers.splice(memberExist, 1);
	}
};
const isOnline = (userId) =>
	channelMembers.map((member) =>
		member.userId == userId
			? (member.onlineStatus = true)
			: (member.onlineStatus = false)
	);

const getMember = (id) => channelMembers.find((user) => user.userId == id);
const getMembers = (channel) =>
	channelMembers.filter((channelMember) => channelMember.channel === channel);

module.exports = {
	addMember,
	removeMember,
	isOnline,
	getMember,
	getMembers,
};
