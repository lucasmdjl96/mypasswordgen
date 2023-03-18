module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint'],
	rules: {
		"@typescript-eslint/strict-boolean-expressions": "error"
	},
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		tsconfigRootDir: __dirname,
    	project: ['./tsconfig.json'],
		extraFileExtensions: ['.svelte']
	},
	extends: [
		'eslint:recommended',
    	'plugin:@typescript-eslint/recommended',
    	'plugin:@typescript-eslint/recommended-requiring-type-checking',
		"plugin:@typescript-eslint/strict-boolean-expressions"
	],
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
