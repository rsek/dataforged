/**
 * @type { import('eslint').ESLint.ConfigData }
 */
module.exports = {
	extends: ['standard-with-typescript', 'prettier'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],

	ignorePatterns: [
		'github',
		'vscode',
		'analysis',
		'i18n',
		'markdown',
		'node_modules',
		'roll20',
		'./*.*',
		'src/_schema-ts-old',
		'src/data-in',
		'src/data-out',
		'src/_schema-ts-old',
		'src/type-gen/results',
		'.eslintrc.js',
		'*.d.ts',
		'*.json'
	],
	parserOptions: {
		project: './tsconfig.json',
		ecmaVersion: 'latest'
	},
	rules: {
		'tsdoc/syntax': 'error',
		'@typescript-eslint/key-spacing': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{ prefer: 'type-imports', fixStyle: 'inline-type-imports' }
		],
		'@typescript-eslint/explicit-function-return-type': 'off'
	},
	overrides: [
		{
			files: ['./src/class-schema/**/*.ts'],
			rules: {
				'@typescript-eslint/no-redeclare': [
					2,
					{ ignoreDeclarationMerge: true }
				],
				// might want to turn this back on later
				'@typescript-eslint/explicit-function-return-type': [0],
				'@typescript-eslint/no-extraneous-class': [
					2,
					{ allowWithDecorator: true, allowStaticOnly: true }
				],
				'@typescript-eslint/array-type': [2, { array: true }]
			}
		}
	]
}
