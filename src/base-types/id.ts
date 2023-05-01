import { type Static, Type } from '@sinclair/typebox'

export const EncounterClassicID = Type.String()
export type EncounterClassicID = Static<typeof EncounterClassicID>
export const EncounterStarforgedID = Type.String()
export type EncounterStarforgedID = Static<typeof EncounterStarforgedID>
export type EncounterID = EncounterClassicID | EncounterStarforgedID

export const EncounterCollectionID = Type.String()
export type EncounterCollectionID = Static<typeof EncounterCollectionID>

export const AssetID = Type.String()
export type AssetID = Static<typeof AssetID>
export const AssetIDWildcard = Type.String()
export type AssetIDWildcard = Static<typeof AssetIDWildcard>
export const AssetTypeID = Type.String()
export type AssetTypeID = Static<typeof AssetTypeID>

export const AssetOptionFieldID = Type.String()
export type AssetOptionFieldID = Static<typeof AssetOptionFieldID>
export const AssetOptionFieldIDWildcard = Type.String()
export type AssetOptionFieldIDWildcard = Static<
	typeof AssetOptionFieldIDWildcard
>

export const AssetControlFieldID = Type.String()
export type AssetControlFieldID = Static<typeof AssetControlFieldID>
export const AssetControlFieldIDWildcard = Type.String()
export type AssetControlFieldIDWildcard = Static<
	typeof AssetControlFieldIDWildcard
>

export const AssetConditionMeterID = Type.String()
export type AssetConditionMeterID = Static<typeof AssetConditionMeterID>
export const AssetConditionMeterIDWildcard = Type.String()
export type AssetConditionMeterIDWildcard = Static<
	typeof AssetConditionMeterIDWildcard
>
export const AssetConditionMeterControlFieldID = Type.String()
export type AssetConditionMeterControlFieldID = Static<
	typeof AssetConditionMeterControlFieldID
>

export const AssetAbilityID = Type.String()
export type AssetAbilityID = Static<typeof AssetAbilityID>

export const AssetAbilityOptionFieldID = Type.String()
export type AssetAbilityOptionFieldID = Static<typeof AssetAbilityOptionFieldID>
export const AssetAbilityControlFieldID = Type.String()
export type AssetAbilityControlFieldID = Static<
	typeof AssetAbilityControlFieldID
>
