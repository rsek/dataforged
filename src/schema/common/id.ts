import { type Static, Type } from '@sinclair/typebox'
import { type Opaque } from 'type-fest'

export const EncounterClassicID = Type.RegEx(
	/^[a-z0-9_]{3,}\/encounters(\/[a-z_]+){2}$/,
	{
		$id: '#/$defs/EncounterClassicID',
		examples: [
			'classic/encounters/firstborn/elf',
			'delve/encounters/anomalies/glimmer'
		]
	}
)
export type EncounterClassicID = Opaque<Static<typeof EncounterClassicID>>

export const EncounterStarforgedID = Type.RegEx(
	/^[a-z0-9_]{3,}\/encounters\/[a-z_]+(\/variants\/[a-z_]+)?$/,
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

export const EncounterCollectionID = Type.RegEx(
	/^[a-z0-9_]{3,}\/collections\/encounters\/[a-z_]+$/,
	{
		$id: '#/$defs/EncounterCollectionID',
		examples: ['classic/collections/encounters/firstborn']
	}
)
export type EncounterCollectionID = Opaque<Static<typeof EncounterCollectionID>>

export const AssetID = Type.RegEx(/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}$/, {
	$id: '#/$defs/AssetID'
})
export type AssetID = Opaque<Static<typeof AssetID>>
export const AssetIDWildcard = Type.RegEx(
	/^([a-z_]+|\*)\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)$/,
	{ $id: '#/$defs/AssetIDWildcard' }
)
export type AssetIDWildcard = Opaque<Static<typeof AssetIDWildcard>>
export const AssetTypeID = Type.RegEx(
	/^[a-z0-9_]{3,}\/collections\/assets\/[a-z_]+$/,
	{ $id: '#/$defs/AssetTypeID' }
)
export type AssetTypeID = Opaque<Static<typeof AssetTypeID>>

export const AssetOptionFieldID = Type.RegEx(
	/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/options\/[a-z_]+/,
	{ $id: '#/$defs/AssetOptionFieldID' }
)
export type AssetOptionFieldID = Opaque<Static<typeof AssetOptionFieldID>>

export const AssetOptionFieldIDWildcard = Type.RegEx(
	/^(\*|[a-z0-9_]{3,})\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)\/options\/[a-z_]+$/,
	{ $id: '#/$defs/AssetOptionFieldIDWildcard' }
)
export type AssetOptionFieldIDWildcard = Static<
	typeof AssetOptionFieldIDWildcard
>

export const AssetControlFieldID = Type.RegEx(
	/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/controls\/[a-z_]+$/,
	{ $id: '#/$defs/AssetControlFieldID' }
)
export type AssetControlFieldID = Opaque<Static<typeof AssetControlFieldID>>

export const AssetControlFieldIDWildcard = Type.RegEx(
	/^(\*|[a-z0-9_]{3,})\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)\/controls\/[a-z_]+$/,
	{ $id: '#/$defs/AssetControlFieldIDWildcard' }
)
export type AssetControlFieldIDWildcard = Static<
	typeof AssetControlFieldIDWildcard
>

export const AssetConditionMeterID = Type.RegEx(
	/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/condition_meter$/,
	{ $id: '#/$defs/AssetConditionMeterID', title: 'Asset condition meter ID' }
)
export type AssetConditionMeterID = Opaque<Static<typeof AssetConditionMeterID>>
export const AssetConditionMeterIDWildcard = Type.RegEx(
	/^([a-z_]+|\*)\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)\/condition_meter$/,
	{
		$id: '#/$defs/AssetConditionMeterIDWildcard',
		title: 'Asset condition meter ID (wildcard)'
	}
)
export type AssetConditionMeterIDWildcard = Static<
	typeof AssetConditionMeterIDWildcard
>
export const AssetConditionMeterControlFieldID = Type.RegEx(
	/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/condition_meter\/controls\/[a-z_]+$/,
	{ $id: '#/$defs/AssetConditionMeterControlFieldID' }
)
export type AssetConditionMeterControlFieldID = Static<
	typeof AssetConditionMeterControlFieldID
>

export const AssetAbilityID = Type.RegEx(
	/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/abilities\/[0-2]$/,
	{ $id: '#/$defs/AssetAbilityID' }
)
export type AssetAbilityID = Opaque<Static<typeof AssetAbilityID>>

export const AssetAbilityOptionFieldID = Type.RegEx(
	/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/abilities\/[0-2]\/options\/[a-z_]+$/,
	{ $id: '#/$defs/AssetAbilityOptionFieldID' }
)
export type AssetAbilityOptionFieldID = Opaque<
	Static<typeof AssetAbilityOptionFieldID>
>
export const AssetAbilityControlFieldID = Type.RegEx(
	/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/abilities\/[0-2]\/controls\/[a-z_]+$/,
	{ $id: '#/$defs/AssetAbilityControlFieldID' }
)
export type AssetAbilityControlFieldID = Static<
	typeof AssetAbilityControlFieldID
>

export const DelveSiteID = Type.RegEx(/^[a-z0-9_]{3,}\/delve_sites\/[a-z_]+$/, {
	examples: ['delve/delve_sites/alvas_rest'],
	$id: '#/$defs/DelveSiteID'
})
export type DelveSiteID = Opaque<Static<typeof DelveSiteID>>

export const DelveSiteDenizenID = Type.RegEx(
	/^[a-z0-9_]{3,}\/delve_sites\/[a-z_]+$\/denizens\/(0|[1-9][0-9]+)-(0|[1-9][0-9]+)/,
	{
		examples: ['delve/delve_sites/alvas_rest/denizens/1-27'],
		$id: '#/$defs/DelveSiteDenizenID'
	}
)
export type DelveSiteDenizenID = Opaque<Static<typeof DelveSiteID>>

export const DelveSiteThemeID = Type.RegEx(
	/^[a-z0-9_]{3,}\/site_themes\/[a-z_]+$/,
	{ $id: '#/$defs/DelveSiteThemeID', examples: ['delve/site_themes/hallowed'] }
)
export type DelveSiteThemeID = Opaque<Static<typeof DelveSiteThemeID>>

export const ThemeFeatureRowID = Type.RegEx(
	/^[a-z0-9_]{3,}\/site_themes\/[a-z_]+\/features\/[1-9][0-9]*-[1-9][0-9]*$/,
	{ $id: '#/$defs/ThemeFeatureRowID' }
)
export type ThemeFeatureRowID = Opaque<Static<typeof ThemeFeatureRowID>>

export const ThemeDangerRowID = Type.RegEx(
	/^[a-z0-9_]{3,}\/site_themes\/[a-z_]+\/dangers\/[1-9][0-9]*-[1-9][0-9]*$/,
	{ $id: '#/$defs/ThemeDangerRowID' }
)
export type ThemeDangerRowID = Opaque<Static<typeof ThemeDangerRowID>>

export const DelveSiteDomainID = Type.RegEx(
	/^[a-z0-9_]{3,}\/site_domains\/[a-z_]+$/,
	{
		$id: '#/$defs/DelveSiteDomainID',
		examples: ['delve/site_domains/shadowfen']
	}
)
export type DelveSiteDomainID = Opaque<Static<typeof DelveSiteDomainID>>

export const DomainFeatureRowID = Type.RegEx(
	/^[a-z0-9_]{3,}\/site_domains\/[a-z_]+\/features\/[1-9][0-9]*-[1-9][0-9]*$/,
	{ $id: '#/$defs/DomainFeatureRowID' }
)
export type DomainFeatureRowID = Opaque<Static<typeof DomainFeatureRowID>>

export const DomainDangerRowID = Type.RegEx(
	/^[a-z0-9_]{3,}\/site_domains\/[a-z_]+\/dangers\/[1-9][0-9]*-[1-9][0-9]*$/,
	{ $id: '#/$defs/DomainDangerRowID' }
)
export type DomainDangerRowID = Opaque<Static<typeof DomainDangerRowID>>

export const MoveID = Type.RegEx(
	/^[a-z0-9_]{3,}\/(moves\/[a-z_]+\/[a-z_]+|assets\/[a-z_]+\/[a-z_]+\/abilities\/[0-2]\/moves\/[a-z_]+)$/,
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

export const MoveCategoryID = Type.RegEx(
	/^[a-z0-9_]{3,}\/collections\/moves\/[a-z_]+$/,
	{
		examples: ['starforged/collections/moves/adventure'],
		$id: '#/$defs/MoveCategoryID'
	}
)
export type MoveCategoryID = Opaque<Static<typeof MoveCategoryID>>

export const OracleTableRowID = Type.RegEx(
	/^[a-z0-9_]{3,}\/oracles(\/[a-z_]+){2,4}\/([1-9][0-9]*-[1-9][0-9]*)|(0|[1-9][0-9]*)$/,
	{
		examples: [
			'classic/oracles/action_and_theme/action/1-1',
			'starforged/oracles/derelicts/zones/starship/0'
		],
		description:
			"Normally, rows will end with two numbers separated by a dash, representing their dice range.\n\nRows with a single number represent unrollable rows that are sometimes included for rendering purposes; in this case, the number represents the row's index.",
		$id: '#/$defs/OracleTableRowID'
	}
)
export type OracleTableRowID = Opaque<Static<typeof OracleCollectionID>>

export const OracleTableID = Type.RegEx(
	/^[a-z0-9_]{3,}\/oracles(\/[a-z_]+){2,4}$/,
	{
		examples: [
			'starforged/oracles/core/action',
			'starforged/oracles/character/names/given',
			'starforged/oracles/planets/furnace/settlements/terminus'
		],
		$id: '#/$defs/OracleTableID'
	}
)
export type OracleTableID = Opaque<Static<typeof OracleTableID>>

export const OracleCollectionID = Type.RegEx(
	/^[a-z0-9_]{3,}\/collections\/oracles(\/[a-z_]+){1,3}$/,
	{
		examples: [
			'starforged/collections/oracles/core',
			'starforged/collections/oracles/character/names',
			'starforged/collections/oracles/planets/furnace/settlements'
		],
		$id: '#/$defs/OracleCollectionID'
	}
)
export type OracleCollectionID = Opaque<Static<typeof OracleCollectionID>>

export const RarityID = Type.RegEx(/^[a-z0-9_]{3,}\/rarities\/[a-z_]+$/, {
	examples: ['classic/rarities/ayethins_journal'],
	$id: '#/$defs/RarityID'
})
export type RarityID = Opaque<Static<typeof RarityID>>

export const RegionEntryID = Type.RegEx(/^[a-z0-9_]{3,}\/regions\/[a-z_]+$/, {
	examples: ['classic/regions/shattered_wastes'],
	$id: '#/$defs/RegionEntryID'
})
export type RegionEntryID = Opaque<Static<typeof RegionEntryID>>

export const WorldTruthID = Type.RegEx(
	/^[a-z0-9_]{3,}\/world_truths\/[a-z_]+$/,
	{ examples: ['classic/world_truths/iron'], $id: '#/$defs/WorldTruthID' }
)
export type WorldTruthID = Opaque<Static<typeof WorldTruthID>>

export const WorldTruthOptionID = Type.RegEx(
	/^[a-z0-9_]{3,}\/world_truths\/[a-z_]+\/[0-2]$/,
	{
		examples: ['classic/world_truths/iron/0'],
		$id: '#/$defs/WorldTruthOptionID'
	}
)
export type WorldTruthOptionID = Opaque<Static<typeof WorldTruthOptionID>>

export const SettingTruthID = Type.RegEx(
	/^[a-z0-9_]{3,}\/setting_truths\/[a-z_]+$/,
	{
		examples: ['starforged/setting_truths/iron'],
		$id: '#/$defs/SettingTruthID'
	}
)
export type SettingTruthID = Opaque<Static<typeof SettingTruthID>>

export const SettingTruthOptionID = Type.RegEx(
	/^[a-z0-9_]{3,}\/setting_truths\/[a-z_]+\/[0-2]$/,
	{
		examples: ['starforged/setting_truths/iron/0'],
		$id: '#/$defs/SettingTruthOptionID'
	}
)
export type SettingTruthOptionID = Opaque<Static<typeof SettingTruthOptionID>>
