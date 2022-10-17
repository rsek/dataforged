import type { ConditionMeter, Meter } from '@schema'
import type { Asset } from '@schema/json/assets/Asset.js'

/**
 * Enumerates player character stats.
 * @public
 */
export enum Stat {
  Edge = 'edge',
  Heart = 'heart',
  Iron = 'iron',
  Shadow = 'shadow',
  Wits = 'wits'
}

/**
 * Standard player character condition meters. Compare to {@link PcMeterType}
 * @public
 */
export enum PcConditionMeterType {
  Health = 'health',
  Spirit = 'spirit',
  Supply = 'supply'
}
/**
 * Standard player character resource meters. Compare to {@link PcConditionMeterType}.
 * @public
 */
export enum PcMeterType {
  Health = 'health',
  Spirit = 'spirit',
  Supply = 'supply',
  Momentum = 'momentum'
}

/**
 * Describes an *Ironsworn* player character.
 * @public
 */
export interface Pc {
  stats: PcStats
  assets: Asset[]
  meters: PcMeters
  impacts: Record<string, boolean>
}

/**
 * Describes the stats of an *Ironsworn* player character.
 * @public
 */
export interface PcStats extends Record<Stat, number> {
  [Stat.Edge]: number
  [Stat.Heart]: number
  [Stat.Iron]: number
  [Stat.Shadow]: number
  [Stat.Wits]: number
}

/**
 * Describes the resource meters of an *Ironsworn* player character.
 * @public
 */
export interface PcMeters extends Record<PcMeterType, Meter> {
  [PcMeterType.Health]: ConditionMeter
  [PcMeterType.Spirit]: ConditionMeter
  [PcMeterType.Supply]: ConditionMeter
  [PcMeterType.Momentum]: Meter
}
