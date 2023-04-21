import type { ChallengeRank, Display, Encounter, EncounterNatureTypeClassic, EncounterNatureTypeStarforged, EncounterTags, Source, Title, YamlEncounterClassic, YamlEncounterStarforged } from '@schema'

/**
 * @internal
 */
export abstract class EncounterBuilder implements Encounter {
  abstract $id: string
  abstract title: Title
  features: string[]
  drives: string[]
  tactics: string[]
  abstract nature: EncounterNatureTypeClassic | EncounterNatureTypeStarforged
  summary?: string | undefined
  tags?: EncounterTags[] | undefined
  rank: ChallengeRank
  abstract display: Display
  description: string
  abstract source: Source
  'quest_starter': string
  constructor (yaml: YamlEncounterClassic | YamlEncounterStarforged) {
    this.features = yaml.features
    this.drives = yaml.drives
    this.tactics = yaml.tactics
    this.rank = yaml.rank
    this.description = yaml.description
    this.quest_starter = yaml.quest_starter
  }
}
