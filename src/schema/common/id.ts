import {
	type Static,
	Type,
	type SchemaOptions,
	type TString
} from '@sinclair/typebox'
import { cloneDeep, escape, escapeRegExp } from 'lodash'
import { join } from 'path'
import { SNAKE_CASE } from 'schema/common/regex'
import { SOURCEBOOK_KEY } from 'schema/sourcebooks'
import { type Opaque } from 'type-fest'

/** Composes regular expressions for Dataforged IDs */
class ID {
	static readonly JOINER = escapeRegExp('/')
	static readonly WILDCARD = escapeRegExp('*')
	static readonly WILDCARD_MULTI = escapeRegExp('**')
	static readonly RANGE = /([1-9][0-9]*)-([1-9][0-9]*)/.source
	static readonly INDEX = /(0|[1-9][0-9]*)/.source
	static readonly KEY = SNAKE_CASE.source
	static readonly KEY_WILDCARD = new RegExp(`(${this.KEY}|${this.WILDCARD})`)
		.source

	static readonly KEY_RECURSIVE = new RegExp(
		`${this.KEY}(${this.JOINER}${this.KEY}){0,2}`
	).source

	static readonly KEY_RECURSIVE_WILDCARD = new RegExp(
		`(${ID.KEY_RECURSIVE}|${this.WILDCARD_MULTI})`
	).source

	static readonly SOURCEBOOK = /([a-z0-9_]{3,})/.source
	static readonly SOURCEBOOK_WILDCARD = new RegExp(
		`(${this.SOURCEBOOK}|${this.WILDCARD})`
	).source

	static forNode(type: string) {
		const nodeFragment = this.KEY
		return new ID(this.SOURCEBOOK, type, nodeFragment)
	}

	static forCollectedNode(collectionType: string, recursive = false) {
		const collectionFragment = recursive ? this.KEY_RECURSIVE : this.KEY
		const nodeFragment = this.KEY
		return new ID(
			this.SOURCEBOOK,
			collectionType,
			collectionFragment,
			nodeFragment
		)
	}

	static forCollection(collectionType: string, recursive = false) {
		const collectionFragment = recursive ? this.KEY_RECURSIVE : this.KEY
		return new ID(
			this.SOURCEBOOK,
			'collections',
			collectionType,
			collectionFragment
		)
	}

	static unwrapPattern(pattern: RegExp | string) {
		const fragment = typeof pattern === 'string' ? pattern : pattern.source
		return new RegExp(fragment.replace(/^\^/, '').replace(/\$$/, ''))
	}

	clone(...fragments: Array<string | RegExp>) {
		const newId = cloneDeep(this)
		return newId.add(...fragments)
	}

	add(...fragments: Array<string | RegExp>) {
		const toAdd = []
		for (const fragment of fragments) {
			if (typeof fragment === 'string') toAdd.push(new RegExp(fragment))
			else if (fragment instanceof ID) toAdd.push(...fragment.fragments)
			else toAdd.push(fragment)
		}
		return this.fragments.push(...toAdd.map((frag) => ID.unwrapPattern(frag)))
	}

	fragments: RegExp[] = []

	get regExp() {
		return new RegExp(
			`^${this.fragments.map((frag) => frag.source).join(ID.JOINER)}$`
		)
	}

	toString() {
		return this.regExp.source
	}

	toJSON() {
		return this.toString()
	}

	toSchema(options: SchemaOptions = {}) {
		return Type.RegEx(this.regExp, options)
	}

	static fromSchema(schema: TString, ...append: Array<string | RegExp>) {
		if (!schema.pattern)
			throw new Error(`Can't create ID from a schema with no pattern property`)
		return new ID(this.unwrapPattern(schema.pattern), ...append)
	}

	static toWildcard(source: TString | ID) {}

	constructor(...fragments: Array<string | RegExp>) {
		this.add(...fragments)
	}
}

const REGEX_SOURCEBOOK_KEY = /[a-z0-9_]{3,}/
const REGEX_DICT_KEY = /[a-z][a-z_]*/

const REGEX_RANGE = /([1-9][0-9]*)-([1-9][0-9]*)/
const REGEX_INDEX = /(0|[1-9][0-9]*)/
const JOINER = escapeRegExp('/')
const WILDCARD = escapeRegExp('*')
const WILDCARD_MULTI = escapeRegExp('**')
const RANGE = `${JOINER}${REGEX_RANGE.source}`
const INDEX = `${JOINER}${REGEX_INDEX.source}`
const KEY = `${JOINER}(${REGEX_DICT_KEY.source})`
const KEY_RECURSIVE = `(${KEY}){1,3}`
const KEY_WILDCARD = `(${KEY}|${JOINER}${WILDCARD})`
const KEY_RECURSIVE_WILDCARD = `(${KEY_RECURSIVE}|${JOINER}${WILDCARD_MULTI})`

const FRAGMENT_SOURCEBOOK_KEY = REGEX_SOURCEBOOK_KEY.source
const FRAGMENT_SOURCEBOOK_WILDCARD = `(${FRAGMENT_SOURCEBOOK_KEY}|${WILDCARD})`

function joinPatterns(...fragments: Array<string | RegExp>) {
	return new RegExp(
		wrapPattern(
			fragments
				.map((frag) =>
					unwrapPattern(typeof frag === 'string' ? frag : frag.source)
				)
				.join('')
		)
	)
}

function wrapPattern(pattern: RegExp | string) {
	const fragment = typeof pattern === 'string' ? pattern : pattern.source
	return new RegExp(`^${unwrapPattern(fragment)}$`)
}

function unwrapPattern(pattern: RegExp | string) {
	const fragment = typeof pattern === 'string' ? pattern : pattern.source
	return fragment.replace(/^\^/, '').replace(/\$$/, '')
}

function NodeID(collectionType: string, recursive = false) {
	const collectionNodeFragment = recursive ? KEY_RECURSIVE : KEY

	return joinPatterns(
		FRAGMENT_SOURCEBOOK_KEY,
		JOINER,
		collectionType,
		collectionNodeFragment,
		KEY
	)
}

function NodeIDWildcard(collectionType: string, recursive = false) {
	const collectionNodeFragment = recursive
		? KEY_RECURSIVE_WILDCARD
		: KEY_WILDCARD
	return joinPatterns(
		FRAGMENT_SOURCEBOOK_WILDCARD,
		JOINER,
		collectionType,
		collectionNodeFragment,
		KEY_WILDCARD
	)
	// return new RegExp(
	// 	`^(${FRAGMENT_SOURCEBOOK.source}|${NODE_WILDCARD})${JOINER}${type}${collectionNodeFragment}${JOINER}${NODE_WILDCARD}$`
	// )
}

function CollectionID(collectionType: string, recursive = false) {
	const collectionNodeFragment = recursive ? KEY_RECURSIVE : KEY
	return joinPatterns(
		FRAGMENT_SOURCEBOOK_KEY,
		JOINER,
		'collections',
		JOINER,
		collectionType,
		collectionNodeFragment
	)
	// return new RegExp(
	// 	`^${FRAGMENT_SOURCEBOOK.source}${JOINER}collections${JOINER}${type}${collectionNodeFragment}$`
	// )
}

function CollectionIDWildcard(type: string, recursive = false) {
	const collectionNodeFragment = recursive
		? KEY_RECURSIVE_WILDCARD
		: KEY_WILDCARD
	return joinPatterns(
		FRAGMENT_SOURCEBOOK_WILDCARD,
		JOINER,
		type,
		collectionNodeFragment,
		KEY_WILDCARD
	)
	// return new RegExp(
	// 	`^(${FRAGMENT_SOURCEBOOK.source}|${NODE_WILDCARD})${JOINER}collections${JOINER}${type}${collectionNodeFragment}$`
	// )
}

export const EncounterClassicID = ID.forCollectedNode('encounters').toSchema({
	$id: '#/$defs/EncounterClassicID',
	examples: [
		'classic/encounters/firstborn/elf',
		'delve/encounters/anomalies/glimmer'
	]
})
export type EncounterClassicID = Opaque<Static<typeof EncounterClassicID>>

export const EncounterClassicIDWildcard = Type.RegEx(
	CollectionIDWildcard('encounters'),
	{ $id: '#/$defs/EncounterClassicIDWildcard' }
)
export type EncounterClassicIDWildcard = Opaque<
	Static<typeof EncounterClassicIDWildcard>
>

export const EncounterCollectionID = Type.RegEx(CollectionID('encounters'), {
	$id: '#/$defs/EncounterCollectionID',
	examples: ['classic/collections/encounters/firstborn']
})
export type EncounterCollectionID = Opaque<Static<typeof EncounterCollectionID>>

export const EncounterStarforgedID = Type.RegEx(
	joinPatterns(
		FRAGMENT_SOURCEBOOK_KEY,
		JOINER,
		'encounters',
		KEY,
		new RegExp(`(${JOINER}variants${JOINER}${ID.KEY})?`)
	),
	{
		$id: '#/$defs/EncounterStarforgedID',
		examples: [
			'starforged/encounters/chiton',
			'starforged/encounters/chiton/variants/chiton_drone_pack'
		]
	}
)
export type EncounterStarforgedID = Opaque<Static<typeof EncounterStarforgedID>>

export type EncounterID = EncounterClassicID | EncounterStarforgedID

export const AssetID = Type.RegEx(NodeID('assets'), {
	$id: '#/$defs/AssetID'
})
export type AssetID = Opaque<Static<typeof AssetID>>
export const AssetIDWildcard = Type.RegEx(NodeIDWildcard('assets'), {
	$id: '#/$defs/AssetIDWildcard'
})
export type AssetIDWildcard = Opaque<Static<typeof AssetIDWildcard>>
export const AssetTypeID = Type.RegEx(CollectionID('assets'), {
	$id: '#/$defs/AssetTypeID'
})
export type AssetTypeID = Opaque<Static<typeof AssetTypeID>>

export const AssetOptionFieldID = Type.RegEx(
	joinPatterns(AssetID.pattern as string, ID.JOINER, 'options', KEY),
	// /^[a-z0-9_]{3,}\/assets(\/[a-z][a-z_]*){2}\/options\/[a-z][a-z_]*/,
	{ $id: '#/$defs/AssetOptionFieldID' }
)
export type AssetOptionFieldID = Opaque<Static<typeof AssetOptionFieldID>>

export const AssetOptionFieldIDWildcard = Type.RegEx(
	joinPatterns(
		AssetIDWildcard.pattern as string,
		JOINER,
		'options',
		KEY_WILDCARD
	),
	// /^(\*|[a-z0-9_]{3,})\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)\/options\/[a-z][a-z_]*$/,
	{ $id: '#/$defs/AssetOptionFieldIDWildcard' }
)
export type AssetOptionFieldIDWildcard = Static<
	typeof AssetOptionFieldIDWildcard
>

export const AssetControlFieldID = Type.RegEx(
	joinPatterns(AssetID.pattern as string, ID.JOINER, 'controls', KEY),
	// /^[a-z0-9_]{3,}\/assets(\/[a-z][a-z_]*){2}\/controls\/[a-z][a-z_]*$/,
	{ $id: '#/$defs/AssetControlFieldID' }
)
export type AssetControlFieldID = Opaque<Static<typeof AssetControlFieldID>>

export const AssetControlFieldIDWildcard = Type.RegEx(
	joinPatterns(
		AssetIDWildcard.pattern as string,
		JOINER,
		'controls',
		KEY_WILDCARD
	),
	{ $id: '#/$defs/AssetControlFieldIDWildcard' }
)
export type AssetControlFieldIDWildcard = Static<
	typeof AssetControlFieldIDWildcard
>

export const AssetConditionMeterID = Type.RegEx(
	joinPatterns(AssetID.pattern as string, ID.JOINER, `condition_meter`),
	// /^[a-z0-9_]{3,}\/assets(\/[a-z][a-z_]*){2}\/condition_meter$/,
	{ $id: '#/$defs/AssetConditionMeterID', title: 'Asset condition meter ID' }
)
export type AssetConditionMeterID = Opaque<Static<typeof AssetConditionMeterID>>
export const AssetConditionMeterIDWildcard = Type.RegEx(
	joinPatterns(AssetIDWildcard.pattern as string, ID.JOINER, 'condition_meter'),
	// /^([a-z0-9_]{3,}|\*)\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)\/condition_meter$/,
	{
		$id: '#/$defs/AssetConditionMeterIDWildcard',
		title: 'Asset condition meter ID (wildcard)'
	}
)
export type AssetConditionMeterIDWildcard = Static<
	typeof AssetConditionMeterIDWildcard
>
export const AssetConditionMeterControlFieldID = Type.RegEx(
	joinPatterns(
		AssetConditionMeterID.pattern as string,
		JOINER,
		'controls',
		KEY
	),
	// /^[a-z0-9_]{3,}\/assets(\/[a-z][a-z_]*){2}\/condition_meter\/controls\/[a-z][a-z_]*$/,
	{ $id: '#/$defs/AssetConditionMeterControlFieldID' }
)
export type AssetConditionMeterControlFieldID = Static<
	typeof AssetConditionMeterControlFieldID
>

export const AssetAbilityID = Type.RegEx(
	joinPatterns(
		AssetID.pattern as string,
		ID.JOINER,
		'abilities',
		ID.JOINER,
		'[0-2]'
	),
	// /^[a-z0-9_]{3,}\/assets(\/[a-z][a-z_]*){2}\/abilities\/[0-2]$/,
	{ $id: '#/$defs/AssetAbilityID' }
)
export type AssetAbilityID = Opaque<Static<typeof AssetAbilityID>>

export const AssetAbilityOptionFieldID = Type.RegEx(
	joinPatterns(AssetAbilityID.pattern as string, ID.JOINER, 'options', KEY),
	// /^[a-z0-9_]{3,}\/assets(\/[a-z][a-z_]*){2}\/abilities\/[0-2]\/options\/[a-z][a-z_]*$/,
	{ $id: '#/$defs/AssetAbilityOptionFieldID' }
)
export type AssetAbilityOptionFieldID = Opaque<
	Static<typeof AssetAbilityOptionFieldID>
>
export const AssetAbilityControlFieldID = Type.RegEx(
	joinPatterns(AssetAbilityID.pattern as string, ID.JOINER, 'controls', KEY),
	// /^[a-z0-9_]{3,}\/assets(\/[a-z][a-z_]*){2}\/abilities\/[0-2]\/controls\/[a-z][a-z_]*$/,
	{ $id: '#/$defs/AssetAbilityControlFieldID' }
)
export type AssetAbilityControlFieldID = Static<
	typeof AssetAbilityControlFieldID
>

export const DelveSiteID = Type.RegEx(
	new RegExp(
		joinPatterns(FRAGMENT_SOURCEBOOK_KEY, ID.JOINER, 'delve_sites', KEY)
	),
	// /^[a-z0-9_]{3,}\/delve_sites\/[a-z][a-z_]*$/,
	{
		examples: ['delve/delve_sites/alvas_rest'],
		$id: '#/$defs/DelveSiteID'
	}
)
export type DelveSiteID = Opaque<Static<typeof DelveSiteID>>

export const DelveSiteDenizenID = Type.RegEx(
	joinPatterns(DelveSiteID.pattern as string, ID.JOINER, `denizens`, RANGE),
	// /^[a-z0-9_]{3,}\/delve_sites\/[a-z][a-z_]*\/denizens\/[1-9][0-9]*-[1-9][0-9]*/,
	{
		examples: ['delve/delve_sites/alvas_rest/denizens/1-27'],
		$id: '#/$defs/DelveSiteDenizenID'
	}
)
export type DelveSiteDenizenID = Opaque<Static<typeof DelveSiteID>>

export const DelveSiteThemeID = ID.forNode('site_themes').toSchema({
	$id: '#/$defs/DelveSiteThemeID',
	examples: ['delve/site_themes/hallowed']
})
export type DelveSiteThemeID = Opaque<Static<typeof DelveSiteThemeID>>

export const ThemeFeatureRowID = Type.RegEx(
	joinPatterns(
		DelveSiteThemeID.pattern as string,
		ID.JOINER,
		'features',
		RANGE
	),
	// /^[a-z0-9_]{3,}\/site_themes\/[a-z][a-z_]*\/features\/[1-9][0-9]*-[1-9][0-9]*$/,
	{ $id: '#/$defs/ThemeFeatureRowID' }
)
export type ThemeFeatureRowID = Opaque<Static<typeof ThemeFeatureRowID>>

export const ThemeDangerRowID = Type.RegEx(
	joinPatterns(DelveSiteThemeID.pattern as string, ID.JOINER, 'dangers', RANGE),
	{ $id: '#/$defs/ThemeDangerRowID' }
)
export type ThemeDangerRowID = Opaque<Static<typeof ThemeDangerRowID>>

export const DelveSiteDomainID = Type.RegEx(
	joinPatterns(FRAGMENT_SOURCEBOOK_KEY, ID.JOINER, 'site_domains', KEY),
	{
		$id: '#/$defs/DelveSiteDomainID',
		examples: ['delve/site_domains/shadowfen']
	}
)
export type DelveSiteDomainID = Opaque<Static<typeof DelveSiteDomainID>>

export const DomainFeatureRowID = Type.RegEx(
	joinPatterns(
		DelveSiteDomainID.pattern as string,
		ID.JOINER,
		'features',
		RANGE
	),
	{ $id: '#/$defs/DomainFeatureRowID' }
)
export type DomainFeatureRowID = Opaque<Static<typeof DomainFeatureRowID>>

export const DomainDangerRowID = Type.RegEx(
	joinPatterns(
		DelveSiteDomainID.pattern as string,
		ID.JOINER,
		'dangers',
		RANGE
	),
	{ $id: '#/$defs/DomainDangerRowID' }
)
export type DomainDangerRowID = Opaque<Static<typeof DomainDangerRowID>>

export const MoveID = Type.RegEx(
	/^[a-z0-9_]{3,}\/(moves\/[a-z][a-z_]*\/[a-z][a-z_]*|assets\/[a-z][a-z_]*\/[a-z][a-z_]*\/abilities\/[0-2]\/moves\/[a-z][a-z_]*)$/,
	{
		description: 'A move ID, for a standard move or a unique asset move',
		examples: [
			'classic/moves/combat/strike',
			'starforged/assets/module/grappler/abilities/0/moves/ready_grappler'
		],
		$id: '#/$defs/MoveID'
	}
)
export type MoveID = Opaque<Static<typeof MoveID>>
export const MoveIDWildcard = Type.RegEx(
	/^([a-z0-9_]{3,}|\*)\/(moves\/([a-z_]+|\*)\/([a-z_]+|\*)|assets\/([a-z_]+|\*)\/([a-z_]+|\*)\/abilities\/([0-2]|\*)\/moves\/([a-z_]+|\*))$/,
	{
		title: 'Move ID (with wildcard)',
		description: 'A move ID with wildcards',
		examples: [
			'*/moves/*/face_danger',
			'*/assets/ritual/*/abilities/*/moves/*'
		],
		$id: '#/$defs/MoveIDWildcard'
	}
)
export type MoveIDWildcard = Opaque<Static<typeof MoveIDWildcard>>

export const MoveCategoryID = Type.RegEx(CollectionID('moves'), {
	examples: ['starforged/collections/moves/adventure'],
	$id: '#/$defs/MoveCategoryID'
})
export type MoveCategoryID = Opaque<Static<typeof MoveCategoryID>>

export const OracleCollectionID = Type.RegEx(CollectionID('oracles', true), {
	examples: [
		'starforged/collections/oracles/core',
		'starforged/collections/oracles/character/names',
		'starforged/collections/oracles/planets/furnace/settlements'
	],
	$id: '#/$defs/OracleCollectionID'
})
export type OracleCollectionID = Opaque<Static<typeof OracleCollectionID>>

export const OracleTableID = Type.RegEx(NodeID('oracles', true), {
	examples: [
		'starforged/oracles/core/action',
		'starforged/oracles/character/names/given',
		'starforged/oracles/planets/furnace/settlements/terminus'
	],
	$id: '#/$defs/OracleTableID'
})
export type OracleTableID = Opaque<Static<typeof OracleTableID>>

export const OracleTableIDWildcard = Type.RegEx(
	NodeIDWildcard('oracles', true),
	// /^([a-z0-9_]{3,}|\*)\/oracles((\/([a-z_]+|\*)){1,3}|\/\*\*)\/([a-z_]+|\*)$/

	{
		description: `Oracle table wildcards can also use '**' to represent any number of collection levels in the oracle tree. For example, 'starforged/oracles/**/location' represents any starforged table with the "location" key.`,
		examples: [
			'*/oracles/**/peril',
			'starforged/oracles/character/names/*',
			'starforged/oracles/planets/*/settlements/*'
		],
		$id: '#/$defs/OracleTableIDWildcard'
	}
)
export type OracleTableIDWildcard = Opaque<Static<typeof OracleTableIDWildcard>>

export const OracleTableRowID = Type.RegEx(
	joinPatterns(
		OracleTableID.pattern as string,
		/([1-9][0-9]*-[1-9][0-9]*)|(0|[1-9][0-9]*)/
	),
	// /^[a-z0-9_]{3,}\/oracles(\/[a-z][a-z_]*){2,4}\/([1-9][0-9]*-[1-9][0-9]*)|(0|[1-9][0-9]*)$/
	{
		examples: [
			'classic/oracles/action_and_theme/action/1-1',
			'starforged/oracles/derelicts/zones/starship/0'
		],
		description:
			"Normally, rows will end with two numbers separated by a dash, indicating their dice range.\n\nRows with a single number represent unrollable rows that are sometimes included for rendering purposes; in this case, the number represents the row's index.",
		$id: '#/$defs/OracleTableRowID'
	}
)
export type OracleTableRowID = Opaque<Static<typeof OracleCollectionID>>

export const RarityID = Type.RegEx(
	joinPatterns(FRAGMENT_SOURCEBOOK_KEY, ID.JOINER, 'rarities', KEY),
	// /^[a-z0-9_]{3,}\/rarities\/[a-z][a-z_]*$/,
	{
		examples: ['classic/rarities/ayethins_journal'],
		$id: '#/$defs/RarityID'
	}
)
export type RarityID = Opaque<Static<typeof RarityID>>

export const RegionEntryID = Type.RegEx(
	joinPatterns(FRAGMENT_SOURCEBOOK_KEY, ID.JOINER, 'regions', KEY),
	// /^[a-z0-9_]{3,}\/regions\/[a-z][a-z_]*$/,
	{
		examples: ['classic/regions/shattered_wastes'],
		$id: '#/$defs/RegionEntryID'
	}
)
export type RegionEntryID = Opaque<Static<typeof RegionEntryID>>

export const WorldTruthID = Type.RegEx(
	joinPatterns(FRAGMENT_SOURCEBOOK_KEY, ID.JOINER, 'world_truths', KEY),

	// /^[a-z0-9_]{3,}\/world_truths\/[a-z][a-z_]*$/,
	{ examples: ['classic/world_truths/iron'], $id: '#/$defs/WorldTruthID' }
)
export type WorldTruthID = Opaque<Static<typeof WorldTruthID>>

export const WorldTruthOptionID = Type.RegEx(
	joinPatterns(WorldTruthID.pattern as string, INDEX),
	// /^[a-z0-9_]{3,}\/world_truths\/[a-z][a-z_]*\/(0|[1-9][0-9]*)$/,
	{
		examples: ['classic/world_truths/iron/0'],
		$id: '#/$defs/WorldTruthOptionID'
	}
)
export type WorldTruthOptionID = Opaque<Static<typeof WorldTruthOptionID>>

export const SettingTruthID = Type.RegEx(
	joinPatterns(FRAGMENT_SOURCEBOOK_KEY, ID.JOINER, 'setting_truths', KEY),
	// /^[a-z0-9_]{3,}\/setting_truths\/[a-z][a-z_]*$/,
	{
		examples: ['starforged/setting_truths/iron'],
		$id: '#/$defs/SettingTruthID'
	}
)
export type SettingTruthID = Opaque<Static<typeof SettingTruthID>>

export const SettingTruthOptionID = Type.RegEx(
	joinPatterns(SettingTruthID.pattern as string, INDEX),
	// /^[a-z0-9_]{3,}\/setting_truths\/[a-z][a-z_]*\/(0|[1-9][0-9]*)$/,
	{
		examples: ['starforged/setting_truths/iron/0'],
		$id: '#/$defs/SettingTruthOptionID'
	}
)
export type SettingTruthOptionID = Opaque<Static<typeof SettingTruthOptionID>>
