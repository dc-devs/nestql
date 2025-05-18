const messages = [];

const firstMessage = {
	sender: 'user',
	type: 'text',
	content:
		'Can you help me build a React Todo App? I want to learn React basics and create something practical.',
	payload:
		'{"content":"Can you help me build a React Todo App? I want to learn React basics and create something practical."}',
	timestamp: '2025-05-14T15:10:51.125Z',
	chatSessionId: 1,
};
messages.push(firstMessage);

const secondMessage = {
	sender: 'assistant',
	type: 'text',
	content:
		"I'd be happy to help you build a React Todo App! Let's start with creating the basic structure. We'll need a main App component and a Todo component. Would you like me to help you set up the project with Create React App first?",
	payload:
		'{"content":"I\'d be happy to help you build a React Todo App! Let\'s start with creating the basic structure. We\'ll need a main App component and a Todo component. Would you like me to help you set up the project with Create React App first?"}',
	timestamp: '2025-05-14T15:11:00.125Z',
	chatSessionId: 1,
};
messages.push(secondMessage);

const thirdMessage = {
	sender: 'user',
	type: 'text',
	content:
		'Yes, please! I already have Node.js installed. What commands should I run to create the project?',
	payload:
		'{"content":"Yes, please! I already have Node.js installed. What commands should I run to create the project?"}',
	timestamp: '2025-05-14T15:11:30.125Z',
	chatSessionId: 1,
};
messages.push(thirdMessage);

const fourthMessage = {
	sender: 'assistant',
	type: 'text',
	content:
		"Great! Open your terminal and run this command to create a new React project:\n\n```bash\nnpx create-react-app todo-app --template typescript\ncd todo-app\nnpm start\n```\n\nI'm using TypeScript for better type safety. Once that's done, we can start building the Todo components. Would you like to proceed with creating the components?",
	payload:
		'{"content":"Great! Open your terminal and run this command to create a new React project:\n\n```bash\nnpx create-react-app todo-app --template typescript\ncd todo-app\nnpm start\n```\n\nI\'m using TypeScript for better type safety. Once that\'s done, we can start building the Todo components. Would you like to proceed with creating the components?"}',
	timestamp: '2025-05-14T15:12:00.125Z',
	chatSessionId: 1,
};
messages.push(fourthMessage);

const allMessagesCount = messages.length;

export {
	messages,
	firstMessage,
	secondMessage,
	thirdMessage,
	fourthMessage,
	allMessagesCount,
};
