import type { EncounterStarforged } from '@schema'
import type { StubBy } from '@utils/types/Stub.js'

/**
 * Represents a variant encounter 'stubs' included with a parent encounter in *Ironsworn: Starforged*.
 * @public
 */
export interface EncounterVariant extends StubBy<EncounterStarforged, never, 'features' | 'drives' | 'tactics' | 'variants' | 'summary' | 'your_truth' | 'quest_starter'> {
  /**
   * @pattern ^starforged/encounters/[a-z_]+/[a-z_]+$
   */
  $id: string
  variant_of: EncounterStarforged['$id']
}
