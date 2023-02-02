import { DisplayBuilder, EncounterVariantBuilder, SourceBuilder, TitleBuilder } from '@builders'
import { Game } from '@schema'
import type { ChallengeRank, Display, EncounterNatureTypeStarforged, EncounterStarforged, EncounterTags, EncounterVariant, Source, Title, YamlEncounterStarforged } from '@schema'
import type { SnakeCaseString } from '@schema/json/common/String.js'
import { formatId } from '@utils'
import _ from 'lodash'

/**
 * @internal
 */
export class EncounterStarforgedBuilder implements EncounterStarforged {
  $id: EncounterStarforged['$id']
  title: Title
  nature: EncounterNatureTypeStarforged
  summary: string
  tags?: EncounterTags[] | undefined
  rank: ChallengeRank
  display: Display
  features: string[]
  drives: string[]
  tactics: string[]
  variants?: { [key: SnakeCaseString]: EncounterVariant } | undefined
  description: string
  quest_starter: string
  source: Source
  constructor (yaml: YamlEncounterStarforged, ...ancestorSourceJson: Source[]) {
    const game = Game.Starforged
    const fragment = yaml._idFragment ?? yaml.title.canonical
    this.$id = formatId(fragment, game, 'encounters')
    this.title = new TitleBuilder(yaml.title, this)
    this.nature = yaml.nature
    this.summary = yaml.summary
    this.tags = yaml.tags
    this.rank = yaml.rank
    this.display = new DisplayBuilder({})
    this.features = yaml.features
    this.drives = yaml.drives
    this.tactics = yaml.tactics
    const newSource = new SourceBuilder(yaml.source ?? SourceBuilder.defaultByGame(Game.Starforged), ...ancestorSourceJson)
    this.description = yaml.description
    this.quest_starter = yaml.quest_starter
    this.source = newSource
    if (yaml.variants != null) {
      this.variants = _.mapValues(yaml.variants, variant => new EncounterVariantBuilder(variant, this))
    }
  }
}
