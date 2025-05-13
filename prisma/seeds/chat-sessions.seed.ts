const chatSessions = [];

const firstChatSession = {
	userId: 1,
	title: 'Tariffs summary',
};
chatSessions.push(firstChatSession);

const secondChatSession = {
	userId: 1,
	title: 'Stephen Curry injury',
};
chatSessions.push(secondChatSession);

const thirdChatSession = {
	userId: 1,
	title: 'Ammend git commit',
};
chatSessions.push(thirdChatSession);

const fourthChatSession = {
	userId: 1,
	title: 'Microplastics in the ocean',
};
chatSessions.push(fourthChatSession);

const allChatSessionsCount = chatSessions.length;

export {
	chatSessions,
	firstChatSession,
	secondChatSession,
	thirdChatSession,
	fourthChatSession,
	allChatSessionsCount,
};
