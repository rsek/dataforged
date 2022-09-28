import { DisplayBuilder, EncounterBuilder, SourceBuilder, TitleBuilder } from '@builders'
import { EncounterNatureTypeClassic, Game } from '@schema'
import type { Display, EncounterClassic, EncounterNatureClassic, Source, Title, YamlEncounterClassic } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class EncounterClassicBuilder extends EncounterBuilder implements EncounterClassic {
  $id: EncounterClassic['$id']
  Title: Title
  Nature: EncounterNatureTypeClassic
  Display: Display
  Source: Source
  'Your truth'?: string | undefined
  constructor (yaml: YamlEncounterClassic, parent: EncounterNatureClassic) {
    super(yaml)
    const fragment = yaml._idFragment ?? yaml.Title.Short ?? yaml.Title.Standard ?? yaml.Title.Canonical
    this.$id = formatId(fragment, parent.$id)
    this.Title = new TitleBuilder(yaml.Title, this)
    this.Nature = EncounterNatureTypeClassic[parent.Title.Short]
    this.Display = new DisplayBuilder({})
    this.Source = new SourceBuilder(yaml.Source ?? SourceBuilder.default(Game.Ironsworn), parent.Source)
    this['Your truth'] = yaml['Your truth']
  }
}
