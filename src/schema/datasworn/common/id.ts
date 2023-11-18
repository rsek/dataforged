import { Type, type Static } from '@sinclair/typebox'
import { type Opaque } from 'type-fest'
import {
	DiceRange,
	Extend,
	Index,
	Namespace,
	Node,
	CollectionID,
	ID,
	RecursiveCollectionID,
	UncollectableID,
	toWildcard
} from './regex.js'

export const NamespaceID = ID([Namespace], {
	$id: '#/$defs/NamespaceID',
	examples: ['classic', 'delve', 'starforged', 'sundered_isles']
})
export type NamespaceID = Static<typeof NamespaceID>

export const DictKey = ID([Node], { $id: '#/$defs/DictKey' })
export type DictKey = Static<typeof DictKey>

export const NpcCollectionID = CollectionID(['npcs'], {
	$id: '#/$defs/NpcCollectionID',
	examples: [
		'classic/collections/npcs/firstborn',
		'starforged/collections/npcs/sample_npcs'
	]
})

export type NpcCollectionID = Opaque<Static<typeof NpcCollectionID>>

export const NpcID = Extend(NpcCollectionID, [Node], {
	$id: '#/$defs/NpcID',
	examples: ['classic/npcs/firstborn/elf', 'starforged/npcs/sample_npcs/chiton']
})

export type NpcID = Opaque<Static<typeof NpcID>>

export const NpcIDWildcard = toWildcard(NpcID, {
	$id: '#/$defs/NpcIDWildcard'
})
export type NpcIDWildcard = Opaque<Static<typeof NpcIDWildcard>>

export const NpcVariantID = Extend(NpcID, ['variants', Node], {
	$id: '#/$defs/NpcVariantID',
	examples: ['starforged/npcs/sample_npcs/chiton/variants/chiton_drone_pack']
})

export type NpcVariantID = Opaque<Static<typeof NpcVariantID>>

export const AssetTypeID = CollectionID(['assets'], {
	$id: '#/$defs/AssetTypeID'
})
export type AssetTypeID = Opaque<Static<typeof AssetTypeID>>

export const AssetID = Extend(AssetTypeID, [Node], {
	$id: '#/$defs/AssetID'
})
export type AssetID = Opaque<Static<typeof AssetID>>

export const AssetIDWildcard = toWildcard(AssetID, {
	$id: '#/$defs/AssetIDWildcard'
})
export type AssetIDWildcard = Opaque<Static<typeof AssetIDWildcard>>

export const AssetOptionFieldID = Extend(AssetID, ['options', Node], {
	$id: '#/$defs/AssetOptionFieldID'
})
export type AssetOptionFieldID = Opaque<Static<typeof AssetOptionFieldID>>

export const AssetOptionFieldIDWildcard = toWildcard(AssetOptionFieldID, {
	$id: '#/$defs/AssetOptionFieldIDWildcard'
})
export type AssetOptionFieldIDWildcard = Static<
	typeof AssetOptionFieldIDWildcard
>

export const AssetControlFieldID = Extend(AssetID, ['controls', Node], {
	$id: '#/$defs/AssetControlFieldID'
})
export type AssetControlFieldID = Opaque<Static<typeof AssetControlFieldID>>

export const AssetControlFieldIDWildcard = toWildcard(AssetControlFieldID, {
	$id: '#/$defs/AssetControlFieldIDWildcard'
})
export type AssetControlFieldIDWildcard = Static<
	typeof AssetControlFieldIDWildcard
>

export const AssetConditionMeterControlFieldID = Extend(
	AssetControlFieldID,
	['controls', Node],
	{ $id: '#/$defs/AssetConditionMeterControlFieldID' }
)
export type AssetConditionMeterControlFieldID = Static<
	typeof AssetConditionMeterControlFieldID
>

export const AssetAbilityID = Extend(AssetID, ['abilities', Index], {
	$id: '#/$defs/AssetAbilityID'
})
export type AssetAbilityID = Opaque<Static<typeof AssetAbilityID>>

export const AssetAbilityOptionFieldID = Extend(
	AssetAbilityID,
	['options', Node],
	{ $id: '#/$defs/AssetAbilityOptionFieldID' }
)
export type AssetAbilityOptionFieldID = Opaque<
	Static<typeof AssetAbilityOptionFieldID>
>

export const AssetAbilityControlFieldID = Extend(
	AssetAbilityID,
	['controls', Node],
	{ $id: '#/$defs/AssetAbilityControlFieldID' }
)
export type AssetAbilityControlFieldID = Opaque<
	Static<typeof AssetAbilityControlFieldID>
>

export const DelveSiteID = UncollectableID(['delve_sites'], {
	examples: ['delve/delve_sites/alvas_rest'],
	$id: '#/$defs/DelveSiteID'
})
export type DelveSiteID = Opaque<Static<typeof DelveSiteID>>

export const DelveSiteDenizenID = Extend(DelveSiteID, ['denizens', DiceRange], {
	examples: ['delve/delve_sites/alvas_rest/denizens/1-27'],
	$id: '#/$defs/DelveSiteDenizenID'
})
export type DelveSiteDenizenID = Opaque<Static<typeof DelveSiteID>>

export const DelveSiteThemeID = UncollectableID(['site_themes'], {
	$id: '#/$defs/DelveSiteThemeID',
	examples: ['delve/site_themes/hallowed']
})
export type DelveSiteThemeID = Opaque<Static<typeof DelveSiteThemeID>>

export const ThemeFeatureRowID = Extend(
	DelveSiteThemeID,
	['features', DiceRange],
	{ $id: '#/$defs/ThemeFeatureRowID' }
)
export type ThemeFeatureRowID = Opaque<Static<typeof ThemeFeatureRowID>>

export const ThemeDangerRowID = Extend(
	DelveSiteThemeID,
	['dangers', DiceRange],
	{ $id: '#/$defs/ThemeDangerRowID' }
)
export type ThemeDangerRowID = Opaque<Static<typeof ThemeDangerRowID>>

export const DelveSiteDomainID = UncollectableID(['site_domains'], {
	$id: '#/$defs/DelveSiteDomainID',
	examples: ['delve/site_domains/shadowfen']
})
export type DelveSiteDomainID = Opaque<Static<typeof DelveSiteDomainID>>

export const DomainFeatureRowID = Extend(
	DelveSiteDomainID,
	['features', DiceRange],
	{ $id: '#/$defs/DomainFeatureRowID' }
)
export type DomainFeatureRowID = Opaque<Static<typeof DomainFeatureRowID>>

export const DomainDangerRowID = Extend(
	DelveSiteDomainID,
	['dangers', DiceRange],
	{ $id: '#/$defs/DomainDangerRowID' }
)
export type DomainDangerRowID = Opaque<Static<typeof DomainDangerRowID>>

export const MoveCategoryID = CollectionID(['moves'], {
	examples: ['starforged/collections/moves/adventure'],
	$id: '#/$defs/MoveCategoryID'
})
export type MoveCategoryID = Opaque<Static<typeof MoveCategoryID>>

const StandardMoveID = Extend(MoveCategoryID, [Node], {
	description: 'A move ID for a standard move.'
})
const AssetMoveID = Extend(AssetAbilityID, ['moves', Node], {
	description: 'A move ID for an asset move.'
})

export const MoveID = Type.Union([StandardMoveID, AssetMoveID], {
	description: 'A move ID, for a standard move or a unique asset move',
	examples: [
		'classic/moves/combat/strike',
		'starforged/assets/module/grappler/abilities/0/moves/ready_grappler'
	],
	$id: '#/$defs/MoveID'
})
export type MoveID = Opaque<Static<typeof MoveID>>
export const MoveIDWildcard = Type.Union(
	[StandardMoveID, AssetMoveID].map((id) => toWildcard(id)),
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

export const OracleCollectionID = RecursiveCollectionID(['oracles'], {
	examples: [
		'starforged/collections/oracles/core',
		'starforged/collections/oracles/character/names',
		'starforged/collections/oracles/planets/furnace/settlements'
	],
	$id: '#/$defs/OracleCollectionID'
})
export type OracleCollectionID = Opaque<Static<typeof OracleCollectionID>>

export const OracleTableID = Extend(OracleCollectionID, [Node], {
	examples: [
		'starforged/oracles/core/action',
		'starforged/oracles/character/names/given',
		'starforged/oracles/planets/furnace/settlements/terminus'
	],
	$id: '#/$defs/OracleTableID'
})
export type OracleTableID = Opaque<Static<typeof OracleTableID>>

export const OracleTableIDWildcard = toWildcard(OracleTableID, {
	description: `Oracle table wildcards can also use '**' to represent any number of collection levels in the oracle tree. For example, 'starforged/oracles/**/location' represents any starforged table with the "location" key.`,
	examples: [
		'*/oracles/**/peril',
		'starforged/oracles/character/names/*',
		'starforged/oracles/planets/*/settlements/*'
	],
	$id: '#/$defs/OracleTableIDWildcard'
})
export type OracleTableIDWildcard = Opaque<Static<typeof OracleTableIDWildcard>>

const RowWithRange = Extend(OracleTableID, [DiceRange])
const RowNull = Extend(OracleTableID, [Index])

export const OracleTableRowID = Type.Union([RowWithRange, RowNull], {
	examples: [
		'classic/oracles/action_and_theme/action/1-1',
		'starforged/oracles/derelicts/zones/starship/0'
	],
	description:
		"Normally, rows will end with two numbers separated by a dash, indicating their dice range.\n\nRows with a single number represent unrollable rows that are sometimes included for rendering purposes; in this case, the number represents the row's index.",
	$id: '#/$defs/OracleTableRowID'
})
export type OracleTableRowID = Opaque<Static<typeof OracleCollectionID>>

export const RarityID = UncollectableID(['rarities'], {
	examples: ['classic/rarities/ayethins_journal'],
	$id: '#/$defs/RarityID'
})
export type RarityID = Opaque<Static<typeof RarityID>>

export const AtlasID = CollectionID(['atlas'], {
	examples: ['classic/collections/atlas/ironlands'],
	$id: '#/$defs/AtlasID'
})
export type AtlasID = Opaque<Static<typeof AtlasID>>

export const AtlasIDWildcard = toWildcard(AtlasID, {
	$id: '#/$defs/AtlasIDWildcard'
})
export type AtlasIDWildcard = Static<typeof AtlasIDWildcard>

export const AtlasEntryID = Extend(AtlasID, [Node], {
	examples: ['classic/atlas/ironlands/hinterlands'],
	$id: '#/$defs/AtlasEntryID'
})
export type AtlasEntryID = Opaque<Static<typeof AtlasEntryID>>

export const AtlasEntryIDWildcard = toWildcard(AtlasEntryID, {
	$id: '#/$defs/AtlasEntryIDWildcard'
})
export type AtlasEntryIDWildcard = Opaque<Static<typeof AtlasEntryIDWildcard>>

export const TruthID = UncollectableID(['truths'], {
	examples: ['classic/truths/iron', 'starforged/truths/iron'],
	$id: '#/$defs/TruthID'
})
export type TruthID = Opaque<Static<typeof TruthID>>

export const TruthOptionID = Extend(TruthID, [Index], {
	examples: ['classic/truths/iron/0', 'starforged/truths/iron/0'],
	$id: '#/$defs/TruthOptionID'
})
export type TruthOptionID = Opaque<Static<typeof TruthOptionID>>

const RuleIdHead = ID([Namespace, 'rules'])

export const StatRuleID = Extend(RuleIdHead, ['stats', Node], {
	$id: '#/$defs/StatRuleID'
})
export type StatRuleID = Static<typeof StatRuleID>

export const ConditionMeterRuleID = Extend(
	RuleIdHead,
	['condition_meters', Node],
	{
		$id: '#/$defs/ConditionMeterRuleID'
	}
)
export type ConditionMeterRuleID = Static<typeof ConditionMeterRuleID>

export const SpecialTrackRuleID = Extend(RuleIdHead, ['special_tracks', Node], {
	$id: '#/$defs/SpecialTrackRuleID'
})
export type SpecialTrackRuleID = Static<typeof SpecialTrackRuleID>

export const ImpactRuleCollectionID = CollectionID(['rules', 'impacts'], {
	$id: '#/$defs/ImpactRuleCollectionID'
})
export type ImpactRuleCollectionID = Static<typeof ImpactRuleCollectionID>

export const ImpactRuleID = Extend(ImpactRuleCollectionID, [Node], {
	$id: '#/$defs/ImpactRuleID'
})
export type ImpactRuleID = Static<typeof ImpactRuleID>
