module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/../../src', '<rootDir>/../../test'],
	testMatch: ['**/*.e2e.test.ts'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	collectCoverageFrom: [
		'<rootDir>/../../src/**/*.ts',
		'!<rootDir>/../../src/**/*.d.ts',
	],
	moduleNameMapper: {
		'^@root/(.*)$': '<rootDir>/../../$1',
		'^@src/(.*)$': '<rootDir>/../../src/$1',
		'^@base/(.*)$': '<rootDir>/../../src/base/$1',
		'^@models/(.*)$': '<rootDir>/../../src/app/models/$1',
		'^@routes/(.*)$': '<rootDir>/../../src/app/routes/$1',
		'^@generated/(.*)$':
			'<rootDir>/../../src/app/models/common/@generated/$1',
	},
};
