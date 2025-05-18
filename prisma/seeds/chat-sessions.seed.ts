const chatSessions = [];

const firstChatSession = {
	title: 'Building a React Todo App',
	userId: 1,
};
chatSessions.push(firstChatSession);

const secondChatSession = {
	title: 'Debugging Python Performance Issues',
	userId: 1,
};
chatSessions.push(secondChatSession);

const thirdChatSession = {
	title: 'Learning TypeScript Basics',
	userId: 1,
};
chatSessions.push(thirdChatSession);

const fourthChatSession = {
	title: 'Code Review: API Authentication',
	userId: 1,
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
