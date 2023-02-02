import { DisplayBuilder, EncounterClassicBuilder, SourceBuilder, TitleBuilder } from '@builders'
import type { Display, EncounterClassic, EncounterNatureClassic, Source, YamlEncounterNatureClassic } from '@schema'
import { Game } from '@schema'
import type { SnakeCaseString } from '@schema/json/common/String.js'
import { formatId } from '@utils'
import _ from 'lodash'

/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @internal
 */
export class EncounterNatureClassicInfoBuilder implements EncounterNatureClassic {
  $id: EncounterNatureClassic['$id']
  title: EncounterNatureClassic['title']
  source: Source
  display: Display
  summary: string
  description: string
  encounters: { [key: SnakeCaseString]: EncounterClassic }
  constructor (yaml: YamlEncounterNatureClassic, parentSource: Source) {
    const fragment = yaml._idFragment ?? yaml.title.short ?? yaml.title.standard ?? yaml.title.canonical
    this.$id = formatId(fragment, Game.Ironsworn, 'Encounters')
    this.title = new TitleBuilder(yaml.title, this) as EncounterNatureClassic['title']
    this.source = new SourceBuilder(yaml.source ?? SourceBuilder.defaultByGame(Game.Ironsworn), parentSource)

    this.display = new DisplayBuilder({
    })
    this.summary = yaml.summary
    this.description = yaml.description
    this.encounters = _.mapValues(yaml.encounters, enc => new EncounterClassicBuilder(enc, this))
  }
}
