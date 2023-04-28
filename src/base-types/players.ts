import { type Localize } from '@base-types'
import { type Meter, type NumberRangeBase } from 'base-types/abstract'

export interface Extend extends Partial<PlayerCharacter> {}

export type PlayerStat = 'edge' | 'heart' | 'iron' | 'shadow' | 'wits'
export type PlayerStatID<TStatName extends string = PlayerStat> =
	`player/stats/${TStatName}`
export type PlayerConditionMeter = 'health' | 'spirit' | 'supply'
export type PlayerConditionMeterID<
	TConditionMeterName extends string = PlayerConditionMeter
> = `player/condition_meters/${TConditionMeterName}`

export type PlayerStatLike = PlayerStat | PlayerConditionMeter

export interface PlayerCharacter {
	stats: Record<PlayerStat, PlayerStatInfo>
	condition_meters: Record<PlayerConditionMeter, ConditionMeterInfo>
	momentum: MomentumMeter
}

export interface PlayerAttribute extends NumberRangeBase {
	id: string
	label: string
	value: number
	min: number
	max: number
}

export interface PlayerStatInfo<TStatName extends string = PlayerStat>
	extends PlayerAttribute {
	id: PlayerStatID<TStatName>
	label: TStatName
}

export interface ConditionMeterInfo<
	TMeterName extends string = PlayerConditionMeter
> extends Meter,
		PlayerAttribute {
	id: PlayerConditionMeterID<TMeterName>
	label: TMeterName
}
export interface MomentumMeter extends Meter, PlayerAttribute {
	label: 'Momentum'
	id: 'player/momentum'
	reset: { value: number }
}
