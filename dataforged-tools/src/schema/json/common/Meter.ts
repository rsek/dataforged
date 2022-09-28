import type { HasId, HasLabel } from '@schema'

/**
 * Base interface for properties common to all resource meters.
 * @see {@link ConditionMeter}
 * @public
 */
export interface Meter extends HasId, HasLabel {
  /**
   * The minimum value of the meter. Usually this is 0. Momentum is currently the only exception to this and goes as low as -6.
   */
  Min: number
  /**
   * The maximum value of the meter.
   */
  Max: number
  /**
   * The initial value of the meter.
   */
  Value: number
  /**
   * Whether the meter value can be used in place of a stat in an action roll.
   */
  Rollable: boolean
  /**
   * @pattern ^[a-z].+$
   */
  Label: string
}

/**
 * Names of non-player condition meters (for e.g. companions and vehicles) that are referenced by moves and other assets.
 * If an asset condition meter can be used in this manner, the alias is included in its Aliases array.
 * @public
 */
export enum MeterAlias {
  Attached_Asset_Meter = 'attached asset meter',
  CompanionHealth = 'companion health',
  VehicleIntegrity = 'vehicle integrity',
  CommandVehicleIntegrity = 'command vehicle integrity',
  SupportVehicleIntegrity = 'support vehicle integrity',
  IncidentalVehicleIntegrity = 'incidental vehicle integrity'
}

/**
 * Enumerates player character resource meters.
 * @public
 */
export enum MeterType {
  Health = 'health',
  Spirit = 'spirit',
  Supply = 'supply',
  Momentum = 'momentum'
};

/**
 * Conditions (such as impacts) that can apply to asset cards with condition meters. These are typically presented as tick boxes on the asset card.
 * @public
 * @deprecated
 */
export enum MeterCondition {
  /**
   * Battered may be marked when your vehicle is at 0 integrity and you fail to Withstand Damage. The vehicle is barely holding together.
   * @page 51
   */
  Battered = 'battered',
  /**
   * Cursed may be marked when your command vehicle (STARSHIP asset) is at 0 integrity and you fail to Withstand Damage. This is a permanent impact. Your ship will never be quite right again.
   * @page 51
   */
  Cursed = 'cursed',
  /**
   * When your companion’s health is at 0 and you score a miss, they are out of action. You cannot leverage their support until they gain at least +1 health. Envision what this means in the fiction of your scene.
   * @page 204
   */
  OutOfAction = 'out of action',
  /** Used by "Fleet Commander" asset */
  Wrecked = 'wrecked'
}


/**
 * Interface representing a condition meter such as health, spirit, supply.
 * @public
 */
export interface ConditionMeter extends Meter {
  /**
   * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/condition_meter$
   */
  $id: string
  /**
   * @default 0
   */
  Min: number
  /**
   * @default 5
   */
  Max: number
  /**
   * Certain common types of asset meters, like companion health and vehicle integrity, are collectively referenced by {@link MoveTriggerOptionAction.Using}. The array will include an appropriate alias if that is the case.
   */
  Aliases?: MeterAlias[] | undefined
}
