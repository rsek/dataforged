import { type Localize } from '@base-types'

export interface Extend extends Partial<PlayerCharacter> {}

type StatName = 'edge' | 'heart' | 'iron' | 'shadow' | 'wits'
export type StatID = `player/stats/${StatName}`
type ConditionMeterName = 'health' | 'spirit' | 'supply'
export type ConditionMeterID = `player/condition_meters/${ConditionMeterName}`

export interface PlayerCharacter {
	stats: Record<StatName, Stat>
	condition_meters: Record<ConditionMeterName, ConditionMeter>
	momentum: MomentumMeter
}

export interface Stat<Name extends string = Localize.Label> {
	name: Name
	value: number
}

interface MeterBase<Min extends number = number, Max extends number = number> {
	value: number
	min: Min
	max: Max
}

export interface ConditionMeter<Name extends string = Localize.Label>
	extends MeterBase<0> {
	name: Name
}
export interface MomentumMeter extends MeterBase<-6, 10> {
	reset: 2
}
