/** @typedef {'lexical'|'numeric'|'reverseLexical'|'reverseNumeric'} SortingAlgorithm  */

// TODO: schema key order
// TODO: prevent dictionary objects from being sorted. their order is important.
// TODO: propagate column labels to collections

// https://github.com/ota-meshi/eslint-plugin-jsonc may be a better choice for this. it can interact with the AST and such
// that or i DIY it with e.g. .each() ?

const keyOrder = [
	'id',
	'title',
	'name',
	'label',
	'canonical_name',
	'color',
	'icon',
	'images',
	'/(([a-z]+_)?type)/',
	'nature',
	'rank',
	'track_label',
	'rendering',
	'table_style',
	'enabled',
	'min',
	'max',
	'value',
	'frequency',
	'options',
	'count_as_impact',
	'shared',
	'attachments',
	'using',
	'trigger',
	'roll',
	'summary',
	'requirement',
	'result',
	'features',
	'drives',
	'tactics',
	'strong_hit',
	'weak_hit',
	'miss',
	'variants',
	'description',
	'text',
	'abilities',
	'contents',
	'collections',
	'outcomes',
	'quest_starter',
	'your_truths',
	'controls',
	'condition_meter',
	'date',
	'page',
	'authors',
	'source',
	'license',
	'url'
]

const identifierKeys = /^(id)$/
const labelKeys = /^(name|label)$/
const appearanceKeys = /^(color|icon|images)$/
const categoryKeys = /^(([a-z]+_)?type|nature|rank|track_label|table_style)$/
const enabledKeys = /^(enabled)$/
const optionsKeys = /^(options)$/
const usageKeys = /^(count_as_impact|shared|attachments|using|trigger|roll)$/
const shortTextKeys = /^(summary|requirement|result)$/
const longTextKeys = /^(description|text)$/
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
	canonical_name: 'lexical',
	[enabledKeys]: 'lexical',
	min: 'lexical',
	max: 'lexical',
	value: 'lexical',
	frequency: 'lexical',
	[categoryKeys]: 'lexical',
	[appearanceKeys]: 'lexical',
	[usageKeys]: 'lexical',
	[optionsKeys]: 'lexical',
	[shortTextKeys]: 'lexical',
	features: 'lexical',
	drives: 'lexical',
	tactics: 'lexical',
	strong_hit: 'lexical',
	weak_hit: 'lexical',
	miss: 'lexical',
	variants: 'lexical',
	[longTextKeys]: 'lexical',
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
