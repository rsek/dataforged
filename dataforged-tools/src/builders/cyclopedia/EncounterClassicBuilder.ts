import { DisplayBuilder, EncounterBuilder, SourceBuilder, TitleBuilder } from '@builders'
import { EncounterNatureTypeClassic, Game } from '@schema'
import type { Display, EncounterClassic, EncounterNatureClassic, Source, Title, YamlEncounterClassic } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class EncounterClassicBuilder extends EncounterBuilder implements EncounterClassic {
  $id: EncounterClassic['$id']
  title: Title
  nature: EncounterNatureTypeClassic
  display: Display
  source: Source
  your_truth?: string | undefined
  constructor (yaml: YamlEncounterClassic, parent: EncounterNatureClassic) {
    super(yaml)
    const fragment = yaml._idFragment ?? yaml.title.short ?? yaml.title.standard ?? yaml.title.canonical
    this.$id = formatId(fragment, parent.$id)
    this.title = new TitleBuilder(yaml.title, this)
    this.nature = EncounterNatureTypeClassic[parent.title.short]
    this.display = new DisplayBuilder({})
    this.source = new SourceBuilder(yaml.source ?? SourceBuilder.defaultByGame(Game.Ironsworn), parent.source)
    this.your_truth = yaml.your_truth
  }
}
