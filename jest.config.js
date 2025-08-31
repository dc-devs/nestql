module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/src', '<rootDir>/test'],
	testMatch: ['**/*.test.ts', '**/*.spec.ts'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	collectCoverageFrom: [
		'src/**/*.ts',
		'!src/**/*.d.ts',
	],
	moduleNameMapping: {
		'^@root/(.*)$': '<rootDir>/$1',
		'^@src/(.*)$': '<rootDir>/src/$1',
		'^@base/(.*)$': '<rootDir>/src/base/$1',
		'^@models/(.*)$': '<rootDir>/src/app/models/$1',
		'^@routes/(.*)$': '<rootDir>/src/app/routes/$1',
	},
	setupFilesAfterEnv: ['<rootDir>/test/config/setup.ts'],
};
