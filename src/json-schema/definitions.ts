import _ from 'lodash'
import {
	Assets,
	Collections,
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
	Truths,
	Progress,
	RulesetClassic,
	RulesetStarforged,
	Attributes
} from '@df-json-schema'
import { type JSONSchema7 } from 'json-schema'
import type * as Types from '@base-types'

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
	...Collections,
	...Truths,
	...Attributes
}

const defsStarforged = _({
	...defs,
	...RulesetStarforged
})
	.mapValues((def: JSONSchema7, defKey: string) =>
		niceTitle(def, defKey, 'starforged')
	)
	.omitBy((_, key) => key.includes('Classic'))
	.value() as Record<string, JSONSchema7>

const defsClassic = _({
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

export type DefsClassic = typeof defsClassic

export type DefsStarforged = typeof defsStarforged

export { defsStarforged, defsClassic }
