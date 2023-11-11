import {
	Type,
	type SchemaOptions,
	type Static,
	type TString
} from '@sinclair/typebox'
import { cloneDeep } from 'lodash-es'
import { DICT_KEY, ELEMENTS, WILDCARD, WILDCARD_MULTI } from './regex.js'
import { type Opaque } from 'type-fest'

const { SEP } = ELEMENTS

/** Composes regular expressions for Datasworn IDs */
class ID {
	static readonly WILDCARD_MULTI = WILDCARD_MULTI
	static readonly SEP = SEP.source
	static readonly RANGE = /([1-9][0-9]*)-([1-9][0-9]*)/.source
	static readonly INDEX = /(0|[1-9][0-9]*)/.source
	static readonly KEY = ELEMENTS.KEY.source
	static readonly KEY_WILDCARD = new RegExp(`(${this.KEY}|${WILDCARD})`).source

	static readonly KEY_RECURSIVE = new RegExp(
		`${this.KEY}(${this.SEP}${this.KEY}){0,2}`
	).source

	static readonly KEY_RECURSIVE_WILDCARD = new RegExp(
		`(${ID.KEY_RECURSIVE}|${this.WILDCARD_MULTI})`
	).source

	static readonly SOURCEBOOK = /([a-z0-9_]{3,})/.source
	static readonly SOURCEBOOK_WILDCARD = new RegExp(
		`(${this.SOURCEBOOK}|${WILDCARD})`
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
			`^${this.fragments.map((frag) => frag.source).join(ID.SEP)}$`
		)
	}

	toString() {
		return this.regExp.source
	}

	toJSON() {
		return this.toString()
	}

	toSchema(options: SchemaOptions = {}) {
		return Type.RegExp(this.regExp, options)
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
const RANGE = `${ID.SEP}${REGEX_RANGE.source}`
const INDEX = `${ID.SEP}${REGEX_INDEX.source}`
const KEY = `${ID.SEP}(${REGEX_DICT_KEY.source})`
const KEY_RECURSIVE = `(${KEY}){1,3}`
const KEY_WILDCARD = `(${KEY}|${ID.SEP}${WILDCARD})`
const KEY_RECURSIVE_WILDCARD = `(${KEY_RECURSIVE}|${ID.SEP}${WILDCARD_MULTI})`

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
		SEP,
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
		SEP,
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
		SEP,
		'collections',
		SEP,
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
		SEP,
		type,
		collectionNodeFragment,
		KEY_WILDCARD
	)
	// return new RegExp(
	// 	`^(${FRAGMENT_SOURCEBOOK.source}|${NODE_WILDCARD})${JOINER}collections${JOINER}${type}${collectionNodeFragment}$`
	// )
}

export const NamespaceID = Type.RegExp(
	new RegExp(`^${REGEX_SOURCEBOOK_KEY.source}$`),
	{
		$id: '#/$defs/NamespaceID',
		examples: ['classic', 'delve', 'starforged', 'sundered_isles']
	}
)
export type NamespaceID = Static<typeof NamespaceID>

export const DictKey = Type.RegExp(DICT_KEY, { $id: '#/$defs/DictKey' })
export type DictKey = Static<typeof DictKey>

export const NpcID = Type.RegExp(NodeID('npcs'), {
	$id: '#/$defs/NpcID',
	examples: ['classic/npcs/firstborn/elf', 'starforged/npcs/sample_npcs/chiton']
})

export type NpcID = Opaque<Static<typeof NpcID>>

export const NpcIDWildcard = Type.RegExp(CollectionIDWildcard('npcs'), {
	$id: '#/$defs/NpcIDWildcard'
})
export type NpcIDWildcard = Opaque<Static<typeof NpcIDWildcard>>

export const NpcCollectionID = Type.RegExp(CollectionID('npcs', false), {
	$id: '#/$defs/NpcCollectionID',
	examples: [
		'classic/collections/npcs/firstborn',
		'starforged/collections/npcs/sample_npcs'
	]
})
export type NpcCollectionID = Opaque<Static<typeof NpcCollectionID>>

export const NpcVariantID = Type.RegExp(
	joinPatterns(NodeID('npcs'), `${ID.SEP}variants${ID.SEP}${ID.KEY}`),
	{
		$id: '#/$defs/NpcVariantID',
		examples: ['starforged/npcs/sample_npcs/chiton/variants/chiton_drone_pack']
	}
)
export type NpcVariantID = Opaque<Static<typeof NpcVariantID>>

export const AssetID = Type.RegExp(NodeID('assets'), {
	$id: '#/$defs/AssetID'
})
export type AssetID = Opaque<Static<typeof AssetID>>
export const AssetIDWildcard = Type.RegExp(NodeIDWildcard('assets'), {
	$id: '#/$defs/AssetIDWildcard'
})
export type AssetIDWildcard = Opaque<Static<typeof AssetIDWildcard>>
export const AssetTypeID = Type.RegExp(CollectionID('assets'), {
	$id: '#/$defs/AssetTypeID'
})
export type AssetTypeID = Opaque<Static<typeof AssetTypeID>>

export const AssetOptionFieldID = Type.RegExp(
	joinPatterns(AssetID.pattern as string, ID.SEP, 'options', KEY),
	// /^[a-z0-9_]{3,}\/assets(\/[a-z][a-z_]*){2}\/options\/[a-z][a-z_]*/,
	{ $id: '#/$defs/AssetOptionFieldID' }
)
export type AssetOptionFieldID = Opaque<Static<typeof AssetOptionFieldID>>

export const AssetOptionFieldIDWildcard = Type.RegExp(
	joinPatterns(AssetIDWildcard.pattern as string, SEP, 'options', KEY_WILDCARD),
	// /^(\*|[a-z0-9_]{3,})\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)\/options\/[a-z][a-z_]*$/,
	{ $id: '#/$defs/AssetOptionFieldIDWildcard' }
)
export type AssetOptionFieldIDWildcard = Static<
	typeof AssetOptionFieldIDWildcard
>

export const AssetControlFieldID = Type.RegExp(
	joinPatterns(AssetID.pattern as string, ID.SEP, 'controls', KEY),
	// /^[a-z0-9_]{3,}\/assets(\/[a-z][a-z_]*){2}\/controls\/[a-z][a-z_]*$/,
	{ $id: '#/$defs/AssetControlFieldID' }
)
export type AssetControlFieldID = Opaque<Static<typeof AssetControlFieldID>>

export const AssetControlFieldIDWildcard = Type.RegExp(
	joinPatterns(
		AssetIDWildcard.pattern as string,
		SEP,
		'controls',
		KEY_WILDCARD
	),
	{ $id: '#/$defs/AssetControlFieldIDWildcard' }
)
export type AssetControlFieldIDWildcard = Static<
	typeof AssetControlFieldIDWildcard
>

export const AssetConditionMeterID = Type.RegExp(
	joinPatterns(AssetID.pattern as string, ID.SEP, `condition_meter`),
	// /^[a-z0-9_]{3,}\/assets(\/[a-z][a-z_]*){2}\/condition_meter$/,
	{ $id: '#/$defs/AssetConditionMeterID', title: 'Asset condition meter ID' }
)
export type AssetConditionMeterID = Opaque<Static<typeof AssetConditionMeterID>>
export const AssetConditionMeterIDWildcard = Type.RegExp(
	joinPatterns(AssetIDWildcard.pattern as string, ID.SEP, 'condition_meter'),
	// /^([a-z0-9_]{3,}|\*)\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)\/condition_meter$/,
	{
		$id: '#/$defs/AssetConditionMeterIDWildcard',
		title: 'Asset condition meter ID (wildcard)'
	}
)
export type AssetConditionMeterIDWildcard = Static<
	typeof AssetConditionMeterIDWildcard
>
export const AssetConditionMeterControlFieldID = Type.RegExp(
	joinPatterns(AssetConditionMeterID.pattern as string, SEP, 'controls', KEY),
	// /^[a-z0-9_]{3,}\/assets(\/[a-z][a-z_]*){2}\/condition_meter\/controls\/[a-z][a-z_]*$/,
	{ $id: '#/$defs/AssetConditionMeterControlFieldID' }
)
export type AssetConditionMeterControlFieldID = Static<
	typeof AssetConditionMeterControlFieldID
>

export const AssetAbilityID = Type.RegExp(
	joinPatterns(AssetID.pattern as string, ID.SEP, 'abilities', ID.SEP, '[0-2]'),
	// /^[a-z0-9_]{3,}\/assets(\/[a-z][a-z_]*){2}\/abilities\/[0-2]$/,
	{ $id: '#/$defs/AssetAbilityID' }
)
export type AssetAbilityID = Opaque<Static<typeof AssetAbilityID>>

export const AssetAbilityOptionFieldID = Type.RegExp(
	joinPatterns(AssetAbilityID.pattern as string, ID.SEP, 'options', KEY),
	// /^[a-z0-9_]{3,}\/assets(\/[a-z][a-z_]*){2}\/abilities\/[0-2]\/options\/[a-z][a-z_]*$/,
	{ $id: '#/$defs/AssetAbilityOptionFieldID' }
)
export type AssetAbilityOptionFieldID = Opaque<
	Static<typeof AssetAbilityOptionFieldID>
>
export const AssetAbilityControlFieldID = Type.RegExp(
	joinPatterns(AssetAbilityID.pattern as string, ID.SEP, 'controls', KEY),
	// /^[a-z0-9_]{3,}\/assets(\/[a-z][a-z_]*){2}\/abilities\/[0-2]\/controls\/[a-z][a-z_]*$/,
	{ $id: '#/$defs/AssetAbilityControlFieldID' }
)
export type AssetAbilityControlFieldID = Static<
	typeof AssetAbilityControlFieldID
>

export const DelveSiteID = Type.RegExp(
	new RegExp(joinPatterns(FRAGMENT_SOURCEBOOK_KEY, ID.SEP, 'delve_sites', KEY)),
	// /^[a-z0-9_]{3,}\/delve_sites\/[a-z][a-z_]*$/,
	{
		examples: ['delve/delve_sites/alvas_rest'],
		$id: '#/$defs/DelveSiteID'
	}
)
export type DelveSiteID = Opaque<Static<typeof DelveSiteID>>

export const DelveSiteDenizenID = Type.RegExp(
	joinPatterns(DelveSiteID.pattern as string, ID.SEP, `denizens`, RANGE),
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

export const ThemeFeatureRowID = Type.RegExp(
	joinPatterns(DelveSiteThemeID.pattern as string, ID.SEP, 'features', RANGE),
	// /^[a-z0-9_]{3,}\/site_themes\/[a-z][a-z_]*\/features\/[1-9][0-9]*-[1-9][0-9]*$/,
	{ $id: '#/$defs/ThemeFeatureRowID' }
)
export type ThemeFeatureRowID = Opaque<Static<typeof ThemeFeatureRowID>>

export const ThemeDangerRowID = Type.RegExp(
	joinPatterns(DelveSiteThemeID.pattern as string, ID.SEP, 'dangers', RANGE),
	{ $id: '#/$defs/ThemeDangerRowID' }
)
export type ThemeDangerRowID = Opaque<Static<typeof ThemeDangerRowID>>

export const DelveSiteDomainID = Type.RegExp(
	joinPatterns(FRAGMENT_SOURCEBOOK_KEY, ID.SEP, 'site_domains', KEY),
	{
		$id: '#/$defs/DelveSiteDomainID',
		examples: ['delve/site_domains/shadowfen']
	}
)
export type DelveSiteDomainID = Opaque<Static<typeof DelveSiteDomainID>>

export const DomainFeatureRowID = Type.RegExp(
	joinPatterns(DelveSiteDomainID.pattern as string, ID.SEP, 'features', RANGE),
	{ $id: '#/$defs/DomainFeatureRowID' }
)
export type DomainFeatureRowID = Opaque<Static<typeof DomainFeatureRowID>>

export const DomainDangerRowID = Type.RegExp(
	joinPatterns(DelveSiteDomainID.pattern as string, ID.SEP, 'dangers', RANGE),
	{ $id: '#/$defs/DomainDangerRowID' }
)
export type DomainDangerRowID = Opaque<Static<typeof DomainDangerRowID>>

export const MoveID = Type.RegExp(
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
export const MoveIDWildcard = Type.RegExp(
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

export const MoveCategoryID = Type.RegExp(CollectionID('moves'), {
	examples: ['starforged/collections/moves/adventure'],
	$id: '#/$defs/MoveCategoryID'
})
export type MoveCategoryID = Opaque<Static<typeof MoveCategoryID>>

export const OracleCollectionID = Type.RegExp(CollectionID('oracles', true), {
	examples: [
		'starforged/collections/oracles/core',
		'starforged/collections/oracles/character/names',
		'starforged/collections/oracles/planets/furnace/settlements'
	],
	$id: '#/$defs/OracleCollectionID'
})
export type OracleCollectionID = Opaque<Static<typeof OracleCollectionID>>

export const OracleTableID = Type.RegExp(NodeID('oracles', true), {
	examples: [
		'starforged/oracles/core/action',
		'starforged/oracles/character/names/given',
		'starforged/oracles/planets/furnace/settlements/terminus'
	],
	$id: '#/$defs/OracleTableID'
})
export type OracleTableID = Opaque<Static<typeof OracleTableID>>

export const OracleTableIDWildcard = Type.RegExp(
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

export const OracleTableRowID = Type.RegExp(
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

export const RarityID = Type.RegExp(
	joinPatterns(FRAGMENT_SOURCEBOOK_KEY, ID.SEP, 'rarities', KEY),
	// /^[a-z0-9_]{3,}\/rarities\/[a-z][a-z_]*$/,
	{
		examples: ['classic/rarities/ayethins_journal'],
		$id: '#/$defs/RarityID'
	}
)
export type RarityID = Opaque<Static<typeof RarityID>>

export const AtlasEntryID = Type.RegExp(NodeID('atlas', true), {
	examples: ['classic/atlas/ironlands/hinterlands'],
	$id: '#/$defs/AtlasEntryID'
})
export type AtlasEntryID = Opaque<Static<typeof AtlasEntryID>>

export const AtlasEntryIDWildcard = Type.RegExp(NodeIDWildcard('atlas', true), {
	$id: '#/$defs/AtlasEntryIDWildcard'
})
export type AtlasEntryIDWildcard = Opaque<Static<typeof AtlasEntryIDWildcard>>

export const AtlasID = Type.RegExp(CollectionID('atlas', true), {
	examples: ['classic/collections/atlas/ironlands'],
	$id: '#/$defs/AtlasID'
})
export type AtlasID = Opaque<Static<typeof AtlasID>>

export const AtlasIDWildcard = Type.RegExp(
	CollectionIDWildcard('atlas', true),
	{
		$id: '#/$defs/AtlasIDWildcard'
	}
)

export const TruthID = Type.RegExp(
	joinPatterns(FRAGMENT_SOURCEBOOK_KEY, ID.SEP, 'truths', KEY),

	// /^[a-z0-9_]{3,}\/truths\/[a-z][a-z_]*$/,
	{
		examples: ['classic/truths/iron', 'starforged/truths/iron'],
		$id: '#/$defs/TruthID'
	}
)
export type TruthID = Opaque<Static<typeof TruthID>>

export const TruthOptionID = Type.RegExp(
	joinPatterns(TruthID.pattern as string, INDEX),
	// /^[a-z0-9_]{3,}\/truths\/[a-z][a-z_]*\/(0|[1-9][0-9]*)$/,
	{
		examples: ['classic/truths/iron/0', 'starforged/truths/iron/0'],
		$id: '#/$defs/TruthOptionID'
	}
)
export type TruthOptionID = Opaque<Static<typeof TruthOptionID>>
