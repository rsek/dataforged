import { type Static, Type } from '@sinclair/typebox'

export const EncounterClassicID = Type.RegEx(
	/^[a-z0-9_]{3,}\/encounters(\/[a-z_]+){2}$/,
	{
		examples: [
			'classic/encounters/firstborn/elf',
			'delve/encounters/anomalies/glimmer'
		]
	}
)
export type EncounterClassicID = Static<typeof EncounterClassicID>

export const EncounterStarforgedID = Type.RegEx(
	/^[a-z0-9_]{3,}\/encounters\/[a-z_]+(\/variants\/[a-z_]+)?$/,
	{
		examples: [
			'starforged/encounters/chiton',
			'starforged/encounters/chiton/variants/chiton_drone_pack'
		]
	}
)
export type EncounterStarforgedID = Static<typeof EncounterStarforgedID>

export type EncounterID = EncounterClassicID | EncounterStarforgedID

export const EncounterCollectionID = Type.RegEx(
	/^[a-z0-9_]{3,}\/collections\/encounters\/[a-z_]+$/
)
export type EncounterCollectionID = Static<typeof EncounterCollectionID>

export const AssetID = Type.RegEx(/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}$/)
export type AssetID = Static<typeof AssetID>
export const AssetIDWildcard = Type.RegEx(
	/^([a-z_]+|\*)\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)$/
)
export type AssetIDWildcard = Static<typeof AssetIDWildcard>
export const AssetTypeID = Type.RegEx(
	/^[a-z0-9_]{3,}\/collections\/assets\/[a-z_]+$/
)
export type AssetTypeID = Static<typeof AssetTypeID>

export const AssetOptionFieldID = Type.RegEx(
	/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/options\/[a-z_]+/
)
export type AssetOptionFieldID = Static<typeof AssetOptionFieldID>

export const AssetOptionFieldIDWildcard = Type.RegEx(
	/^(\*|[a-z0-9_]{3,})\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)\/options\/[a-z_]+$/
)
export type AssetOptionFieldIDWildcard = Static<
	typeof AssetOptionFieldIDWildcard
>

export const AssetControlFieldID = Type.RegEx(
	/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/controls\/[a-z_]+$/
)
export type AssetControlFieldID = Static<typeof AssetControlFieldID>

export const AssetControlFieldIDWildcard = Type.RegEx(
	/^(\*|[a-z0-9_]{3,})\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)\/controls\/[a-z_]+$/
)
export type AssetControlFieldIDWildcard = Static<
	typeof AssetControlFieldIDWildcard
>

export const AssetConditionMeterID = Type.RegEx(
	/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/condition_meter$/
)
export type AssetConditionMeterID = Static<typeof AssetConditionMeterID>
export const AssetConditionMeterIDWildcard = Type.RegEx(
	/^([a-z_]+|\\*)\/assets\/([a-z_]+|\*)\/([a-z_]+|\*)\/condition_meter$/
)
export type AssetConditionMeterIDWildcard = Static<
	typeof AssetConditionMeterIDWildcard
>
export const AssetConditionMeterControlFieldID = Type.RegEx(
	/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/condition_meter\/controls\/[a-z_]+$/
)
export type AssetConditionMeterControlFieldID = Static<
	typeof AssetConditionMeterControlFieldID
>

export const AssetAbilityID = Type.RegEx(
	/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/[0-2]$/
)
export type AssetAbilityID = Static<typeof AssetAbilityID>

export const AssetAbilityOptionFieldID = Type.RegEx(
	/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/[0-2]\/options\/[a-z_]+$/
)
export type AssetAbilityOptionFieldID = Static<typeof AssetAbilityOptionFieldID>
export const AssetAbilityControlFieldID = Type.RegEx(
	/^[a-z0-9_]{3,}\/assets(\/[a-z_]+){2}\/[0-2]\/controls\/[a-z_]+$/
)
export type AssetAbilityControlFieldID = Static<
	typeof AssetAbilityControlFieldID
>

export const DelveSiteID = Type.RegEx(/^[a-z0-9_]{3,}\/delve_sites\/[a-z_]+$/, {
	examples: ['delve/delve_sites/alvas_rest']
})
export type DelveSiteID = Static<typeof DelveSiteID>

export const DelveSiteThemeID = Type.RegEx(
	/^[a-z0-9_]{3,}\/site_themes\/[a-z_]+$/
)
export type DelveSiteThemeID = Static<typeof DelveSiteThemeID>
export const DelveSiteDomainID = Type.RegEx(
	/^[a-z0-9_]{3,}\/site_domains\/[a-z_]+$/
)
export type DelveSiteDomainID = Static<typeof DelveSiteDomainID>

export const MoveID = Type.RegEx(
	/^[a-z0-9_]{3,}\/(moves\/[a-z_]+\/[a-z_]+|assets\/[a-z_]+\/[a-z_]+\/moves\/[a-z_]+)$/,
	{
		description: 'A move ID, for a standard move or a unique asset move',
		examples: [
			'classic/moves/combat/strike',
			'starforged/assets/module/grappler/moves/ready_grappler'
		]
	}
)
export type MoveID = Static<typeof MoveID>
export const MoveIDWildcard = Type.RegEx(
	/^([a-z0-9_]{3,}|\*)\/(moves\/([a-z_]+|\*)\/([a-z_]+|\*)|assets\/([a-z_]+|\*)\/([a-z_]+|\*)\/moves\/([a-z_]+|\*))$/,
	{
		title: 'Move ID (with wildcard)',
		description: 'A move ID with wildcards',
		examples: ['*/moves/*/face_danger', '*/assets/ritual/*/moves/*']
	}
)
export type MoveIDWildcard = Static<typeof MoveIDWildcard>

export const MoveCategoryID = Type.RegEx(
	/^[a-z0-9_]{3,}\/collections\/moves\/[a-z_]+$/,
	{ examples: ['starforged/collections/moves/adventure'] }
)
export type MoveCategoryID = Static<typeof MoveCategoryID>

export const OracleTableRowID = Type.RegEx(
	/^[a-z0-9_]{3,}\/oracles(\/[a-z_]+){2,4}\/[0-9]{1,3}-[0-9]{1,3}$/,
	{ examples: ['classic/oracles/action_and_theme/action/1-1'] }
)
export type OracleTableRowID = Static<typeof OracleCollectionID>

export const OracleTableID = Type.RegEx(
	/^[a-z0-9_]{3,}\/oracles(\/[a-z_]+){2,4}$/,
	{
		examples: [
			'starforged/oracles/core/action',
			'starforged/oracles/character/names/given',
			'starforged/oracles/planets/furnace/settlements/terminus'
		]
	}
)
export type OracleTableID = Static<typeof OracleTableID>

export const OracleCollectionID = Type.RegEx(
	/^[a-z0-9_]{3,}\/collections\/oracles(\/[a-z_]+){1,3}$/,
	{
		examples: [
			'starforged/collections/oracles/core',
			'starforged/collections/oracles/character/names',
			'starforged/collections/oracles/planets/furnace/settlements'
		]
	}
)
export type OracleCollectionID = Static<typeof OracleCollectionID>

export const RarityID = Type.RegEx(/^[a-z0-9_]{3,}\/rarities\/[a-z_]+$/, {
	examples: ['classic/rarities/ayethins_journal']
})
export type RarityID = Static<typeof RarityID>

export const RegionEntryID = Type.RegEx(/^[a-z0-9_]{3,}\/regions\/[a-z_]+$/, {
	examples: ['classic/regions/shattered_wastes']
})
export type RegionEntryID = Static<typeof RegionEntryID>

export const WorldTruthID = Type.RegEx(
	/^[a-z0-9_]{3,}\/world_truths\/[a-z_]+$/,
	{ examples: ['classic/world_truths/iron'] }
)
export type WorldTruthID = Static<typeof WorldTruthID>

export const WorldTruthOptionID = Type.RegEx(
	/^[a-z0-9_]{3,}\/world_truths\/[a-z_]+\/[0-2]$/,
	{ examples: ['classic/world_truths/iron/0'] }
)
export type WorldTruthOptionID = Static<typeof WorldTruthOptionID>

export const SettingTruthID = Type.RegEx(
	/^[a-z0-9_]{3,}\/setting_truths\/[a-z_]+$/,
	{ examples: ['starforged/setting_truths/iron'] }
)
export type SettingTruthID = Static<typeof SettingTruthID>

export const SettingTruthOptionID = Type.RegEx(
	/^[a-z0-9_]{3,}\/setting_truths\/[a-z_]+\/[0-2]$/,
	{ examples: ['starforged/setting_truths/iron/0'] }
)
export type SettingTruthOptionID = Static<typeof SettingTruthOptionID>
