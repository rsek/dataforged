import { type TRef, type TString, type Static } from '@sinclair/typebox'
import { type Opaque } from 'type-fest'
import {
	DiceRange,
	Extend,
	Index,
	Pkg,
	Node,
	CollectionId,
	Id,
	RecursiveCollectionId,
	UncollectableId,
	toWildcard,
	IdUnion,
	RecursiveCollectableId
} from '../utils/regex.js'
import { type TUnionOneOf } from '../utils/UnionOneOf.js'

export const RulesetId = Id([Pkg], {
	$id: '#/$defs/RulesetId',
	examples: ['classic', 'starforged'],
	description:
		'The ID of standalone Datasworn package that describes its own ruleset.'
})
export type RulesetId = Static<typeof RulesetId>

export const ExpansionId = Id([Pkg], {
	$id: '#/$defs/ExpansionId',
	examples: ['delve'],
	description:
		'The ID of a Datasworn package that relies on an external package to provide its ruleset.'
})
export type ExpansionId = Static<typeof ExpansionId>

export const DictKey = Id([Node], {
	$id: '#/$defs/DictKey',
	description: 'A key used in a Datasworn dictionary object.',
	$comment:
		"If you need to generate a key from a user-provided label, it's recommended to use a 'slugify' function/library, e.g. https://www.npmjs.com/package/slugify for NodeJS."
})
export type DictKey = Static<typeof DictKey>

export const NpcCollectionId = CollectionId(['npcs'], {
	$id: '#/$defs/NpcCollectionId',
	examples: [
		'classic/collections/npcs/firstborn',
		'starforged/collections/npcs/sample_npcs'
	]
})

export type NpcCollectionId = Opaque<Static<typeof NpcCollectionId>>

export const NpcId = Extend(NpcCollectionId, [Node], {
	$id: '#/$defs/NpcId',
	examples: ['classic/npcs/firstborn/elf', 'starforged/npcs/sample_npcs/chiton']
})

export type NpcId = Opaque<Static<typeof NpcId>>

export const NpcIdWildcard = toWildcard(NpcId, {
	$id: '#/$defs/NpcIdWildcard'
})
export type NpcIdWildcard = Opaque<Static<typeof NpcIdWildcard>>

export const NpcVariantId = Extend(NpcId, ['variants', Node], {
	$id: '#/$defs/NpcVariantId',
	examples: ['starforged/npcs/sample_npcs/chiton/variants/chiton_drone_pack']
})

export type NpcVariantId = Opaque<Static<typeof NpcVariantId>>

export const AssetTypeId = CollectionId(['assets'], {
	$id: '#/$defs/AssetTypeId'
})
export type AssetTypeId = Opaque<Static<typeof AssetTypeId>>

export const AssetId = Extend(AssetTypeId, [Node], {
	$id: '#/$defs/AssetId'
})
export type AssetId = Opaque<Static<typeof AssetId>>

export const AssetIdWildcard = toWildcard(AssetId, {
	$id: '#/$defs/AssetIdWildcard'
})
export type AssetIdWildcard = Opaque<Static<typeof AssetIdWildcard>>

export const AssetOptionFieldId = Extend(AssetId, ['options', Node], {
	$id: '#/$defs/AssetOptionFieldId'
})
export type AssetOptionFieldId = Opaque<Static<typeof AssetOptionFieldId>>

export const AssetOptionFieldIdWildcard = toWildcard(AssetOptionFieldId, {
	$id: '#/$defs/AssetOptionFieldIdWildcard'
})
export type AssetOptionFieldIdWildcard = Static<
	typeof AssetOptionFieldIdWildcard
>

export const AssetControlFieldId = Extend(AssetId, ['controls', Node], {
	$id: '#/$defs/AssetControlFieldId'
})
export type AssetControlFieldId = Opaque<Static<typeof AssetControlFieldId>>

export const AssetControlFieldIdWildcard = toWildcard(AssetControlFieldId, {
	$id: '#/$defs/AssetControlFieldIdWildcard'
})
export type AssetControlFieldIdWildcard = Static<
	typeof AssetControlFieldIdWildcard
>

export const AssetConditionMeterControlFieldId = Extend(
	AssetControlFieldId,
	['controls', Node],
	{ $id: '#/$defs/AssetConditionMeterControlFieldId' }
)
export type AssetConditionMeterControlFieldId = Static<
	typeof AssetConditionMeterControlFieldId
>

export const AssetAbilityId = Extend(AssetId, ['abilities', Index], {
	$id: '#/$defs/AssetAbilityId'
})
export type AssetAbilityId = Opaque<Static<typeof AssetAbilityId>>

export const AssetAbilityOptionFieldId = Extend(
	AssetAbilityId,
	['options', Node],
	{
		$id: '#/$defs/AssetAbilityOptionFieldId'
	}
)
export type AssetAbilityOptionFieldId = Opaque<
	Static<typeof AssetAbilityOptionFieldId>
>

export const AssetAbilityControlFieldId = Extend(
	AssetAbilityId,
	['controls', Node],
	{
		$id: '#/$defs/AssetAbilityControlFieldId'
	}
)
export type AssetAbilityControlFieldId = Opaque<
	Static<typeof AssetAbilityControlFieldId>
>

export const DelveSiteId = UncollectableId(['delve_sites'], {
	examples: ['delve/delve_sites/alvas_rest'],
	$id: '#/$defs/DelveSiteId'
})
export type DelveSiteId = Opaque<Static<typeof DelveSiteId>>

export const DelveSiteDenizenId = Extend(DelveSiteId, ['denizens', DiceRange], {
	examples: ['delve/delve_sites/alvas_rest/denizens/1-27'],
	$id: '#/$defs/DelveSiteDenizenId'
})
export type DelveSiteDenizenId = Opaque<Static<typeof DelveSiteId>>

export const DelveSiteThemeId = UncollectableId(['site_themes'], {
	$id: '#/$defs/DelveSiteThemeId',
	examples: ['delve/site_themes/hallowed']
})
export type DelveSiteThemeId = Opaque<Static<typeof DelveSiteThemeId>>

export const ThemeFeatureRowId = Extend(
	DelveSiteThemeId,
	['features', DiceRange],
	{
		$id: '#/$defs/ThemeFeatureRowId'
	}
)
export type ThemeFeatureRowId = Opaque<Static<typeof ThemeFeatureRowId>>

export const ThemeDangerRowId = Extend(
	DelveSiteThemeId,
	['dangers', DiceRange],
	{
		$id: '#/$defs/ThemeDangerRowId'
	}
)
export type ThemeDangerRowId = Opaque<Static<typeof ThemeDangerRowId>>

export const DelveSiteDomainId = UncollectableId(['site_domains'], {
	$id: '#/$defs/DelveSiteDomainId',
	examples: ['delve/site_domains/shadowfen']
})
export type DelveSiteDomainId = Opaque<Static<typeof DelveSiteDomainId>>

export const DomainFeatureRowId = Extend(
	DelveSiteDomainId,
	['features', DiceRange],
	{
		$id: '#/$defs/DomainFeatureRowId'
	}
)
export type DomainFeatureRowId = Opaque<Static<typeof DomainFeatureRowId>>

export const DomainDangerRowId = Extend(
	DelveSiteDomainId,
	['dangers', DiceRange],
	{
		$id: '#/$defs/DomainDangerRowId'
	}
)
export type DomainDangerRowId = Opaque<Static<typeof DomainDangerRowId>>

export const MoveCategoryId = CollectionId(['moves'], {
	examples: ['starforged/collections/moves/adventure'],
	$id: '#/$defs/MoveCategoryId'
})
export type MoveCategoryId = Opaque<Static<typeof MoveCategoryId>>

const StandardMoveId = Extend(MoveCategoryId, [Node], {
	title: 'StandardMoveId',
	description: 'A move ID for a standard move.'
})
const AssetMoveId = Extend(AssetAbilityId, ['moves', Node], {
	title: 'AssetMoveId',
	description: 'A move ID for an asset move.'
})

export const MoveId = IdUnion([StandardMoveId, AssetMoveId], {
	description: 'A move ID, for a standard move or a unique asset move',
	examples: [
		'classic/moves/combat/strike',
		'starforged/assets/module/grappler/abilities/0/moves/ready_grappler'
	],
	$id: '#/$defs/MoveId'
})
export type MoveId = Opaque<Static<typeof MoveId>>

export const MoveIdWildcard = IdUnion(
	[StandardMoveId, AssetMoveId].map((id) => toWildcard(id)),
	{
		title: 'Move ID (with wildcard)',
		description: 'A move ID with wildcards.',
		examples: [
			'*/moves/*/face_danger',
			'*/assets/ritual/*/abilities/*/moves/*'
		],
		$id: '#/$defs/MoveIdWildcard'
	}
)
export type MoveIdWildcard = Opaque<Static<typeof MoveIdWildcard>>

export const OracleCollectionId = RecursiveCollectionId(['oracles'], {
	examples: [
		'starforged/collections/oracles/core',
		'starforged/collections/oracles/character/names',
		'starforged/collections/oracles/planets/furnace/settlements'
	],
	$id: '#/$defs/OracleCollectionId'
})
export type OracleCollectionId = Opaque<Static<typeof OracleCollectionId>>

export const OracleTableId = RecursiveCollectableId(['oracles'], {
	title: 'OracleTableId',
	examples: [
		'starforged/oracles/core/action',
		'starforged/oracles/character/names/given',
		'starforged/oracles/planets/furnace/settlements/terminus'
	],
	$id: '#/$defs/OracleTableId'
})
export type OracleTableId = Opaque<Static<typeof OracleTableId>>

export const OracleTableIdWildcard = toWildcard(OracleTableId, {
	description: `Oracle table wildcards can also use '**' to represent any number of collection levels in the oracle tree.`,
	// For example, 'starforged/oracles/\*\*/location' represents any starforged table with the "location" key.`,
	// the double asterisk messes with JTD here :thinking:
	examples: [
		'*/oracles/**/peril',
		'starforged/oracles/character/names/*',
		'starforged/oracles/planets/*/settlements/*'
	],
	$id: '#/$defs/OracleTableIdWildcard'
})
export type OracleTableIdWildcard = Opaque<Static<typeof OracleTableIdWildcard>>

const RowWithRange = Extend(OracleTableId, [DiceRange])
const RowNull = Extend(OracleTableId, [Index])

export const OracleTableRowId = IdUnion([RowWithRange, RowNull], {
	examples: [
		'classic/oracles/action_and_theme/action/1-1',
		'starforged/oracles/derelicts/zones/starship/0'
	],
	description:
		"Normally, rows will end with two numbers separated by a dash, indicating their dice range.\n\nRows with a single number represent unrollable rows that are sometimes included for rendering purposes; in this case, the number represents the row's index.",
	$id: '#/$defs/OracleTableRowId'
})
export type OracleTableRowId = Opaque<Static<typeof OracleCollectionId>>

export const RarityId = UncollectableId(['rarities'], {
	examples: ['classic/rarities/ayethins_journal'],
	$id: '#/$defs/RarityId'
})
export type RarityId = Opaque<Static<typeof RarityId>>

export const AtlasId = CollectionId(['atlas'], {
	examples: ['classic/collections/atlas/ironlands'],
	$id: '#/$defs/AtlasId'
})
export type AtlasId = Opaque<Static<typeof AtlasId>>

export const AtlasIdWildcard = toWildcard(AtlasId, {
	$id: '#/$defs/AtlasIdWildcard'
})
export type AtlasIdWildcard = Static<typeof AtlasIdWildcard>

export const AtlasEntryId = Extend(AtlasId, [Node], {
	examples: ['classic/atlas/ironlands/hinterlands'],
	$id: '#/$defs/AtlasEntryId'
})
export type AtlasEntryId = Opaque<Static<typeof AtlasEntryId>>

export const AtlasEntryIdWildcard = toWildcard(AtlasEntryId, {
	$id: '#/$defs/AtlasEntryIdWildcard'
})
export type AtlasEntryIdWildcard = Opaque<Static<typeof AtlasEntryIdWildcard>>

export const TruthId = UncollectableId(['truths'], {
	examples: ['classic/truths/iron', 'starforged/truths/iron'],
	$id: '#/$defs/TruthId'
})
export type TruthId = Opaque<Static<typeof TruthId>>

export const TruthOptionId = Extend(TruthId, [Index], {
	examples: ['classic/truths/iron/0', 'starforged/truths/iron/0'],
	$id: '#/$defs/TruthOptionId'
})
export type TruthOptionId = Opaque<Static<typeof TruthOptionId>>

const RuleIdHead = Id([Pkg, 'rules'])

export const StatRuleId = Extend(RuleIdHead, ['stats', Node], {
	$id: '#/$defs/StatRuleId'
})
export type StatRuleId = Static<typeof StatRuleId>

export const ConditionMeterRuleId = Extend(
	RuleIdHead,
	['condition_meters', Node],
	{
		$id: '#/$defs/ConditionMeterRuleId',
		examples: [
			'classic/rules/condition_meters/health',
			'starforged/rules/condition_meters/spirit'
		]
	}
)
export type ConditionMeterRuleId = Static<typeof ConditionMeterRuleId>

export const SpecialTrackRuleId = Extend(RuleIdHead, ['special_tracks', Node], {
	$id: '#/$defs/SpecialTrackRuleId',
	examples: [
		'classic/rules/special_tracks/bonds',
		'delve/rules/special_tracks/failure',
		'starforged/rules/special_tracks/bonds_legacy'
	]
})
export type SpecialTrackRuleId = Static<typeof SpecialTrackRuleId>

export const ImpactRuleCollectionId = CollectionId(['rules', 'impacts'], {
	$id: '#/$defs/ImpactRuleCollectionId',
	examples: [
		'classic/collections/rules/impacts/conditions',
		'starforged/collections/rules/impacts/vehicle_troubles'
	]
})
export type ImpactRuleCollectionId = Static<typeof ImpactRuleCollectionId>

export const ImpactRuleId = Extend(ImpactRuleCollectionId, [Node], {
	$id: '#/$defs/ImpactRuleId',
	examples: [
		'classic/rules/impacts/conditions/wounded',
		'starforged/rules/impacts/vehicle_troubles/battered'
	]
})
export type ImpactRuleId = Static<typeof ImpactRuleId>
export type AnyID = TRef<TString | TUnionOneOf<TString[]>>
