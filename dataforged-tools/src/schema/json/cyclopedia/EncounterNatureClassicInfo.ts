import type { EncounterClassic, MixinDescription, MixinDisplay, MixinId, MixinSource, MixinSummary, MixinTitle, Title } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'
/**
 * @public
 */
export enum EncounterNatureTypeClassic {
  Ironlander = 'Ironlander',
  Firstborn = 'firstborn',
  Animal = 'animal',
  Beast = 'beast',
  Horror = 'horror',
  Anomaly = 'anomaly',
};

/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @public
 */
export interface EncounterNatureClassic extends MixinDescription, MixinSource, MixinId, MixinDisplay, MixinSummary, MixinTitle {
  /**
   * @pattern ^ironsworn/encounters/[a-z_-]+$
   */
  $id: string
  encounters: { [key: SnakeCaseString]: EncounterClassic }
  title: Title & { short: keyof typeof EncounterNatureTypeClassic }
}
