import type { EncounterStarforged, YamlEncounterVariant, YamlStubNode } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'

/**
 * @internal
 */
export interface YamlEncounterStarforged extends YamlStubNode<EncounterStarforged, '', 'variants'> {
  variants?: { [key: SnakeCaseString]: YamlEncounterVariant } | undefined
}
