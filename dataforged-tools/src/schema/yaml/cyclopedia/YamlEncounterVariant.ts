import type { ChallengeRank, EncounterNatureTypeStarforged, EncounterTags, EncounterVariant, YamlStubNode } from '@schema'

/**
 * @internal
 */
export interface YamlEncounterVariant extends YamlStubNode<EncounterVariant, 'nature' | 'variant_of'> {
  $id?: EncounterVariant['$id']
  rank: ChallengeRank
  description: string
  nature?: EncounterNatureTypeStarforged | undefined
  tags?: EncounterTags[] | undefined
}
