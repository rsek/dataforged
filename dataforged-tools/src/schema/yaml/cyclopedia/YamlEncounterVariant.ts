import type { ChallengeRank, EncounterNatureTypeStarforged, EncounterTags, EncounterVariant, YamlStubNode } from '@schema'

/**
 * @internal
 */
export interface YamlEncounterVariant extends YamlStubNode<EncounterVariant, 'Nature'|'Variant of'> {
  $id?: EncounterVariant['$id']
  Rank: ChallengeRank
  Description: string
  Nature?: EncounterNatureTypeStarforged | undefined
  Tags?: EncounterTags[] | undefined
}
