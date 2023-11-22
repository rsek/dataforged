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
		'analysis_strings',
		'i18n',
		'markdown',
		'node_modules',
		'roll20',
		'./*.*',
		'src/data-in',
		'src/data-out',
		'src/json-typedef',
		'src/type-gen/results',
		'.eslintrc.js',
		'*.d.ts',
		'*.json',
		'*.cjs'
	],
	parserOptions: {
		// project: './tsconfig.json',
		ecmaVersion: 'latest',
		// supposedly this is faster: https://typescript-eslint.io/packages/parser/#experimental_useprojectservice
		EXPERIMENTAL_useProjectService: true
	},
	rules: {
		'@typescript-eslint/no-redeclare': 'off',
		// Pretty fraught since there's a few of them in use. Maybe possible to define, but i'm not sure it's worth the effort right now.
		'@typescript-eslint/naming-convention': 'off',
		'@typescript-eslint/consistent-type-assertions': 'off',
		'tsdoc/syntax': 'warn',
		'@typescript-eslint/key-spacing': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/consistent-type-definitions': 'off',
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{ prefer: 'type-imports', fixStyle: 'inline-type-imports' }
		],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/ban-ts-comment': 'off'
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
				]
				// '@typescript-eslint/array-type': [2, { array: true }]
			}
		}
	]
}

/** @typedef {'camelCase' | 'strictCamelCase' | 'PascalCase' | 'StrictPascalCase' | 'snake_case' | 'UPPER_CASE'} Case */
/** @typedef {'forbid' | 'require' | 'requireDouble' | 'allow' | 'allowDouble' | 'allowSingleOrDouble'} UnderscoreType */
/**
 * @typedef {'accessor'| 'class'| 'classMethod'| 'classProperty'| 'enum'| 'enumMember'| 'function'| 'import'| 'interface'| 'objectLiteralMethod'| 'objectLiteralProperty'| 'parameter'| 'parameterProperty'| 'typeAlias'| 'typeMethod'| 'typeParameter'| 'typeProperty'| 'variable'} IndividualSelector
 */

/**
 * @typedef {'default'|'memberLike'|'method'|'property'|'typeLike'| 'variableLike'} GroupSelector
 */

/** @typedef {GroupSelector|IndividualSelector} Selector */
/** @typedef {string} SelectorModifier */
/** @typedef {string} SelectorType */

/**
 * @typedef {{regex: string;match: boolean;}} Filter
 */

/**
 * @typedef {Object} NamingConventionOptions
 * @property {Case[] | null} [format=null]
 * @property {Filter} [custom]
 * @property {UnderscoreType} [leadingUnderscore]
 * @property {UnderscoreType} [trailingUnderscore]
 * @property {string[]} [prefix]
 * @property {string[]} [suffix]
 * @property {Selector | Selector[]} selector
 * @property {string | Filter} [filter]
 * @property {SelectorModifier[]} [modifiers]
 * @property {SelectorType[]} [types]
 *
 */
