import _ from 'lodash'
import {
	Assets,
	Abstract,
	DelveSites,
	Encounters,
	// GameObjects,
	Localize,
	Metadata,
	Moves,
	Oracles,
	Players,
	Rarities,
	Regions,
	Progress,
	RulesetClassic,
	RulesetStarforged,
	Inputs
} from '@schema-json'
import { type JSONSchema7 } from 'json-schema'
import type * as Types from 'schema'
// import {
// 	OracleCollectionTemplate,
// 	OracleTableTemplate
// } from 'schema-json/templates'

/**
 * Splits a camelcase title to something nicer
 */
function niceTitle(
	def: JSONSchema7,
	defKey: string,
	game: Types.Metadata.Ruleset
): JSONSchema7 {
	let newTitle = _.lowerCase(defKey)
	newTitle = newTitle.replace(game, `(${_.startCase(game)})`)
	newTitle = newTitle[0].toUpperCase() + newTitle.slice(1)
	newTitle = newTitle.replace(/ id$/, ' ID')
	return _.merge({ title: newTitle }, def)
}

const defs: Record<string, JSONSchema7> = {
	...(_.omit(Metadata, 'SuggestionsClassic', 'SuggestionsStarforged') as any),
	...Localize,
	...Progress,
	...Assets,
	...Oracles,
	...Players,
	...Encounters,
	...Moves,
	...Abstract,
	...Inputs
	// OracleCollectionTemplate,
	// OracleTableTemplate
}

function purgeKeys(obj: unknown, ...keys: string[]) {
	if (Array.isArray(obj))
		obj.forEach((item) => {
			purgeKeys(item, ...keys)
		})
	if (typeof obj === 'object')
		_.forEach(obj as any, (v, k) => {
			if (keys.includes(k) && v != null) {
				;(obj as any)[k] = undefined
			}
			if (v != null) v = purgeKeys(v, ...keys)
		})
	return obj
}

function getStarforgedDefs() {
	const result = _({
		...defs,
		...RulesetStarforged
	})
		.mapValues((def: JSONSchema7, defKey: string) =>
			niceTitle(def, defKey, 'starforged')
		)
		.omitBy((_, key) => key.includes('Classic'))
		.value() as Record<string, JSONSchema7>
	// strip these manually because:
	// 1) AJV demands that i put them in their schema (when they're unnecessary)
	// 2) AJV then makes me jump thru hoops to validate them
	// 3) they're not even part of the json schema spec!!!
	return purgeKeys(result, 'nullable')
}

function getClassicDefs() {
	const result = _({
		...defs,
		...RulesetClassic,
		...Encounters,
		...Regions,
		...Rarities,
		...DelveSites
	})
		.mapValues((def: JSONSchema7, defKey: string) =>
			niceTitle(def, defKey, 'classic')
		)
		.omitBy((_, key) => key.includes('Starforged'))
		.value() as Record<string, JSONSchema7>
	return purgeKeys(result, 'nullable')
}

export type DefsClassic = ReturnType<typeof getStarforgedDefs>

export type DefsStarforged = ReturnType<typeof getClassicDefs>

export { getStarforgedDefs, getClassicDefs }
