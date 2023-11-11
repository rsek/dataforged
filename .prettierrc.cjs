/** @typedef {'lexical'|'numeric'|'reverseLexical'|'reverseNumeric'} SortingAlgorithm  */

const identifierKeys = /^(id)$/
const labelKeys = /^(name|label)$/
const appearanceKeys = /^(color|icon|images)$/
const categoryKeys = /^(([a-z]+_)?type|nature|rank)$/
const optionsKeys = /^(options)$/
const usageKeys = /^(count_as_impact|shared|attachments|using)$/
const shortTextKeys = /^(summary|requirement|result)$/
const primaryContentKeys = /^(description|text)$/
const childObjectKeys = /^(abilities|contents|collections|outcomes)$/
const secondaryContentKeys = /^(quest_starter|your_truths)$/
const controlsKeys = /^(controls|condition_meter)$/

const sourceKeys = Object.fromEntries(
	[/^(title)$/, /^(date|page)$/, /^(authors)$/, /^(source|license|url)$/].map(
		(item) => [item, 'lexical']
	)
)

/** @type {Record<string, SortingAlgorithm|null>} */
const jsonSortOrder = {
	[identifierKeys]: null,
	[labelKeys]: 'lexical',
	[categoryKeys]: 'lexical',
	[appearanceKeys]: 'lexical',
	[usageKeys]: 'lexical',
	[optionsKeys]: 'lexical',
	[shortTextKeys]: 'lexical',
	features: 'lexical',
	drives: 'lexical',
	tactics: 'lexical',
	miss: 'lexical',
	weak_hit: 'lexical',
	strong_hit: 'lexical',
	[primaryContentKeys]: 'lexical',
	[childObjectKeys]: 'lexical',
	[secondaryContentKeys]: 'lexical',
	[controlsKeys]: 'lexical',
	...sourceKeys
}

const sortJsonOptions = {
	jsonRecursiveSort: true,
	jsonSortOrder: JSON.stringify(jsonSortOrder)
}

/**
 * @type {import('prettier').Config }
 */
module.exports = {
	plugins: ['prettier-plugin-sort-json'],
	arrowParens: 'always',
	bracketSameLine: true,
	bracketSpacing: true,
	embeddedLanguageFormatting: 'auto',
	endOfLine: 'lf',
	htmlWhitespaceSensitivity: 'css',
	insertPragma: false,
	jsxSingleQuote: true,
	printWidth: 80,
	proseWrap: 'preserve',
	quoteProps: 'as-needed',
	requirePragma: false,
	semi: false,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'none',
	vueIndentScriptAndStyle: false,
	// spaces are really crappy for accessibility: https://adamtuttle.codes/blog/2021/tabs-vs-spaces-its-an-accessibility-issue/
	useTabs: true,
	...sortJsonOptions
}
