import { DisplayBuilder, EncounterClassicBuilder, SourceBuilder, TitleBuilder } from '@builders'
import type { Display, EncounterClassic, EncounterNatureClassic, Source, YamlEncounterNature } from '@schema'
import { Game } from '@schema'
import { formatId } from '@utils'
import _ from 'lodash-es'

/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @internal
 */
export class EncounterNatureClassicInfoBuilder implements EncounterNatureClassic {
  $id: EncounterNatureClassic['$id']
  Title: EncounterNatureClassic['Title']
  Source: Source
  Display: Display
  Summary: string
  Description: string
  Encounters: {[key: string]: EncounterClassic}
  constructor (yaml: YamlEncounterNature, parentSource: Source) {
    const fragment = yaml._idFragment ?? yaml.Title.Short ?? yaml.Title.Standard ?? yaml.Title.Canonical
    this.$id = formatId(fragment, Game.Ironsworn, 'Encounters')
    this.Title = new TitleBuilder(yaml.Title, this) as EncounterNatureClassic['Title']
    this.Source = new SourceBuilder(yaml.Source ?? SourceBuilder.default(Game.Ironsworn), parentSource)

    this.Display = new DisplayBuilder({
    })
    this.Summary = yaml.Summary
    this.Description = yaml.Description
    this.Encounters = _.mapValues(yaml.Encounters, enc => new EncounterClassicBuilder(enc, this))
  }
}
