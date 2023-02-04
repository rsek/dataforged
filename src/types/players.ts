export default interface Player {}
export interface Extend extends Partial<Player> {}

type Stat = 'edge' | 'heart' | 'iron' | 'shadow' | 'wits'
export type StatID = `player/stats/${Stat}`
type ConditionMeter = 'health' | 'spirit' | 'supply'
export type ConditionMeterID = `player/condition_meters/${ConditionMeter}`