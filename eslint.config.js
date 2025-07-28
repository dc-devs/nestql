import { readFileSync } from 'fs';
import { join } from 'path';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import typescriptParser from '@typescript-eslint/parser';

// Read and parse .gitignore file
function getGitignorePatterns() {
	try {
		const gitignorePath = join(import.meta.dirname, '.gitignore');
		const gitignoreContent = readFileSync(gitignorePath, 'utf8');

		return gitignoreContent
			.split('\n')
			.map((line) => line.trim())
			.filter(
				(line) =>
					line && !line.startsWith('#') && !line.startsWith('!'),
			)
			.map((pattern) => {
				// Convert gitignore patterns to ESLint glob patterns
				if (pattern.startsWith('/')) {
					return (
						pattern.slice(1) + (pattern.endsWith('/') ? '**' : '')
					);
				}
				return pattern.endsWith('/') ? pattern + '**' : pattern;
			});
	} catch (error) {
		console.warn('Could not read .gitignore:', error.message);
		return [];
	}
}

export default [
	// Global ignores (includes .gitignore patterns)
	{
		ignores: [
			...getGitignorePatterns(),
			// Additional ESLint-specific ignores
			'src/app/models/common/@generated/**',
			'**/*.generated.ts',
		],
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: import.meta.dirname,
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': typescriptEslint,
			prettier: prettier,
		},
		rules: {
			// Prettier integration
			'prettier/prettier': 'error',

			// TypeScript rules (matching your original config)
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-explicit-any': 'off',

			// NEW: Enforce import type for type-only imports
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
					disallowTypeAnnotations: false,
					fixStyle: 'separate-type-imports',
				},
			],

			// NEW: Enforce import type for type-only exports
			'@typescript-eslint/consistent-type-exports': [
				'error',
				{
					fixMixedExportsWithInlineTypeSpecifier: true,
				},
			],
		},
	},
	{
		files: ['eslint.config.js'],
		languageOptions: {
			sourceType: 'module',
		},
	},
];
