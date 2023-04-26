import { type Localize } from '@base-types'
import { type Meter, type NumberRangeBase } from 'base-types/abstract'

export interface Extend extends Partial<PlayerCharacter> {}

type StatName = 'edge' | 'heart' | 'iron' | 'shadow' | 'wits'
export type StatID<TStatName extends string = StatName> =
	`player/stats/${TStatName}`
type ConditionMeterName = 'health' | 'spirit' | 'supply'
export type ConditionMeterID<
	TConditionMeterName extends string = ConditionMeterName
> = `player/condition_meters/${TConditionMeterName}`

export interface PlayerCharacter {
	stats: Record<StatName, Stat>
	condition_meters: Record<ConditionMeterName, ConditionMeter>
	momentum: MomentumMeter
}

export interface PlayerAttribute extends NumberRangeBase {
	id: string
	label: string
	value: number
	min: number
	max: number
}

export interface Stat<TStatName extends string = StatName>
	extends PlayerAttribute {
	id: StatID<TStatName>
	label: TStatName
}

export interface ConditionMeter<TMeterName extends string = ConditionMeterName>
	extends Meter,
		PlayerAttribute {
	id: ConditionMeterID<TMeterName>
	label: TMeterName
}
export interface MomentumMeter extends Meter, PlayerAttribute {
	label: 'Momentum'
	id: 'player/momentum'
	reset: { value: number }
}
