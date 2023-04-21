import type { EncounterBase } from '@schema'
/**
 * @public
 */
export enum EncounterTags {
  Vehicle = 'vehicle'
}

/**
 * Represents a full (i.e. not a stub/variant) encounter entry in *Ironsworn* or *Ironsworn: Starforged*.
 * @public
 */
export interface Encounter extends EncounterBase {
  features: string[]
  drives: string[]
  tactics: string[]
  quest_starter: string
  your_truth?: string | undefined
}
